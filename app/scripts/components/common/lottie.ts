import type { LottiePlayer, AnimationConfigWithPath, AnimationItem, CanvasRendererConfig } from 'lottie-web';
import gsap from 'gsap';
import lottie from 'lottie-web';

import LazyLoadComponent, { LazyLoadConfig } from 'app/components/lazy/lazyLoadComponent';
import { createLogger } from 'app/logger';

const logger = createLogger('[LottieComponent]');

export type LottieComponentConfig = LazyLoadConfig & {
    /** @default true */
    loop?: boolean;
    /** @default true */
    autoplay?: boolean;
    /** @default true */
    hideOnDeactivate?: boolean | 'first';
    /** @default 'svg' */
    renderer?: 'svg' | 'canvas' | 'html';
    /** @default true */
    playOnActivate?: boolean;

    rendererSettings?: CanvasRendererConfig;
};

const LottieLoader = () => import('lottie-web') as Promise<any>;
let LottieLibLoading: Promise<LottiePlayer>;

async function loadLottie() {
    if (!LottieLibLoading) {
        logger.log('Loading library...');
        LottieLibLoading = LottieLoader();
        LottieLibLoading.then(() => logger.log('Library has been loaded'));
    }
    return LottieLibLoading;
}

export default class LottieComponent extends LazyLoadComponent<LottieComponentConfig> {
    private _params: AnimationConfigWithPath;
    private _isCompleted: boolean = true;
    private _anim: AnimationItem;

    private _isLoaded: boolean = false;
    private _playPending: boolean = false;

    private _lottie: LottiePlayer;
    private _playingPromise: Promise<void> = null;

    public get animation(): AnimationItem { return this._anim; }

    get priority() { return this._priority || 3; }
    get isPlaying() { return this.animation.isLoaded && !this.animation.isPaused; }

    async doSetup() {
        this.useDefaultConfig({ register: true, loop: true, hideOnDeactivate: true, autoplay: true, playOnActivate: true });

        this._params = {
            container: this.element,
            renderer: this._config.renderer || 'svg',
            loop: this._config.loop,
            autoplay: this._config.autoplay,
            path: this.element.dataset.lottiePath,
            rendererSettings: this._config.rendererSettings,
        };

        if (this._config.hideOnDeactivate) {
            gsap.set(this.element, { autoAlpha: 0.0 });
        } else {
            gsap.set(this.element, { autoAlpha: 1.0 });
        }
        lottie.setQuality('low');
        await super.doSetup();
    }

    public playAnimation() {
        if (this._playingPromise) {
            return this._playingPromise;
        }
        this._playingPromise = new Promise<void>(resolve => {
            const onComplete = () => {
                this._playingPromise = null;
                resolve();
            };

            this._anim.addEventListener('complete', onComplete);
            this._anim.play();
        });
        return this._playingPromise;
    }

    protected async _doLoading(): Promise<void> {
        this._lottie = await loadLottie();

        this._anim = this._lottie.loadAnimation(this._params);
        this._anim.addEventListener('complete', () => {
            this._isCompleted = true;
        });

        if (this._anim.isLoaded) {
            this._isLoaded = true;
            return Promise.resolve();
        }

        await new Promise<void>(resolve => {
            this._anim.addEventListener('DOMLoaded', () => {
                this._isLoaded = true;
                if (this._playPending) {

                    this._playPending = false;
                    setTimeout(() => {
                        logger.log('Play Pending', this);
                    }, 500);
                    this._anim.play();
                }

                resolve();
            });
        });
    }

    private _play = () => {
        if (!this._anim) {
            return;
        }

        if (this._isLoaded) {
            if (this._isCompleted) {
                this._anim.goToAndStop(0);
                this._isCompleted = false;
            }
            this._anim.play();
        } else {
            this._playPending = true;
        }
    };

    private _stop() {
        this._anim?.goToAndStop(0);
        this._isCompleted = false;
    }

    protected async _activate() {
        if (this._config.hideOnDeactivate) {
            const skip = this._config.hideOnDeactivate === 'first' && this.wasActive;
            if (!skip) {
                await this.showByAlpha();
            }
        }
        if (this._config.playOnActivate) {
            this._play();
        }
    }

    protected async _deactivate() {
        if (this._config.hideOnDeactivate === true) {
            await this.hideByAlpha();
        }
        if (this._config.playOnActivate) {
            this._stop();
        }
    }

    private async showByAlpha() {
        gsap.killTweensOf(this.element);
        await gsap.set(
            this.element,
            { autoAlpha: 1, delay: this.activationConfig?.delay || 0 },
        );
    }

    private async hideByAlpha() {
        gsap.killTweensOf(this.element);
        await gsap.set(this.element,
            { autoAlpha: 0, delay: this.activationConfig?.delay || 0 },
        );
    }
}
