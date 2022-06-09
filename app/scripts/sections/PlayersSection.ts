import Section from 'app/core/section';
import Breakpoints from 'app/appBreakpoints';

import gsap from 'gsap';

import { AnimationValues } from 'app/utils/animation';
import LottieComponent from 'app/components/common/lottie';

export default class PlayersSection extends Section {
    private _animated: boolean;
    private _rem: number;
    private _lottieIcons: LottieComponent[] = [];

    private get _subtitle(){ return this.element.querySelector<HTMLElement>('.subtitle-anim-js'); }
    private get _title(){ return this.element.querySelector<HTMLElement>('.title-anim-js'); }
    private get _cardTitle(){ return this.element.querySelectorAll<HTMLElement>('.card-title-anim-js'); }
    private get _cardDesc(){ return this.element.querySelectorAll<HTMLElement>('.card-desc-anim-js'); }
    private get _cardIcon(){ return this.element.querySelectorAll<HTMLElement>('.card-icon-anim-js'); }

    private async _setupLotties() {
        const containers = this.element.querySelectorAll<HTMLImageElement>('.logo-lottie');

        containers.forEach(async(container) => {
            const lottie = await new LottieComponent({
                el: container,
                autoplay: false,
                renderer: 'canvas',
                loop: false,
                playOnActivate: false,
            }).setup();

            lottie.activate();

            container.addEventListener('mouseenter', () => {
                if (lottie.animation.isPaused) {
                    lottie.animation.setDirection(1);
                    lottie.animation.goToAndPlay(0, true);
                }
            });

            this._lottieIcons.push(lottie);
        });
    }

    private _setupAnimItems(){
        gsap.set([this._subtitle, this._title, this._cardTitle, this._cardDesc, this._cardIcon ], { autoAlpha: 0 });
    }

    protected _show = () => {
        if (this._animated) return;

        let i = 0;
        const offsetY = AnimationValues.distance * this._rem;
        const fromSettings = { autoAlpha: 0, y: offsetY };
        const toSettings = {
            autoAlpha: 1,
            y: 0,
            duration: AnimationValues.duration,
            ease: AnimationValues.showEase,
            stagger: AnimationValues.stagger,
        };
        const iconToSettings = {
            autoAlpha: 1,
            y: 0,
            duration: AnimationValues.duration,
            ease: AnimationValues.showEase,
            stagger: {
                each: AnimationValues.stagger,
                onComplete: () => this._lottieIcons[i++].animation.play(),
            },
        };
        const tl = gsap.timeline({ immediateRender: false, force3d: false, onStart: () => this._animated = true });
        return tl
            .fromTo(this._subtitle, fromSettings, toSettings, 0)
            .fromTo(this._title, fromSettings, toSettings, AnimationValues.stagger)
            .fromTo(this._cardIcon, fromSettings, iconToSettings, AnimationValues.stagger * 2)
            .fromTo(this._cardTitle, fromSettings, toSettings, AnimationValues.stagger * 3)
            .fromTo(this._cardDesc, fromSettings, toSettings, AnimationValues.stagger * 4);
    };

    async resize() {
        this._rem = Breakpoints.Current.rem;
    }

    async setupSection() {
        this._setupLotties();
        this._setupAnimItems();
    }

    protected _activate() {
        this._show();
    }

    protected _deactivate() {
        //
    }
}
