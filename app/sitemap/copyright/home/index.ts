import type { PageCopyright } from '../types';
import { HomeEnCopy } from './en';

export type HomeCopyrightShape = typeof HomeEnCopy;

export const HomeCopyright: PageCopyright<HomeCopyrightShape> = {
    default: 'en',
    en: HomeEnCopy,
};
