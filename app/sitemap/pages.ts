import {
    TosCopyright,
    HomeCopyright
} from './copyright';
import { HomeCopyrightShape } from './copyright/home';
import { PageDependency, SitePage } from './types';

const Home: SitePage<HomeCopyrightShape> = {
    id: 'home',
    entryPoint: './app/scripts/pages/homePage.ts',
    templateName: 'app/html/index.ejs',
    output: {
        path: 'index.html',
        href: '/',
        image: 'og-image.png',
        locale: HomeCopyright.default,
        copy: HomeCopyright[HomeCopyright.default],
        title: 'Idle Finance - The Yield Automation Protocol',
        description: 'Idle offers first-rate yield optimization and risk tranching strategies. Get the best yield by using, integrating or building on top of Idle’s products.',
    },
};

const PageTos: SitePage = {
    id: 'terms-of-service',
    templateName: 'app/html/terms-of-service.ejs',
    entryPoint: './app/scripts/pages/tosPage.ts',
    output: {
        image: 'og-image.png',
        href: '/terms-of-service',
        locale: TosCopyright.default,
        path: 'terms-of-service.html',
        title: 'Idle Finance - Terms of Service',
        copy: TosCopyright[TosCopyright.default],
        description: 'Idle offers first-rate yield optimization and risk tranching strategies. Get the best yield by using, integrating or building on top of Idle’s products.'
    },
};

const PagePP: SitePage = {
    id: 'privacy-policy',
    templateName: 'app/html/privacy-policy.ejs',
    entryPoint: './app/scripts/pages/ppPage.ts',
    output: {
        locale: 'en',
        copy: undefined,
        image: 'og-image.png',
        href: '/privacy-policy',
        path: 'privacy-policy.html',
        title: 'Idle Finance - Privacy Policy',
        description: 'Idle offers first-rate yield optimization and risk tranching strategies. Get the best yield by using, integrating or building on top of Idle’s products.'
    },
};

const PageRdS: SitePage = {
    id: 'risks-disclosure-statement',
    templateName: 'app/html/risks-disclosure-statement.ejs',
    entryPoint: './app/scripts/pages/tosPage.ts',
    output: {
        locale: 'en',
        copy: undefined,
        image: 'og-image.png',
        href: '/risks-disclosure-statement',
        path: 'risks-disclosure-statement.html',
        title: 'Idle Finance - Risks Disclosure Statement',
        description: 'Idle offers first-rate yield optimization and risk tranching strategies. Get the best yield by using, integrating or building on top of Idle’s products.'
    },
};

const PageLegalNotice: SitePage = {
    id: 'legal-notice',
    templateName: 'app/html/legal-notice.ejs',
    entryPoint: './app/scripts/pages/tosPage.ts',
    output: {
        locale: 'en',
        copy: undefined,
        image: 'og-image.png',
        href: '/legal-notice',
        path: 'legal-notice.html',
        title: 'Idle Finance - Legal Notice',
        description: 'Idle offers first-rate yield optimization and risk tranching strategies. Get the best yield by using, integrating or building on top of Idle’s products.'
    },
};

const RestrictedPersons: SitePage = {
    id: 'restricted-persons',
    templateName: 'app/html/restricted-persons.ejs',
    entryPoint: './app/scripts/pages/tosPage.ts',
    output: {
        locale: 'en',
        copy: undefined,
        image: 'og-image.png',
        href: '/restricted-persons',
        path: 'restricted-persons.html',
        title: 'Idle Finance - Restricted Persons',
        description: 'Idle offers first-rate yield optimization and risk tranching strategies. Get the best yield by using, integrating or building on top of Idle’s products.'
    },
};

const Page404: SitePage = {
    id: '404',
    entryPoint: [
        './app/styles/base.sass',
        './app/styles/page404',
    ],
    templateName: 'app/html/page-404.ejs',
    output: {
        path: '404.html',
        href: '/404',
        title: 'Page Not Found',
        description: '',
        image: 'og-image.png',
        locale: 'en',
        copy: undefined,
    },
    disableScripts: true,
};

const NotSupported: SitePage = {
    id: 'not-supported',
    entryPoint: './app/scripts',
    templateName: 'app/html/common/ie.ejs',
    output: {
        path: 'not-supported.html',
        href: '/not-supported',
        title: '',
        description: '',
        image: 'og-image.png',
        locale: 'en',
        copy: undefined,
    },
    disableScripts: true,
};

const NoScript: SitePage = {
    id: 'no-script',
    entryPoint: [
        './app/styles/base.sass',
        './app/styles/noScript',
    ],
    templateName: 'app/html/no-script.ejs',
    output: {
        path: 'no-script.html',
        href: '/',
        title: 'Enable JavaScript',
        description: 'This website requires scripts to be enabled/allowed in your browser.',
        image: 'og-image.png',
        locale: 'en',
        copy: undefined,
    },
    inlineCss: false,
    disableScripts: 'force',
    noIndex: true,
};

export const NoScriptId = NoScript.id;

export const Dependencies: PageDependency[] = [
    { name: 'polyfills', import: './app/scripts/polyfills', critical: true },
];

const pages: SitePage[] = [
    Home,
    PagePP,
    PageTos,
    PageRdS,
    Page404,
    NoScript,
    NotSupported,
    PageLegalNotice,
    RestrictedPersons
];

export default pages;
