import Breakpoints from 'app/appBreakpoints';
import Section from 'app/core/section';

import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

import { AnimationValues } from 'app/utils/animation';
import Video from 'app/components/common/video';
import setCurrentDevice from 'app/utils/currentDevice';

gsap.registerPlugin(SplitText);

export default class HeroSection extends Section {
    private _initialSetup: boolean = true;
    private _currentDevice: 'desktop' | 'tablet' | 'mobile';
    private _prevDevice: 'desktop' | 'tablet' | 'mobile';
    private _rem: number;
    private _animated: boolean;
    private _splitText: SplitText;
    private _titleLines: Element[] = null;
    private _video: Video;

    private get _title(){ return this.element.querySelector<HTMLElement>('.title-anim-js'); }
    private get _animationItems(){ return this.element.querySelectorAll<HTMLElement>('.anim-item-js'); }
    private get _discoverMore(){ return this.element.querySelector<HTMLElement>('.hero-discover-more'); }

    async setupVideo() {
        // if (this.element.querySelector('.video-js')) {
        //     this._video = await new Video({ el: this.element.querySelector('.video-js') }).setup();
        // }
    }

    private _setupAnimItems() {
        this._splitText = new SplitText(this._title, { type: 'lines' });
        this._titleLines = this._splitText.lines;

        gsap.set([this._titleLines], { autoAlpha: 0 });
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
        const delay = AnimationValues.stagger * this._titleLines.length;
        const tl = gsap.timeline({ immediateRender: false, force3d: false, onStart: () => this._animated = true });

        return tl
            .fromTo(this._titleLines, fromSettings, toSettings, 0)
            .fromTo(this._animationItems, fromSettings, toSettings, delay)
            .fromTo(this._discoverMore, fromSettings, toSettings, delay + AnimationValues.stagger);
    };

    async resize(width, height) {
        this._prevDevice = this._currentDevice;
        this._currentDevice = setCurrentDevice(Breakpoints);
        this._rem = Breakpoints.Current.rem;

        if (this._currentDevice !== this._prevDevice) {
            this._splitText.revert();
        }

        if (this._video) this._video.resize(width, height);
    }

    async setupSection() {
        if (this._initialSetup) {
            this._initialSetup = false;
        }

        this._setupAnimItems();
        await this.setupVideo();
    }

    protected _activate() {
        if (this._video) this._video.activate();
        this._show();
    }

    protected _deactivate() {
        //
    }
}
