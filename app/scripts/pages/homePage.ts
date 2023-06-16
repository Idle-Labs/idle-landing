// import styles in the correct order:
import 'styles/base.sass';
import 'styles/home';

import Section, { SectionCtor } from 'app/core/section';
import CommonPage from './commonPage';

// import DevelopersSection from 'app/sections/DevelopersSection';
// import AboutSection from 'app/sections/AboutSection';
import HeroSection from 'app/sections/HeroSection';
import ProductSection from 'app/sections/ProductSection';
import IntegrationSection from 'app/sections/IntegrationSection';
import SecuritySection from 'app/sections/SecuritySection';
import ProtocolsSection from 'app/sections/ProtocolsSection';
import PlayersSection from 'app/sections/PlayersSection';
import StatsSection from 'app/sections/StatsSection';
// import RewardSection from 'app/sections/RewardSection';
import CommunitySection from 'app/sections/CommunitySection';
import InvestorsSection from 'app/sections/InvestorsSection';

export default class HomePage extends CommonPage {
    _sectionTypes: SectionCtor[] = [
        HeroSection,
        ProductSection,
        StatsSection,
        PlayersSection,
        // IntegrationSection,
        ProtocolsSection,
        SecuritySection,
        // AboutSection,
        // DevelopersSection,
        // RewardSection,
        InvestorsSection, // investors
        CommunitySection,
    ];

    async setupPageAsync() {
        await super.setupPageAsync();
    }

    get sectionTypes() {
        return this._sectionTypes;
    }

}

HomePage.RunPage(HomePage);
