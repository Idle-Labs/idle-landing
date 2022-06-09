import Section from 'app/core/section';
import Breakpoints from 'app/appBreakpoints';

import gsap from 'gsap';

import { AnimationValues } from 'app/utils/animation';

export default class InvestorsSection extends Section {
    private _animated: boolean;
    private _rem: number;

    private get _desktopAnimationItem(){ return this.element.querySelectorAll<HTMLElement>('.desktop-anim-item-js'); }
    private get _mobileAnimationItems(){ return this.element.querySelectorAll<HTMLElement>('.mobile-anim-item-js'); }

    private _setupAnimItems(){
        gsap.set([this._desktopAnimationItem, this._mobileAnimationItems], { autoAlpha: 0 });
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
            .fromTo(this._desktopAnimationItem, fromSettings, toSettings, 0)
            .fromTo(this._mobileAnimationItems, fromSettings, toSettings, 0);
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
