import axios from 'axios';
import Page from 'app/core/page';
import Lazy from 'app/components/lazy';
import { createDropdowns } from 'app/modules/dropDown';
import { abbreviateNumber } from "js-abbreviation-number";
import anchors from 'app/modules/anchors';
import MobileMenu, { createMobileMenu } from 'app/modules/mobile-menu';
import ScrollTopButton from 'app/modules/scrollTopButton';
import stickyHeader from 'app/modules/stickyHeader';

export default abstract class CommonPage extends Page {
    private _mobileMenu: MobileMenu;
    private _scrollTopButton: ScrollTopButton;

    async scroll() {
        super.scroll();

        stickyHeader.update(this.scrollPosition);
    }

    async loadApiData() {
        const [
          data,
          dataPolygon
        ] = await Promise.all([
          axios.get('http://api.idle.finance/pools?api-key=bPrtC2bfnAvapyXLgdvzVzW8u8igKv6E',{}),
          axios.get('https://api-polygon.idle.finance/tvls?api-key=bPrtC2bfnAvapyXLgdvzVzW8u8igKv6E',{})
        ]);

        let totalTvl = 0;
        const statsSectionElement = this._sections[2]._config.el;
        const productSectionElement = this._sections[1]._config.el;

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

            productSectionElement.querySelector('#'+strategy+'-strategy .token').prepend(tokenImg);
            productSectionElement.querySelector('#'+strategy+'-strategy .percent.value-2').innerHTML = apr;
            productSectionElement.querySelector('#'+strategy+'-strategy .token .value-2').innerHTML = tokenName;
          });
        }

        if (dataPolygon && dataPolygon.data && parseFloat(dataPolygon.data.totalTVL)){
          totalTvl += parseFloat(dataPolygon.data.totalTVL);
        }

        statsSectionElement.querySelector('#total-locked-value').innerHTML = '$'+abbreviateNumber(totalTvl,1);
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
