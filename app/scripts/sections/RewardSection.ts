import Section from 'app/core/section';
import Breakpoints from 'app/appBreakpoints';

import gsap from 'gsap';

import { AnimationValues } from 'app/utils/animation';

export default class RewardSection extends Section {
    private _animated: boolean;
    private _rem: number;

    private get _title(){ return this.element.querySelector<HTMLElement>('.title-anim-js'); }
    private get _logo(){ return this.element.querySelector<HTMLElement>('.logo-anim-js'); }
    private get _desc(){ return this.element.querySelector<HTMLElement>('.desc-anim-js'); }
    private get _button(){ return this.element.querySelector<HTMLElement>('.button-anim-js'); }


    private _setupAnimItems(){
        gsap.set([this._title, this._logo, this._desc, this._button ], { autoAlpha: 0 });
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
            .fromTo(this._title, fromSettings, toSettings, 0)
            .fromTo(this._logo, fromSettings, toSettings, AnimationValues.stagger)
            .fromTo(this._desc, fromSettings, toSettings, AnimationValues.stagger * 2)
            .fromTo(this._button, fromSettings, toSettings, AnimationValues.stagger * 3);
    };

    async resize() {
        this._rem = Breakpoints.Current.rem;
    }

    async setupSection() {
        this._setupAnimItems();
    }

    protected _activate() {
        this._show();
    }

    protected _deactivate() {
        //
    }
}
