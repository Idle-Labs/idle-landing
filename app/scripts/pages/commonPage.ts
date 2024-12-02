import axios from "axios";
import Page from "app/core/page";
import { CountUp } from "countup.js";
import Lazy from "app/components/lazy";
import anchors from "app/modules/anchors";
import { Odometer } from "odometer_countup";
import { IDLE_API_KEY, IDLE_API_V2_KEY } from "app/core/configs";
import stickyHeader from "app/modules/stickyHeader";
import { createDropdowns } from "app/modules/dropDown";
import ScrollTopButton from "app/modules/scrollTopButton";
import { abbreviateNumber } from "js-abbreviation-number";
import MobileMenu, { createMobileMenu } from "app/modules/mobile-menu";

function formatMoney(
  amount: number,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
): string | null {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      // @ts-ignore
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          // @ts-ignore
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    return null;
  }
}

function sortArrayByKey(array: any[], key: string, order = "asc") {
  const val1 = order === "asc" ? -1 : 1;
  const val2 = order === "asc" ? 1 : -1;
  return [...array].sort((a, b) =>
    parseInt(a[key]) < parseInt(b[key]) ? val1 : val2
  );
}

export default abstract class CommonPage extends Page {
  private _totalTVL: number;
  private _totalYield: number;
  private _tvlCounter: CountUp;
  private _yieldCounter: CountUp;
  private _mobileMenu: MobileMenu;
  private _scrollTopButton: ScrollTopButton;

  async scroll() {
    super.scroll();

    stickyHeader.update(this.scrollPosition);
  }

  setupTvlCounter(totalTvl, avgAPY) {
    this._totalTVL = totalTvl;
    this._tvlCounter = new CountUp("total-locked-value", this._totalTVL, {
      plugin: new Odometer({ duration: 1.3, lastDigitDelay: 0 }),
      duration: 2.0,
      formattingFn: (n) => "$" + formatMoney(n, 0),
      onCompleteCallback: () => {
        const yieldPerYear = (totalTvl * avgAPY) / 100;
        const yieldPerSecond = Math.max(0, yieldPerYear / 31536000);
        const intervalSeconds = Math.max(1, 1 / yieldPerSecond);
        // console.log('totalTvl', totalTvl, 'avgAPY', avgAPY, 'yieldPerYear', yieldPerYear, 'yieldPerSecond', yieldPerSecond)
        if (yieldPerSecond) {
          setTimeout(() => {
            this._totalTVL += yieldPerSecond * intervalSeconds;
            this._tvlCounter.update(this._totalTVL);
          }, intervalSeconds * 1000);
        }
      },
    });
    this._tvlCounter.start();
  }

  setupYieldCounter(totalYield, avgAPY) {
    this._totalYield = totalYield;
    this._yieldCounter = new CountUp(
      "total-yield-generated",
      this._totalYield,
      {
        plugin: new Odometer({ duration: 1.3, lastDigitDelay: 0 }),
        duration: 2.0,
        formattingFn: (n) => "$" + formatMoney(n, 0),
        onCompleteCallback: () => {
          const yieldPerYear = (totalYield * avgAPY) / 100;
          const yieldPerSecond = Math.max(0, yieldPerYear / 31536000);
          const intervalSeconds = Math.max(1, 1 / yieldPerSecond);
          // console.log('totalYield', totalYield, 'avgAPY', avgAPY, 'yieldPerYear', yieldPerYear, 'yieldPerSecond', yieldPerSecond)
          if (yieldPerSecond) {
            setTimeout(() => {
              this._totalYield += yieldPerSecond * intervalSeconds;
              this._yieldCounter.update(this._totalYield);
            }, intervalSeconds * 1000);
          }
        },
      }
    );
    this._yieldCounter.start();
  }

  setupTextCarousel() {
    var TxtRotate = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

      var that = this;
      var delta = this.period;

      // Finished typing
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        // Finished deleting
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      } else {
        delta = 120;
      }

      if (this.isDeleting) {
        delta /= 2;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };

    window.onload = function () {
      var elements = document.getElementsByClassName("txt-rotate");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-rotate");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      /*
          var css = document.createElement("style");
          css.type = "text/css";
          css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
          document.body.appendChild(css);
          */
    };
  }

  async loadApiData() {
    if (this._sections[2] && this._sections[1]) {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${IDLE_API_KEY}`,
        },
      };

      const axiosConfig2 = {
        headers: {
          Authorization: `Bearer ${IDLE_API_V2_KEY}`,
        },
      };

      const [
        vaultsResults,
        tokensResults,
        categoriesResults,
        operatorsResults,
        vaultsLatestBlocks,
        vaultsPerformances,
        // @ts-ignore
      ] = await Promise.allSettled([
        axios.get("https://api-v2.idle.finance/v1/vaults", axiosConfig2),
        axios.get("https://api-v2.idle.finance/v1/tokens", axiosConfig2),
        axios.get(
          "https://api-v2.idle.finance/v1/vault-categories",
          axiosConfig2
        ),
        axios.get("https://api-v2.idle.finance/v1/operators", axiosConfig2),
        axios.get(
          "https://api-v2.idle.finance/v1/vault-latest-blocks",
          axiosConfig2
        ),
        axios.get(
          "https://api-v2.idle.finance/v1/vaults/performances",
          axiosConfig2
        ),
      ]);

      const totalTvl = Number(vaultsPerformances.value.data.TVL);
      const totalAvgAPY = Number(vaultsPerformances.value.data.APRs.AVG);

      const heroSectionElement = this._sections[0]._config.el;
      // const productSectionElement = this._sections[1]._config.el;

      const vaults =
        vaultsResults.status === "fulfilled"
          ? vaultsResults.value.data.data
          : [];
      const tokens =
        tokensResults.status === "fulfilled"
          ? tokensResults.value.data.data
          : [];
      const categories =
        categoriesResults.status === "fulfilled"
          ? categoriesResults.value.data.data
          : [];
      const operators =
        operatorsResults.status === "fulfilled"
          ? operatorsResults.value.data.data
          : [];
      const latestBlocks =
        vaultsLatestBlocks.status === "fulfilled"
          ? vaultsLatestBlocks.value.data.data
          : [];

      // console.log({ vaults, tokens, categories, operators, latestBlocks });

      const aggregatedVaults = latestBlocks.reduce(
        (aggregatedVaults, vaultLatestBlock) => {
          const vault = vaults.find((v) => v._id === vaultLatestBlock.vaultId);
          if (
            !vault ||
            vault.status !== "READY" ||
            vault.visibility !== "PRODUCTION" ||
            !vault.operatorIds
          ) {
            return aggregatedVaults;
          }

          const foundAPR = vaultLatestBlock.APRs.find((APR) =>
            ["BASE", "GROSS"].includes(APR.type)
          );
          const vaultAPR = foundAPR.rate || 0;
          const tvlUSD = Number(vaultLatestBlock.TVL.USD) / 1e6;
          if (!vaultAPR || !tvlUSD) {
            return aggregatedVaults;
          }

          const token = tokens.find((t) => t._id === vault.tokenId);
          const category = categories.find((c) => c._id === vault.categoryId);
          const operatorId = vault.operatorIds ? vault.operatorIds[0] : null;
          const operator = operators.find((o) => o._id === operatorId);

          const vaultKey = `${vault.protocol}_${vault.contractType}_${operatorId}`;
          if (!aggregatedVaults[vaultKey]) {
            aggregatedVaults[vaultKey] = {
              ...vault,
              vaultKey,
              token,
              category,
              operator,
              operatorId,
              weight: 0,
              maxApy: 0,
              tokens: [],
              totalTvl: 0,
            };
          }

          if (!aggregatedVaults[vaultKey].tokens.includes(token.symbol)) {
            aggregatedVaults[vaultKey].tokens.push(token.symbol);
          }

          aggregatedVaults[vaultKey].maxApy = Math.max(
            aggregatedVaults[vaultKey].maxApy,
            vaultAPR
          );
          aggregatedVaults[vaultKey].totalTvl =
            aggregatedVaults[vaultKey].totalTvl + tvlUSD;

          aggregatedVaults[vaultKey].weight =
            aggregatedVaults[vaultKey].totalTvl *
            aggregatedVaults[vaultKey].maxApy;

          return aggregatedVaults;
        },
        {}
      );

      const insertedTypes = {};
      const bestVaultsByType = sortArrayByKey(
        Object.values(aggregatedVaults),
        "weight",
        "desc"
      ).reduce((bestVaultsByType, vault, index) => {
        const key = vault.vaultKey;
        if (!insertedTypes[key]) {
          bestVaultsByType.push(vault);
          insertedTypes[key] = 1;
        }
        return bestVaultsByType;
      }, []);

      const heroVaults = Object.values(bestVaultsByType).slice(0, 3);

      const heroVaultsCards =
        heroSectionElement.querySelectorAll(".vault__card");

      heroVaults.forEach((aggregatedVault: any, index) => {
        const heroVaultsCard = heroVaultsCards[index];

        const vaultLogoContainer = heroVaultsCard.querySelector(
          ".vault__header .vault__logo"
        );
        if (vaultLogoContainer && aggregatedVault.operator) {
          vaultLogoContainer.innerHTML = "";
          const vaultImage = document.createElement("img");
          vaultImage.className = "logo";
          vaultImage.src = require(`../../assets/img/operators/${aggregatedVault.operator.code}.svg`);
          vaultLogoContainer.append(vaultImage);
        }

        heroVaultsCard.id = aggregatedVault._id;

        if (aggregatedVault.contractType === "CDO_EPOCH") {
          // @ts-ignore
          heroVaultsCard.href = "https://credit.idle.finance";
        }

        heroVaultsCard.querySelector(".vault__header .title-h4").innerHTML =
          aggregatedVault.operator?.name || aggregatedVault.name;
        // aggregatedVault.protocol ||

        if (aggregatedVault.category) {
          heroVaultsCard.querySelector(".vault__header .desc-3").innerHTML =
            aggregatedVault.category.name.en_EN;
        }

        let apr = parseFloat(aggregatedVault.maxApy).toFixed(1);
        if (parseFloat(aggregatedVault.maxApy) > 9999) {
          apr = ">9999";
        }
        heroVaultsCard.querySelector(
          ".vault__performance .title-h3"
        ).innerHTML = `${apr}<small>%</small> <span class="text-gray">APY</span>`;
        heroVaultsCard.querySelector(
          ".vault__footer .tvl .subtitle-3"
        ).innerHTML = "$" + formatMoney(aggregatedVault.totalTvl, 0);

        // Add tokens
        const tokensContainer = heroVaultsCard.querySelector(
          ".vault__footer .tokens"
        );
        tokensContainer.innerHTML = "";
        aggregatedVault.tokens.forEach((tokenName, index) => {
          const tokenImg = document.createElement("img");
          tokenImg.className = "logo";

          try {
            tokenImg.src = require(`../../assets/img/tokens/${tokenName.toUpperCase()}.svg`);
          } catch (err) {
            try {
              tokenImg.src = require(`../../assets/img/tokens/${tokenName.toUpperCase()}.png`);
            } catch (err) {
              tokenImg.src = require(`../../assets/img/tokens/ETH.svg`);
            }
          }

          if (index) {
            tokenImg.className += " ml";
          }

          // Add token image
          tokensContainer.append(tokenImg);
        });
      });

      this.setupTvlCounter(totalTvl, totalAvgAPY);
      this.setupYieldCounter(20057166, totalAvgAPY);
      // document.querySelector('#total-yield-generated').innerHTML = '$'+formatMoney(totalTvl, 0);
    }

    const handleFormSubmit = (e) => {
      const form = e.target;
      const email = form.querySelector(".email-input").value;
      const emailInput = form.querySelector(".email-container");

      axios
        .post("https://dev.lapisgroup.it/idle/newsletter.php", {
          email: email,
        })
        .then((r) => {
          emailInput.innerHTML =
            '<p class="desc-2">🎉&nbsp;&nbsp;Thanks for the subscription!</p>';
        })
        .catch((err) => {
          // this.setState({message:'Error while sending your subscription... Please try again', messageColor:'red' });
        });

      return false;
    };

    document.querySelectorAll(".newsletter-form").forEach((item) => {
      item.addEventListener("submit", handleFormSubmit, { passive: true });
    });
  }

  checkUrlRedirects() {
    let redirectUrl = "https://app.idle.finance/";
    const urlHash = window.location.hash;
    // Redirect to governance
    if (urlHash.match(/^#\/(governance)/)) {
      redirectUrl += urlHash;
      window.location.href = redirectUrl;
      // Redirect to Dashboard
    } else if (urlHash.match(/^#\/(dashboard)/)) {
      redirectUrl += "#/" + urlHash.split("/").splice(2).join("/");
      window.location.href = redirectUrl;
    }
  }

  async start() {
    super.start();

    this.checkUrlRedirects();

    Lazy.SetMainElememt(this.root);
    Lazy.RegisterAllImages();
    window.appReady(() => {
      Lazy.BeginLoading();
      document.body.classList.add("app-ready");
    });

    createDropdowns();
    this._mobileMenu = createMobileMenu();
    this._scrollTopButton = new ScrollTopButton();

    this.setupTextCarousel();
    this.loadApiData();

    anchors(true, this._mobileMenu);
  }
}
