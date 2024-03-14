import axios from 'axios';
import Page from 'app/core/page';
import Lazy from 'app/components/lazy';
import anchors from 'app/modules/anchors';
import { IDLE_API_KEY } from 'app/core/configs';
import stickyHeader from 'app/modules/stickyHeader';
import { createDropdowns } from 'app/modules/dropDown';
import ScrollTopButton from 'app/modules/scrollTopButton';
import { abbreviateNumber } from "js-abbreviation-number";
import MobileMenu, { createMobileMenu } from 'app/modules/mobile-menu';

export default abstract class CommonPage extends Page {
    private _mobileMenu: MobileMenu;
    private _scrollTopButton: ScrollTopButton;

    async scroll() {
        super.scroll();

        stickyHeader.update(this.scrollPosition);
    }

    async loadApiData() {
        if (this._sections[2] && this._sections[1]){
          const [
            pools,
            chainsTvls,
            dataTokenTerminalResult
          // @ts-ignore
          ] = await Promise.allSettled([
            axios.get('https://api.idle.finance/pools', {
              headers: {
                Authorization: `Bearer ${IDLE_API_KEY}`
              }
            }),
            // @ts-ignore
            Promise.allSettled([
              axios.get('https://api.idle.finance/tvls', {
                headers: {
                  Authorization: `Bearer ${IDLE_API_KEY}`
                }
              }),
              axios.get('https://api-polygon.idle.finance/tvls', {
                headers: {
                  Authorization: `Bearer ${IDLE_API_KEY}`
                }
              }),
              axios.get('https://api-optimism.idle.finance/tvls', {
                headers: {
                  Authorization: `Bearer ${IDLE_API_KEY}`
                }
              }),
              axios.get('https://api-zkevm.idle.finance/tvls', {
                headers: {
                  Authorization: `Bearer ${IDLE_API_KEY}`
                }
              }),
            ]),
            // axios.get('https://api.tokenterminal.com/v2/internal/metrics/fees?project_ids=idle-finance&interval=180d',{
            //   headers: {
            //     Authorization: `Bearer c0e5035a-64f6-4d2c-b5f6-ac1d1cb3da2f`
            //   }
            // })
          ]);

          // console.log('pools', pools)
          // console.log('chainsTvls', chainsTvls)
          // console.log('dataTokenTerminalResult', dataTokenTerminalResult)

          const data = pools.status === 'fulfilled' ? pools.value : null;
          // const dataPolygon = dataPolygonResult.status === 'fulfilled' ? dataPolygonResult.value : null;
          // const dataTokenTerminal = dataTokenTerminalResult.status === 'fulfilled' ? dataTokenTerminalResult.value : null;

          const totalTvl = chainsTvls.value.reduce( (totalTvl, chainTvl) => {
            if (chainTvl.status === 'fulfilled'){
              return totalTvl + parseFloat(chainTvl.value.data.totalTVL)
            }
            return totalTvl
          }, 0);
          
          const statsSectionElement = this._sections[2]._config.el;
          const productSectionElement = this._sections[1]._config.el;

          if (data && data.data){

            const insertedItems = {};

            data.data.forEach( (item, index) => {
              let strategy = null;
              if (/Tranche/i.test(item.strategy)) {
                strategy = 'tranches'
              } else {
                strategy = 'best-yield';
              }

              // if (parseFloat(item.tvl)){
              //   totalTvl += parseFloat(item.tvl);
              // }

              if (!strategy || item.isPaused || parseFloat(item.tvl)<10000) return;

              if (!insertedItems[strategy]){
                insertedItems[strategy] = 0;
              }
              insertedItems[strategy]++;

              const carouselItem = document.createElement("div");
              carouselItem.className = 'carousel_item';

              const carouselItemToken = document.createElement("div");
              carouselItemToken.className = 'carousel_item__token';

              const tokenImg = document.createElement("img");
              tokenImg.className="token__logo";

              try {
                tokenImg.src = require(`../../assets/img/tokens/${item.tokenName.toUpperCase()}.svg`);
              } catch (err) {
                try {
                  tokenImg.src = require(`../../assets/img/tokens/${item.tokenName.toUpperCase()}.png`);
                } catch (err) {
                  tokenImg.src = require(`../../assets/img/tokens/ETH.svg`);
                }
              }

              // Add token image
              carouselItemToken.append(tokenImg);

              // Carousel item TVL
              const carouselItemTvl = document.createElement("div");
              carouselItemTvl.className = 'carousel_item__tvl';

              const carouselItemTvlLabel = document.createElement("div");
              carouselItemTvlLabel.className = 'subtitle-3';
              carouselItemTvlLabel.innerHTML = 'TVL';

              const carouselItemTvlValue = document.createElement("div");
              carouselItemTvlValue.className = 'title-h4';
              carouselItemTvlValue.innerHTML = '$'+abbreviateNumber(item.tvl, 1);

              carouselItemTvl.append(carouselItemTvlLabel);
              carouselItemTvl.append(carouselItemTvlValue);

              // Carousel item TVL
              const carouselItemApr = document.createElement("div");
              carouselItemApr.className = 'carousel_item__apr';

              const carouselItemAprLabel = document.createElement("div");
              carouselItemAprLabel.className = 'subtitle-3';
              carouselItemAprLabel.innerHTML = 'APR';

              const carouselItemAprValue = document.createElement("div");
              carouselItemAprValue.className = 'title-h4';

              let apr = parseFloat(item.apr).toFixed(2)+'%'
              if (parseFloat(item.apr)>9999){
                apr = '>9999%';
              }

              carouselItemAprValue.innerHTML = apr;

              carouselItemApr.append(carouselItemAprLabel);
              carouselItemApr.append(carouselItemAprValue);

              // Append all elements
              carouselItem.append(carouselItemToken);
              carouselItem.append(carouselItemTvl);
              carouselItem.append(carouselItemApr);

              productSectionElement.querySelector('.'+strategy+'-strategy .carousel_slider').append(carouselItem);
            })

            const activeItems = {};

            const startCarousel = (strategy) => {

              if (insertedItems[strategy]<=1){
                return;
              }

              const itemEl = productSectionElement.querySelector('.'+strategy+'-strategy .carousel_item');
              const sliderEl = productSectionElement.querySelector('.'+strategy+'-strategy .carousel_slider');
              const progressEl = productSectionElement.querySelector('.'+strategy+'-strategy .carousel_progress');
              progressEl.className += ' start';

              if (activeItems[strategy] === undefined){
                activeItems[strategy] = 0;
              }

              window.setTimeout(() => {
                if (activeItems[strategy]==insertedItems[strategy]-1){
                  activeItems[strategy] = 0;
                } else {
                  activeItems[strategy]++;
                }

                // Move slider
                // @ts-ignore
                sliderEl.style.left = -(activeItems[strategy]*itemEl.offsetWidth)+'px';
                // Remove start element
                // @ts-ignore
                progressEl.className = progressEl.className.replace(' start','');
                
                // Resume carousel
                setTimeout(() => {
                  startCarousel(strategy);
                }, 20);
              }, 5000);
            }

            Object.keys(insertedItems).forEach( strategy => {
              startCarousel(strategy)
            })
            /*
            const bestTokens = data.data.reduce( (output,item) => {
              let key = null;
              if (item.poolName.match(/Tranche/)) {
                if (item.poolName.match(/Senior/)) {
                  key = 'senior';
                } else if (item.poolName.match(/Junior/)) {
                  key = 'junior';
                }
              } else {
                key = 'best-yield';
              }
              if (key && parseFloat(item.underlyingTVL)>=10000 && (!output[key] || output[key].apr<item.apr)) {
                output[key] = item;
              }

              if (parseFloat(item.tvl)){
                totalTvl += parseFloat(item.tvl);
              }

              return output;
            },{
              'junior':null,
              'senior':null,
              'best-yield':null
            });

            Object.keys(bestTokens).forEach( strategy => {
              const poolInfo = bestTokens[strategy];
              const tokenName = poolInfo.tokenName;
              let apr = poolInfo.apr.toFixed(2)+'%';
              if (parseFloat(poolInfo.apr)>9999){
                  apr = '>9999%';
              }

              const tokenImg = document.createElement("img");
              tokenImg.className="token__logo";

              try {
                  tokenImg.src = require(`../../assets/img/tokens/${tokenName.toUpperCase()}.svg`);
              } catch (err) {
                  tokenImg.src = require(`../../assets/img/tokens/${tokenName.toUpperCase()}.png`);
              }

              productSectionElement.querySelector('.'+strategy+'-strategy .token').prepend(tokenImg);
              productSectionElement.querySelector('.'+strategy+'-strategy .percent.value-2').innerHTML = apr;
              productSectionElement.querySelector('.'+strategy+'-strategy .token .value-2').innerHTML = tokenName;
            });
            */
          }

          // if (dataPolygon && dataPolygon.data && parseFloat(dataPolygon.data.totalTVL)){
          //   totalTvl += parseFloat(dataPolygon.data.totalTVL);
          // }

          statsSectionElement.querySelector('#total-locked-value').innerHTML = '$'+abbreviateNumber(totalTvl,1);
        }

        const handleFormSubmit = (e) => {
          const form = e.target;
          const email = form.querySelector('.email-input').value;
          const emailInput = form.querySelector('.email-container');

          axios.post('https://dev.lapisgroup.it/idle/newsletter.php', {
            'email': email
          }).then(r => {
            emailInput.innerHTML = '<p class="desc-2">🎉&nbsp;&nbsp;Thanks for the subscription!</p>';
          })
          .catch(err => {
            // this.setState({message:'Error while sending your subscription... Please try again', messageColor:'red' });
          });

          return false;
        }
        
        document.querySelectorAll('.newsletter-form').forEach( item => {
          item.addEventListener("submit", handleFormSubmit, { passive: true });
        });
    }

    checkUrlRedirects(){
      let redirectUrl = 'https://app.idle.finance/';
      const urlHash = window.location.hash;
      // Redirect to governance
      if (urlHash.match((/^#\/(governance)/))){
        redirectUrl += urlHash;
        window.location.href = redirectUrl;
      // Redirect to Dashboard
      } else if (urlHash.match((/^#\/(dashboard)/))){
        redirectUrl += '#/'+urlHash.split('/').splice(2).join("/");
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
            document.body.classList.add('app-ready');
        });

        createDropdowns();
        this._mobileMenu = createMobileMenu();
        this._scrollTopButton = new ScrollTopButton();

        this.loadApiData();

        anchors(true, this._mobileMenu);
    }
}
