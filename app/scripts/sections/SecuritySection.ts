import breakpoints from 'app/core/breakpoints';
import Section from 'app/core/section';

import gsap from 'gsap';

import { AnimationValues } from 'app/utils/animation';
import LottieComponent from 'app/components/common/lottie';

export default class SecuritySection extends Section {
    private _animated: boolean;
    private _rem: number;
    private _lottieIcons: LottieComponent[] = [];

    private get _subtitle(){ return this.element.querySelector<HTMLElement>('.subtitle-anim-js'); }
    private get _title(){ return this.element.querySelector<HTMLElement>('.title-anim-js'); }
    private get _desc(){ return this.element.querySelector<HTMLElement>('.desc-anim-js'); }
    private get _cards(){ return this.element.querySelectorAll<HTMLElement>('.card-anim-js'); }

    private async _setupLotties() {
        const items = this.element.querySelectorAll<HTMLElement>('.audits__item');

        items.forEach(async(item) => {
            const container = item.querySelector<HTMLImageElement>('.logo-lottie');

            const lottie = await new LottieComponent({
                el: container,
                autoplay: false,
                renderer: 'canvas',
                loop: false,
                playOnActivate: false,
            }).setup();

            lottie.activate();

            item.addEventListener('mouseenter', () => {
                if (lottie.animation.isPaused) {
                    lottie.animation.setDirection(1);
                    lottie.animation.goToAndPlay(0, true);
                }
            });

            this._lottieIcons.push(lottie);
        });
    }

    private _setupAnimItems(){
        gsap.set([this._subtitle, this._title, this._desc], { autoAlpha: 0 });
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

        const tl = gsap.timeline({
            immediateRender: false,
            force3d: false,
            onStart: () => this._animated = true,
            onComplete: () => this._lottieIcons.forEach((item) => item.animation.play()),
        });
        return tl
            .fromTo(this._subtitle, fromSettings, toSettings, 0)
            .fromTo(this._title, fromSettings, toSettings, AnimationValues.stagger)
            .fromTo(this._desc, fromSettings, toSettings, AnimationValues.stagger * 2)
            .fromTo(this._cards, { y: offsetY * 2 }, { y: 0, duration: AnimationValues.duration, ease: AnimationValues.showEase, stagger: AnimationValues.stagger }, AnimationValues.stagger * 3);
    };

    async resize() {
        this._rem = breakpoints.Current.rem;
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
