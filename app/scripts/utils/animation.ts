import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

type FromSettings = {
    autoAlpha: number,
    y: number,
};

type ToSettings = {
    autoAlpha: number;
    y: number;
    duration: number;
    ease: any;
    stagger: number;
};

type Animation = {
    duration: number;
    stagger: number;
    distance: number;
    showEase: any;
    hideEase: any;
    defFromSettings(offset: number): FromSettings;
    defToSettings(): ToSettings;
};

export const AnimationValues: Animation = {
    duration: 0.83333,
    stagger: 0.06666,
    distance: 50,
    showEase: CustomEase.create('ShowEase', '.17,.17,.41,1'),
    hideEase: CustomEase.create('HideEase', '.59,.00,.83,.83'),

    defFromSettings(offset: number) {
        return {
            autoAlpha: 0,
            y: offset,
        };
    },
    defToSettings() {
        return {
            duration: this.duration,
            ease: this.showEase,
            stagger: this.stagger,
            autoAlpha: 1,
            y: 0,
        };
    },
};


