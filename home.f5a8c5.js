(self.webpackChunkidlefinance=self.webpackChunkidlefinance||[]).push([[177],{97016:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BreakpointType=void 0;const s=i(70655).__importDefault(i(73112));var a;!function(e){e.Desktop="Desktop",e.Tablet="Tablet",e.Mobile="Mobile"}(a=t.BreakpointType||(t.BreakpointType={}));const n={Desktop:{id:3,name:a.Desktop,width:1440,height:800,mediaQuery:"(min-width: 1025px)"},Tablet:{id:2,name:"Tablet",width:768,height:1024,mediaQuery:"(min-width: 481px) and (max-width: 1024px)"},Mobile:{id:1,name:"Mobile",width:320,height:1024,mediaQuery:"(max-width: 480px)"}};s.default.registerBreakpoint(n.Desktop),s.default.registerBreakpoint(n.Tablet),s.default.registerBreakpoint(n.Mobile),t.default={get All(){return n},get Current(){return s.default.Current},isActive(...e){return e.includes(this.Current.breakpoint.id)}}},67823:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(70655),a=s.__importDefault(i(66358)),n=s.__importDefault(i(11248)),o=s.__importDefault(i(2998)),r=i(95781).createLogger("[LottieComponent]");let l;class u extends o.default{constructor(){super(...arguments),this._isCompleted=!0,this._isLoaded=!1,this._playPending=!1,this._playingPromise=null,this._play=()=>{this._anim&&(this._isLoaded?(this._isCompleted&&(this._anim.goToAndStop(0),this._isCompleted=!1),this._anim.play()):this._playPending=!0)}}get animation(){return this._anim}get priority(){return this._priority||3}get isPlaying(){return this.animation.isLoaded&&!this.animation.isPaused}async doSetup(){this.useDefaultConfig({register:!0,loop:!0,hideOnDeactivate:!0,autoplay:!0,playOnActivate:!0}),this._params={container:this.element,renderer:this._config.renderer||"svg",loop:this._config.loop,autoplay:this._config.autoplay,path:this.element.dataset.lottiePath,rendererSettings:this._config.rendererSettings},this._config.hideOnDeactivate?a.default.set(this.element,{autoAlpha:0}):a.default.set(this.element,{autoAlpha:1}),n.default.setQuality("low"),await super.doSetup()}playAnimation(){return this._playingPromise||(this._playingPromise=new Promise((e=>{this._anim.addEventListener("complete",(()=>{this._playingPromise=null,e()})),this._anim.play()}))),this._playingPromise}async _doLoading(){if(this._lottie=await async function(){return l||(r.log("Loading library..."),l=Promise.resolve().then((()=>s.__importStar(i(11248)))),l.then((()=>r.log("Library has been loaded")))),l}(),this._anim=this._lottie.loadAnimation(this._params),this._anim.addEventListener("complete",(()=>{this._isCompleted=!0})),this._anim.isLoaded)return this._isLoaded=!0,Promise.resolve();await new Promise((e=>{this._anim.addEventListener("DOMLoaded",(()=>{this._isLoaded=!0,this._playPending&&(this._playPending=!1,setTimeout((()=>{r.log("Play Pending",this)}),500),this._anim.play()),e()}))}))}_stop(){var e;null===(e=this._anim)||void 0===e||e.goToAndStop(0),this._isCompleted=!1}async _activate(){this._config.hideOnDeactivate&&("first"===this._config.hideOnDeactivate&&this.wasActive||await this.showByAlpha()),this._config.playOnActivate&&this._play()}async _deactivate(){!0===this._config.hideOnDeactivate&&await this.hideByAlpha(),this._config.playOnActivate&&this._stop()}async showByAlpha(){var e;a.default.killTweensOf(this.element),await a.default.set(this.element,{autoAlpha:1,delay:(null===(e=this.activationConfig)||void 0===e?void 0:e.delay)||0})}async hideByAlpha(){var e;a.default.killTweensOf(this.element),await a.default.set(this.element,{autoAlpha:0,delay:(null===(e=this.activationConfig)||void 0===e?void 0:e.delay)||0})}}t.default=u},82261:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(70655).__importDefault(i(65155));class a extends s.default{constructor(){super(...arguments),this._scrollCoeffs={down:{show:.3,hide:.5},up:{show:.3,hide:.3}},this._scrollPosition=0,this._isHero=!1}get page(){return this._config.page}get scrollCoeffs(){return this._scrollCoeffs}get scrollPosition(){return this._scrollPosition}get isHero(){return this._isHero}get show(){return this._show}get fallbackTreshold(){return 0}async doSetup(){this.element&&this.element.style&&(this.element.style.visibility="visible"),await this.setupSection()}setupSection(){}resize(e,t){}scroll(e,t){const i=this.rect,s=this.page.height+i.height,a=s-i.bottom;this._scrollPosition=a/s}wheel(e,t){}get animateOnSetup(){return!0}get logAnimation(){return!0}}t.default=a},65424:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MyTransition=void 0;const s=i(70655).__importDefault(i(98595)),a=i(98595);t.default=function(e,t){return new s.default(e,t)},t.MyTransition=function(e,t){const{bind:i}=a.EventInterface(e),{Move:s}=t,{list:n}=t.Elements;let o;function r(){n.style.transition=""}return{mount:function(){i(n,"transitionend",(e=>{e.target===n&&o&&(r(),o())}))},start:function(e,t){const i=s.toPosition(e,!0);n.style.transition="transform 833ms cubic-bezier(0.47, 0.00, 0.52, 1.00)",s.translate(i),o=t},cancel:r}}},37734:(e,t,i)=>{"use strict";const s=i(70655);i(26024),i(15650);const a=s.__importDefault(i(99700)),n=s.__importDefault(i(67298)),o=s.__importDefault(i(50299)),r=s.__importDefault(i(23263)),l=s.__importDefault(i(11241)),u=s.__importDefault(i(38642));class c extends a.default{constructor(){super(...arguments),this._sectionTypes=[n.default,r.default,o.default,l.default,u.default]}async setupPageAsync(){await super.setupPageAsync()}get sectionTypes(){return this._sectionTypes}}c.RunPage(c)},38642:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(70655),a=s.__importDefault(i(82261)),n=s.__importDefault(i(97016)),o=s.__importDefault(i(66358)),r=i(21454);class l extends a.default{constructor(){super(...arguments),this._show=()=>{if(this._animated)return;const e={autoAlpha:0,y:r.AnimationValues.distance*this._rem},t={autoAlpha:1,y:0,duration:r.AnimationValues.duration,ease:r.AnimationValues.showEase,stagger:r.AnimationValues.stagger};return o.default.timeline({immediateRender:!1,force3d:!1,onStart:()=>this._animated=!0}).fromTo(this._animationItem,e,t,0)}}get _animationItem(){return this.element.querySelectorAll(".anim-item-js")}_setupAnimItems(){o.default.set([this._animationItem],{autoAlpha:0})}async resize(){this._rem=n.default.Current.rem}async setupSection(){this._setupAnimItems()}_activate(){this._show()}_deactivate(){}}t.default=l},67298:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(70655),a=s.__importDefault(i(97016)),n=s.__importDefault(i(82261)),o=s.__importStar(i(65424)),r=s.__importDefault(i(2615));class l extends n.default{constructor(){super(...arguments),this._initialSetup=!0}_setupSlider(){this.element.querySelector(".splide")&&(this._slider=o.default(this.element.querySelector(".splide"),{type:"slide",arrows:!0,perPage:2,easing:"cubic-bezier(0.25, 1, 0.5, 1)",breakpoints:{1024:{padding:{left:0,right:0}},480:{perPage:1,padding:{left:0,right:0}}}}),this._slider.mount({},o.MyTransition))}async resize(e,t){var i,s;this._prevDevice=this._currentDevice,this._currentDevice=r.default(a.default),this._rem=a.default.Current.rem,this._prevDevice!==this._currentDevice&&"desktop"!==this._currentDevice&&(null===(i=this._slider)||void 0===i||i.destroy(),this._setupSlider()),this._prevDevice!==this._currentDevice&&"desktop"===this._currentDevice&&(null===(s=this._slider)||void 0===s||s.destroy())}async setupSection(){this._initialSetup&&(this._initialSetup=!1),"desktop"!==this._currentDevice&&this._setupSlider()}_activate(){}_deactivate(){}}t.default=l},11241:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(70655),a=s.__importDefault(i(82261)),n=s.__importDefault(i(97016)),o=s.__importDefault(i(66358)),r=i(21454),l=s.__importDefault(i(67823));class u extends a.default{constructor(){super(...arguments),this._lottieIcons=[],this._show=()=>{if(this._animated)return;let e=0;const t={autoAlpha:0,y:r.AnimationValues.distance*this._rem},i={autoAlpha:1,y:0,duration:r.AnimationValues.duration,ease:r.AnimationValues.showEase,stagger:r.AnimationValues.stagger},s={autoAlpha:1,y:0,duration:r.AnimationValues.duration,ease:r.AnimationValues.showEase,stagger:{each:r.AnimationValues.stagger,onComplete:()=>this._lottieIcons[e++].animation.play()}};return o.default.timeline({immediateRender:!1,force3d:!1,onStart:()=>this._animated=!0}).fromTo(this._subtitle,t,i,0).fromTo(this._title,t,i,r.AnimationValues.stagger).fromTo(this._cardIcon,t,s,2*r.AnimationValues.stagger).fromTo(this._cardTitle,t,i,3*r.AnimationValues.stagger).fromTo(this._cardDesc,t,i,4*r.AnimationValues.stagger)}}get _subtitle(){return this.element.querySelector(".subtitle-anim-js")}get _title(){return this.element.querySelector(".title-anim-js")}get _cardTitle(){return this.element.querySelectorAll(".card-title-anim-js")}get _cardDesc(){return this.element.querySelectorAll(".card-desc-anim-js")}get _cardIcon(){return this.element.querySelectorAll(".card-icon-anim-js")}async _setupLotties(){this.element.querySelectorAll(".logo-lottie").forEach((async e=>{const t=await new l.default({el:e,autoplay:!1,renderer:"canvas",loop:!1,playOnActivate:!1}).setup();t.activate(),e.addEventListener("mouseenter",(()=>{t.animation.isPaused&&(t.animation.setDirection(1),t.animation.goToAndPlay(0,!0))})),this._lottieIcons.push(t)}))}_setupAnimItems(){o.default.set([this._subtitle,this._title,this._cardTitle,this._cardDesc,this._cardIcon],{autoAlpha:0})}async resize(){this._rem=n.default.Current.rem}async setupSection(){this._setupLotties(),this._setupAnimItems()}_activate(){this._show()}_deactivate(){}}t.default=u},23263:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(70655),a=s.__importDefault(i(73112)),n=s.__importDefault(i(82261)),o=s.__importDefault(i(97016)),r=(s.__importDefault(i(66358)),i(21454),s.__importDefault(i(2615)));class l extends n.default{constructor(){super(...arguments),this._initialSetup=!0,this._activeSection=null,this._show=()=>{}}get _logo1(){return this.element.querySelector(".logo-anim-js-1")}get _logo2(){return this.element.querySelector(".logo-anim-js-2")}get _logo3(){return this.element.querySelector(".logo-anim-js-3")}get _logo4(){return this.element.querySelector(".logo-anim-js-4")}get _logo5(){return this.element.querySelector(".logo-anim-js-5")}get _logo6(){return this.element.querySelector(".logo-anim-js-6")}_setupAnimItems(){}async resize(){this._rem=a.default.Current.rem,await this._setCurrentDevice()}async _setCurrentDevice(){this._currentDevice=r.default(o.default)}setActiveSection(){var e;const t=window.innerWidth<=480,i=this.element.querySelector("#filters-container"),s=i.offsetParent,a=this.element.querySelector(".filters__tag.active");if(t){const e=(s.clientWidth-a.clientWidth)/2-a.offsetLeft,t=+i.style.marginLeft.replace("px","");i.style.marginLeft=t+e+"px"}const n=null===(e=null==a?void 0:a.dataset)||void 0===e?void 0:e.id;n&&(this.element.querySelectorAll(".protocols").forEach(((e,t)=>{e.style.display="none"})),this.element.querySelector("#protocols-"+n).style.display="flex")}addEventsListener(){window.addEventListener("resize",(()=>this.setActiveSection()));const e=this.element.querySelectorAll(".filters__tag");e.forEach(((t,i)=>{t.addEventListener("click",(()=>{e.forEach(((e,t)=>{e.className=i===t?"filters__tag label-2 active":"filters__tag label-2"})),this.setActiveSection()}))}))}async setupSection(){this._initialSetup&&(this._initialSetup=!1),this._setupAnimItems(),await this._setCurrentDevice(),this.addEventsListener(),this.setActiveSection()}_activate(){this._show()}_deactivate(){}}t.default=l},50299:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(70655),a=s.__importDefault(i(73112)),n=s.__importDefault(i(82261)),o=s.__importDefault(i(66358)),r=i(21454),l=s.__importDefault(i(67823));class u extends n.default{constructor(){super(...arguments),this._lottieIcons=[],this._show=()=>{if(this._animated)return;const e=r.AnimationValues.distance*this._rem,t={autoAlpha:0,y:e},i={autoAlpha:1,y:0,duration:r.AnimationValues.duration,ease:r.AnimationValues.showEase,stagger:r.AnimationValues.stagger};return o.default.timeline({immediateRender:!1,force3d:!1,onStart:()=>this._animated=!0,onComplete:()=>this._lottieIcons.forEach((e=>e.animation.play()))}).fromTo(this._subtitle,t,i,0).fromTo(this._title,t,i,r.AnimationValues.stagger).fromTo(this._desc,t,i,2*r.AnimationValues.stagger).fromTo(this._cards,{y:2*e},{y:0,duration:r.AnimationValues.duration,ease:r.AnimationValues.showEase,stagger:r.AnimationValues.stagger},3*r.AnimationValues.stagger)}}get _subtitle(){return this.element.querySelector(".subtitle-anim-js")}get _title(){return this.element.querySelector(".title-anim-js")}get _desc(){return this.element.querySelector(".desc-anim-js")}get _cards(){return this.element.querySelectorAll(".card-anim-js")}async _setupLotties(){this.element.querySelectorAll(".audits__item").forEach((async e=>{const t=e.querySelector(".logo-lottie"),i=await new l.default({el:t,autoplay:!1,renderer:"canvas",loop:!1,playOnActivate:!1}).setup();i.activate(),e.addEventListener("mouseenter",(()=>{i.animation.isPaused&&(i.animation.setDirection(1),i.animation.goToAndPlay(0,!0))})),this._lottieIcons.push(i)}))}_setupAnimItems(){o.default.set([this._subtitle,this._title,this._desc],{autoAlpha:0})}async resize(){this._rem=a.default.Current.rem}async setupSection(){this._setupLotties(),this._setupAnimItems()}_activate(){this._show()}_deactivate(){}}t.default=u},21454:(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AnimationValues=void 0;const s=i(70655),a=s.__importDefault(i(66358)),n=s.__importDefault(i(32067));a.default.registerPlugin(n.default),t.AnimationValues={duration:.83333,stagger:.06666,distance:50,showEase:n.default.create("ShowEase",".17,.17,.41,1"),hideEase:n.default.create("HideEase",".59,.00,.83,.83"),defFromSettings:e=>({autoAlpha:0,y:e}),defToSettings(){return{duration:this.duration,ease:this.showEase,stagger:this.stagger,autoAlpha:1,y:0}}}},2615:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){let t;return window.matchMedia(e.All.Desktop.mediaQuery).matches&&(t="desktop"),window.matchMedia(e.All.Tablet.mediaQuery).matches&&(t="tablet"),window.matchMedia(e.All.Mobile.mediaQuery).matches&&(t="mobile"),t}},15650:(e,t,i)=>{"use strict";i.r(t)}},e=>{"use strict";e.O(0,[477,387,24,700,594,429],(()=>(37734,e(e.s=37734)))),e.O()}]);