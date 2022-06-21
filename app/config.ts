/*
    This module is supposed to be used in build time only.
*/

export type Environments = 'production' | 'staging' | 'development';

/* global process */
export const APP_ENV = (process.env.APP_ENV || 'development') as Environments;

export type EnvironmentConfig = {
    Hostname: string,
    EnableLogger: boolean,
};

const Configs: Partial<Record<Environments, EnvironmentConfig>> = {
    development: {
        Hostname: 'http://localhost:8080',
        // Hostname: 'http://192.168.0.179:8080',
        EnableLogger: true,
    },
    staging: {
        Hostname: 'https://beta.idle.finance/',
        EnableLogger: true,
    },
    production: {
        Hostname: 'https://idle.finance/',
        EnableLogger: false,
    },
};

export const CurrentConfig = Configs[APP_ENV];
