import Section from 'app/core/section';
import Breakpoints from 'app/appBreakpoints';

import gsap from 'gsap';

import { AnimationValues } from 'app/utils/animation';

export default class DevelopersSection extends Section {
    private _animated: boolean;
    private _rem: number;

    private get _codeEditor() { return this.element.querySelector<HTMLTextAreaElement>('.code-editor'); }
    private get _copyButton() { return this.element.querySelector<HTMLElement>('.copy-button'); }
    private get _copyIcon() { return this.element.querySelector<HTMLElement>('.copy-icon'); }
    private get _checkedIcon() { return this.element.querySelector<HTMLElement>('.checked-icon'); }

    private get _title(){ return this.element.querySelector<HTMLElement>('.title-anim-js'); }
    private get _subtitle(){ return this.element.querySelector<HTMLElement>('.subtitle-anim-js'); }
    private get _secondTitle(){ return this.element.querySelector<HTMLElement>('.second-title-anim-js'); }
    private get _codeWrapper() { return this.element.querySelector<HTMLTextAreaElement>('.code-wrap'); }
    private get _desc(){ return this.element.querySelector<HTMLElement>('.desc-anim-js'); }
    private get _span(){ return this.element.querySelector<HTMLElement>('.span-anim-js'); }
    private get _logos(){ return this.element.querySelectorAll<HTMLElement>('.logo-anim-js'); }
    private get _buttons(){ return this.element.querySelectorAll<HTMLElement>('.button-anim-js'); }

    private _setupAnimItems(){
        gsap.set([this._title, this._subtitle, this._secondTitle, this._codeWrapper, this._desc, this._span, this._logos, this._buttons], { autoAlpha: 0 });
    }

    private _setupCopyButton() {
        const copyValue = () => {
            navigator.clipboard.writeText(this._codeEditor.textContent);
        };

        this._copyButton.addEventListener('click', () => {
            copyValue();
            this._copyIcon.classList.remove('active');
            this._checkedIcon.classList.add('active');

            setTimeout(() => {
                this._copyIcon.classList.add('active');
                this._checkedIcon.classList.remove('active');
            }, 750);
        });
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
            .fromTo(this._subtitle, fromSettings, toSettings, AnimationValues.stagger)
            .fromTo(this._secondTitle, fromSettings, toSettings, AnimationValues.stagger * 2)
            .fromTo(this._codeWrapper, fromSettings, toSettings, AnimationValues.stagger * 2)
            .fromTo(this._desc, fromSettings, toSettings, AnimationValues.stagger * 3)
            .fromTo(this._span, fromSettings, toSettings, AnimationValues.stagger * 4)
            .fromTo(this._logos, fromSettings, { autoAlpha: 1, y: 0, duration: AnimationValues.duration, ease: AnimationValues.showEase, stagger: AnimationValues.stagger / 2 }, AnimationValues.stagger * 5)
            .fromTo(this._buttons, fromSettings, toSettings, AnimationValues.stagger * 6);
    };

    async setupSection() {
        this._setupCopyButton();
        this._setupAnimItems();
    }

    async resize() {
        this._rem = Breakpoints.Current.rem;
    }

    protected _activate() {
        this._show();
    }

    protected _deactivate() {
        /* TODO */
    }
}
