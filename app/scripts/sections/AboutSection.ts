
import Section from 'app/core/section';
import TabsComponent from 'app/components/common/tabsComponent';
import Breakpoints from 'app/appBreakpoints';

import gsap from 'gsap';

import { AnimationValues } from 'app/utils/animation';
import setCurrentDevice from 'app/utils/currentDevice';

export default class AboutSection extends Section {
    private tabs: TabsComponent;

    private _animated: boolean;
    private _rem: number;
    private _currentDevice: 'desktop' | 'tablet' | 'mobile';
    private prevShowTab: GSAPTimeline;
    private prevHideTab: GSAPTimeline;

    private get _subtitle(){ return this.element.querySelector<HTMLElement>('.subtitle-anim-js'); }
    private get _title(){ return this.element.querySelector<HTMLElement>('.title-anim-js'); }
    private get _divider(){ return this.element.querySelector<HTMLElement>('.divider-anim-js'); }
    private get _links(){ return this.element.querySelectorAll<HTMLElement>('.link-anim-js'); }
    private get _initialTab() { return this.element.querySelector<HTMLElement>('.tab.active'); }
    private get _tabTitles(){ return this.element.querySelectorAll<HTMLElement>('.tab-title-anim-js'); }
    private get _tabDescriptions(){ return this.element.querySelectorAll<HTMLElement>('.tab-desc-anim-js'); }

    private _setupAnimItems(){
        gsap.set([this._subtitle, this._title, this._divider, this._links, this._tabTitles, this._tabDescriptions], { autoAlpha: 0 });
    }

    private async _setupTabs() {
        this.tabs = new TabsComponent({
            el: this.element,
            tabs: this.element.querySelectorAll('.tab-item'),
            links: this.element.querySelectorAll('.tab-link'),
            linkActiveClass: 'active',
            tabActiveClass: 'active',
            syncActivate: true,
            clicksEnabled: true,
            onWillChange: async (prev) => {
                await this._hideTab(prev.tabs[0].element);
            },
            onChanged: async(prev, next) => {
                await this._showTab(next.tabs[0].element);
            },
        });

        await this.tabs.setup();
    }


    protected _show = () => {
        if (this._animated) return;
        const initialTabTitles = this._initialTab.querySelectorAll<HTMLElement>('.tab-title-anim-js');
        const initialTabDescriptions = this._initialTab.querySelectorAll<HTMLElement>('.tab-desc-anim-js');

        const offsetY = AnimationValues.distance * this._rem;
        const fromSettings = { autoAlpha: 0, y: offsetY };
        const toSettings = {
            autoAlpha: 1,
            y: 0,
            duration: AnimationValues.duration,
            ease: AnimationValues.showEase,
            stagger: AnimationValues.stagger,
        };
        // for mobile links
        const fromSettings2 = { autoAlpha: 0, x: offsetY };
        const toSettings2 = {
            autoAlpha: 1,
            x: 0,
            duration: AnimationValues.duration,
            ease: AnimationValues.showEase,
            stagger: AnimationValues.stagger * 2,
        };
        const linksFromSettings = this._currentDevice === 'mobile' ? fromSettings2 : fromSettings;
        const linksToSettings = this._currentDevice === 'mobile' ? toSettings2 : toSettings;

        const tl = gsap.timeline({ immediateRender: false, force3d: false, onStart: () => this._animated = true });
        return tl
            .fromTo(this._subtitle, fromSettings, toSettings, 0)
            .fromTo(this._title, fromSettings, toSettings, AnimationValues.stagger)
            .fromTo(this._divider, fromSettings, toSettings, AnimationValues.stagger * 2)
            .fromTo(this._links, linksFromSettings, linksToSettings, AnimationValues.stagger * 3)
            .fromTo(initialTabTitles, fromSettings, toSettings, (AnimationValues.stagger + AnimationValues.stagger) * 3)
            .fromTo(initialTabDescriptions, fromSettings, toSettings, (AnimationValues.stagger + AnimationValues.stagger) * 4);
    };

    private _showTab(tab: HTMLElement) {
        this.prevShowTab?.totalProgress(1);
        const tabTitles = tab.querySelectorAll('.tab-title-anim-js');
        const tabDescriptions = tab.querySelectorAll('.tab-desc-anim-js');

        const offsetY = AnimationValues.distance * this._rem;
        const fromSettings = { autoAlpha: 0, y: offsetY };
        const toSettings = {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: AnimationValues.showEase,
            stagger: AnimationValues.stagger,
        };

        const tl = gsap.timeline({ force3d: false, immediateRender: false, delay: 0.5666 });
        this.prevShowTab = tl;
        return tl
            .fromTo(tabTitles, fromSettings, toSettings, 0)
            .fromTo(tabDescriptions, fromSettings, toSettings, AnimationValues.stagger);
    }

    private _hideTab(tab: HTMLElement) {
        this.prevHideTab?.totalProgress(1);
        const tabTitles = tab.querySelectorAll('.tab-title-anim-js');
        const tabDescriptions = tab.querySelectorAll('.tab-desc-anim-js');

        const offsetY = AnimationValues.distance * this._rem;
        const fromSettings = { autoAlpha: 1, y: 0 };
        const toSettings = {
            autoAlpha: 0,
            y: -offsetY,
            duration: 0.5,
            ease: AnimationValues.hideEase,
            stagger: AnimationValues.stagger,
        };

        const tl = gsap.timeline({ force3d: false, immediateRender: false });
        this.prevHideTab = tl;
        return tl
            .fromTo(tabTitles, fromSettings, toSettings, 0)
            .fromTo(tabDescriptions, fromSettings, toSettings, AnimationValues.stagger);

    }

    async resize() {
        this._rem = Breakpoints.Current.rem;

        await this._setCurrentDevice();
    }

    private async _setCurrentDevice() {
        this._currentDevice = setCurrentDevice(Breakpoints);
    }

    async setupSection() {
        await this._setupTabs();
        this._setupAnimItems();
        await this._setCurrentDevice();
    }

    protected _activate() {
        this.tabs.activate();
        this._show();
    }

    protected _deactivate() {
        this.tabs.deactivate();
    }
}

