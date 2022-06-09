import gsap from 'gsap';


export default class ScrollTopButton {
    private _offset: number;
    private _isActive: boolean;
    private _button: HTMLElement;

    constructor() {
        this._offset = 1300;
        this._button = document.body.querySelector<HTMLElement>('.scroll-top-button');

        this._setupScrollTopButton();
        document.addEventListener('scroll', (e) => {
            if (window.scrollY > this._offset) {
                this._show();
                return;
            }
            this._hide();
        });
    }

    public get offset() { return this._offset; }

    private async _setupScrollTopButton() {
        gsap.set([this._button], { autoAlpha: 0 });

        this._button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }

    private async _show() {
        if (this._isActive) return;
        const tl = gsap.timeline({ immediateRender: false, force3d: false, onStart: () => this._isActive = true });

        return tl.fromTo(this._button, { autoAlpha: 0 }, { autoAlpha: 1 });
    }

    private async _hide() {
        if (!this._isActive) return;
        const tl = gsap.timeline({ immediateRender: false, force3d: false, onStart: () => this._isActive = false });

        return tl.fromTo(this._button, { autoAlpha: 1 }, { autoAlpha: 0 });
    }
}
