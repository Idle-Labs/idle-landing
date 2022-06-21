// import styles in the correct order:
import 'styles/base.sass';
import 'styles/tos';

import Section, { SectionCtor } from 'app/core/section';
import CommonPage from './commonPage';

export default class ppPage extends CommonPage {
    _sectionTypes: SectionCtor[] = [];

    async setupPageAsync() {
        await super.setupPageAsync();
    }

    get sectionTypes() {
        return this._sectionTypes;
    }

}

ppPage.RunPage(ppPage);