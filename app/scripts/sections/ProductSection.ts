/* eslint-disable @typescript-eslint/no-unused-expressions */
import Section from 'app/core/section';
import Breakpoints from 'app/appBreakpoints';
import createSplideSlider, { MyTransition } from 'app/modules/slider';

import gsap from 'gsap';
import Splide from '@splidejs/splide';

import { AnimationValues } from 'app/utils/animation';
import LottieComponent from 'app/components/common/lottie';
import setCurrentDevice from 'app/utils/currentDevice';

export default class ProductSection extends Section {
    private _slider: Splide;
    private _animated: boolean;
    private _rem: number;
    private _currentDevice: 'desktop' | 'tablet' | 'mobile';
    private _prevDevice: 'desktop' | 'tablet' | 'mobile';
    private _cardLogos: HTMLElement[] = [];

    private get _subtitle(){ return this.element.querySelector<HTMLElement>('.subtitle-anim-js'); }
    private get _title(){ return this.element.querySelector<HTMLElement>('.title-anim-js'); }
    private get _description(){ return this.element.querySelector<HTMLElement>('.desc-anim-js'); }
    private get _cards(){ return this.element.querySelectorAll<HTMLElement>('.card-anim-js'); }
    private get _nav(){ return this.element.querySelector<HTMLElement>('.nav-anim-js'); }
    private get _discoverMore(){ return document.body.querySelector<HTMLElement>('.hero-discover-more'); }

    private async _setupLotties() {
        const cards = this.element.querySelectorAll<HTMLElement>('.card-lottie');

        cards.forEach(async(card) => {
            const logo = card.querySelector<HTMLElement>('.logo');
            this._cardLogos.push(logo);

            const containers = card.querySelectorAll<HTMLImageElement>('.logo-lottie');
            containers.forEach (async(container) => {
                const lottie = await new LottieComponent({
                    el: container,
                    autoplay: false,
                    renderer: 'canvas',
                    loop: false,
                    playOnActivate: false,
                }).setup();
                
                lottie.activate();

                card.addEventListener('mouseenter', () => {
                    lottie.animation.setDirection(1);
                    lottie.animation.play();
                });
                card.addEventListener('mouseleave', () => {
                    lottie.animation.setDirection(-1);
                    lottie.animation.play();
                });
            })

            logo.classList.add('hidden');

        });
    }
    private _setupSlider() {
        if (this.element.querySelector('.splide')) {
            this._slider = createSplideSlider(this.element.querySelector('.splide'), {
                type: 'slide',
                arrows: true,
                perPage: 2,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                breakpoints: {
                    1024: {
                        padding: { left: 0, right: 0 },
                    },
                    480: {
                        perPage: 1,
                        padding: { left: 0, right: 0 },
                    },
                },
            });
            this._slider.mount({}, MyTransition);
        }
    }

    private _setupAnimItems(){
        gsap.set([this._subtitle, this._title, this._description, this._nav], { autoAlpha: 0 });
    }

    protected _show = () => {
        if (this._animated) return;

        const offsetY = AnimationValues.distance * this._rem;
        const fromSettings = { autoAlpha: 0, y: offsetY };
        const toSettings = {
            autoAlpha: 1,
            y: 0,
            duration: AnimationValues.duration,
            ease: AnimationValues.showEase,
            stagger: AnimationValues.stagger,
        };
        const tl = gsap.timeline({ immediateRender: false, force3d: false, onStart: () => this._animated = true });
        return tl
            .fromTo(this._subtitle, fromSettings, toSettings, 0)
            .fromTo(this._title, fromSettings, toSettings, AnimationValues.stagger)
            .fromTo(this._description, fromSettings, toSettings, AnimationValues.stagger * 2)
            .fromTo(this._nav, fromSettings, toSettings, AnimationValues.stagger * 3)
            .fromTo(this._cards, { y: offsetY }, { y: 0, duration: AnimationValues.duration, ease: AnimationValues.showEase, stagger: AnimationValues.stagger,
            }, AnimationValues.stagger * 3);
    };

    private _hideDiscoverBtn() {
        gsap.killTweensOf([this._discoverMore]);
        gsap.to(this._discoverMore, { opacity: 0, pointerEvents: 'none' });
    }

    async resize() {
        this._prevDevice = this._currentDevice;
        this._currentDevice = setCurrentDevice(Breakpoints);
        this._rem = Breakpoints.Current.rem;

        this._currentDevice !== 'desktop'
            ? this._cardLogos.forEach((item) => item.classList.remove('hidden'))
            : this._cardLogos.forEach((item) => item.classList.add('hidden'));

        if (this._prevDevice !== this._currentDevice && this._currentDevice !== 'desktop') {
            this._slider?.destroy();
            this._setupSlider();
        }
        if (this._prevDevice !== this._currentDevice && this._currentDevice === 'desktop') {
            this._slider?.destroy();
        }
    }

    async setupSection() {
        this._currentDevice = setCurrentDevice(Breakpoints);
        if (this._currentDevice === 'desktop') {
            this._setupLotties();
        }
        if (this._currentDevice !== 'desktop') {
            this._setupSlider();
        }
        this._setupAnimItems();
    }

    protected _activate() {
        this._hideDiscoverBtn();
        this._show();
    }

    protected _deactivate() {
        //
    }
}
