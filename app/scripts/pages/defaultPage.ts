import 'styles/base.sass';
import 'styles/tos';

import logger from 'app/logger';
import Section from '../core/section';
import CommonPage from './commonPage';

const defaultOptions = {
    sectionsNumber: 1,

    header: true,
    imagesLazyLoad: true,
    videoModals: false,
};

export default function CreateDefaultPage(options) {
    const opts = Object.assign({}, defaultOptions, options);

    const _sectionTypes = [];

    for (let i = 0; i < opts.sectionsNumber; ++i) {
        _sectionTypes.push(Section);
    }

    return class DefaultPage extends CommonPage {
        static SectionTypes = _sectionTypes;

        get sectionTypes() {
            return DefaultPage.SectionTypes;
        }

        get enableHeader() { return opts.header; }

        get enabledImagesLazyLoad() {
            return opts.imagesLazyLoad;
        }

        get enableVideoModals() {
            return opts.videoModals;
        }
    };
}

const DefaultPage = CreateDefaultPage({});
DefaultPage.RunPage(DefaultPage);