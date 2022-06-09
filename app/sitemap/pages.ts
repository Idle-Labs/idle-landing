import {
    HomeCopyright,
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
        title: 'Idle Finance',
        description: 'Idle Finance.',
        image: 'og-image.png',
        locale: HomeCopyright.default,
        copy: HomeCopyright[HomeCopyright.default],
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
    inlineCss: true,
    disableScripts: 'force',
    noIndex: true,
};

export const NoScriptId = NoScript.id;

export const Dependencies: PageDependency[] = [
    { name: 'polyfills', import: './app/scripts/polyfills', critical: true },
];

const pages: SitePage[] = [
    Home,
    Page404,
    NotSupported,
    NoScript,
];

export default pages;
