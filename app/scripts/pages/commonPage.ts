import axios from 'axios';
import Page from 'app/core/page';
import Lazy from 'app/components/lazy';
import anchors from 'app/modules/anchors';
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
            data,
            dataPolygon,
            // dataTokenTerminal
          ] = await Promise.all([
            axios.get('https://api.idle.finance/pools?api-key=bPrtC2bfnAvapyXLgdvzVzW8u8igKv6E',{}),
            axios.get('https://api-polygon.idle.finance/tvls?api-key=bPrtC2bfnAvapyXLgdvzVzW8u8igKv6E',{}),
            // axios.get('https://api.tokenterminal.com/v2/projects/idle-finance/metrics?timestamp_granularity=monthly',{
            //   headers: {
            //     Authorization: `Bearer b781852e-554f-4c19-bafb-75ff6d45529a`
            //   }
            // })
          ]);

          let totalTvl = 0;
          const statsSectionElement = this._sections[2]._config.el;
          const productSectionElement = this._sections[1]._config.el;

          // const totalRevenue = dataTokenTerminal && dataTokenTerminal.data ? dataTokenTerminal.data.reduce( (total,t) => (total+=t.revenue_supply_side), 0 ) : 10000000;
          // statsSectionElement.querySelector('#interests-value').innerHTML = '$'+abbreviateNumber(totalRevenue,1);
          // console.log('totalRevenue',totalRevenue);

          if (data && data.data){
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
              if (key && !output[key] || output[key].apr<item.apr) {
                output[key] = item;
              }

              totalTvl += parseFloat(item.tvl);

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
          }

          if (dataPolygon && dataPolygon.data && parseFloat(dataPolygon.data.totalTVL)){
            totalTvl += parseFloat(dataPolygon.data.totalTVL);
          }

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

    async start() {
        super.start();

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
