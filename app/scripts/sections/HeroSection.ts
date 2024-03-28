import Breakpoints from 'app/appBreakpoints';
import Section from 'app/core/section';
import createSplideSlider, { MyTransition } from 'app/modules/slider';
import Splide from '@splidejs/splide';
import setCurrentDevice from 'app/utils/currentDevice';

export default class HeroSection extends Section {
    private _slider: Splide;
    private _initialSetup: boolean = true;
    private _currentDevice: 'desktop' | 'tablet' | 'mobile';
    private _prevDevice: 'desktop' | 'tablet' | 'mobile';
    private _rem: number;

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

    async resize(width, height) {
        this._prevDevice = this._currentDevice;
        this._currentDevice = setCurrentDevice(Breakpoints);
        this._rem = Breakpoints.Current.rem;

        if (this._prevDevice !== this._currentDevice && this._currentDevice !== 'desktop') {
            this._slider?.destroy();
            this._setupSlider();
        }
        if (this._prevDevice !== this._currentDevice && this._currentDevice === 'desktop') {
            this._slider?.destroy();
        }
    }

    async setupSection() {
        if (this._initialSetup) {
            this._initialSetup = false;
        }
        if (this._currentDevice !== 'desktop') {
            this._setupSlider();
        }

    }

    protected _activate() {
    }

    protected _deactivate() {
        //
    }
}
