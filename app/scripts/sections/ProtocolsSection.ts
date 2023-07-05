import breakpoints from 'app/core/breakpoints';
import Section from 'app/core/section';
import Breakpoints from 'app/appBreakpoints';

import gsap from 'gsap';

import { AnimationValues } from 'app/utils/animation';
import setCurrentDevice from 'app/utils/currentDevice';

export default class ProtocolsSection extends Section {
    private _initialSetup: boolean = true;
    private _animated: boolean;
    private _rem: number;
    private _activeSection: string | null = null
    private _currentDevice: 'desktop' | 'tablet' | 'mobile';

    private get _logo1(){ return this.element.querySelector<HTMLElement>('.logo-anim-js-1'); }
    private get _logo2(){ return this.element.querySelector<HTMLElement>('.logo-anim-js-2'); }
    private get _logo3(){ return this.element.querySelector<HTMLElement>('.logo-anim-js-3'); }
    private get _logo4(){ return this.element.querySelector<HTMLElement>('.logo-anim-js-4'); }
    private get _logo5(){ return this.element.querySelector<HTMLElement>('.logo-anim-js-5'); }
    private get _logo6(){ return this.element.querySelector<HTMLElement>('.logo-anim-js-6'); }

    private _setupAnimItems(){
        gsap.set([this._logo1, this._logo2, this._logo3, this._logo4, this._logo5, this._logo6], { autoAlpha: 0 });
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
        if (this._currentDevice === 'mobile') {
            return tl
            .fromTo(this._logo1, fromSettings, toSettings, 0)
            .fromTo(this._logo2, fromSettings, toSettings, AnimationValues.stagger)
            .fromTo(this._logo4, fromSettings, toSettings, AnimationValues.stagger * 2)
            .fromTo(this._logo6, fromSettings, toSettings, AnimationValues.stagger * 3)
            .fromTo(this._logo5, fromSettings, toSettings, AnimationValues.stagger * 4)
            .fromTo(this._logo3, fromSettings, toSettings, AnimationValues.stagger * 5);

        }
        return tl
            .fromTo(this._logo1, fromSettings, toSettings, 0)
            .fromTo(this._logo2, fromSettings, toSettings, AnimationValues.stagger)
            .fromTo(this._logo3, fromSettings, toSettings, AnimationValues.stagger * 2)
            .fromTo(this._logo4, fromSettings, toSettings, AnimationValues.stagger * 3)
            .fromTo(this._logo5, fromSettings, toSettings, AnimationValues.stagger * 4)
            .fromTo(this._logo6, fromSettings, toSettings, AnimationValues.stagger * 5);
    };

    async resize() {
        this._rem = breakpoints.Current.rem;
        await this._setCurrentDevice();
    }

    private async _setCurrentDevice() {
        this._currentDevice = setCurrentDevice(Breakpoints);
    }

    private setActiveSection() {

        const isMobile = window.innerWidth<=480;

        const filtersElement = this.element.querySelector<HTMLElement>('#filters-container');
        const filtersParent = filtersElement.offsetParent;
        const activeFilterElement = this.element.querySelector<HTMLElement>('.filters__tag.active');

        if (isMobile){
            const filterRequiredMargin = (filtersParent.clientWidth-activeFilterElement.clientWidth)/2;
            const filterOffsetLeft = activeFilterElement.offsetLeft;
            const missingOffset = filterRequiredMargin-filterOffsetLeft;
            const filtersMarginLeft = +filtersElement.style.marginLeft.replace('px','');
            filtersElement.style.marginLeft = (filtersMarginLeft+missingOffset)+'px';
        }

        const activeSectionId = activeFilterElement?.dataset?.id;
        if (activeSectionId){
            // Hide all sections
            const protocolsSections = this.element.querySelectorAll<HTMLElement>('.protocols');
            protocolsSections.forEach( (item, i) => {
                item.style.display = 'none';
            })
            // Show selected section
            const protocolsSection = this.element.querySelector<HTMLElement>('#protocols-'+activeSectionId);
            protocolsSection.style.display = 'flex';
        }
    }

    private addEventsListener() {

        window.addEventListener("resize", () => this.setActiveSection());

        const filters = this.element.querySelectorAll<HTMLElement>(".filters__tag");
        filters.forEach( (item, i) => {
            item.addEventListener('click', () => {
                filters.forEach( (filter, j) => {
                    if (i === j){
                        filter.className = 'filters__tag label-2 active';
                    } else {
                        filter.className = 'filters__tag label-2';
                    }
                })
                this.setActiveSection();
            })
        })
    }

    async setupSection() {
        if (this._initialSetup) {
            this._initialSetup = false;
        }

        this._setupAnimItems();
        await this._setCurrentDevice();
        this.addEventsListener();
        this.setActiveSection();
    }

    protected _activate() {
        this._show();
    }

    protected _deactivate() {
        //
    }
}
