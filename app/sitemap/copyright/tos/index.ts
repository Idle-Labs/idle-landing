import type { PageCopyright } from '../types';
import { TosEnCopy } from './en';

export type TosCopyrightShape = typeof TosEnCopy;

export const TosCopyright: PageCopyright<TosCopyrightShape> = {
    default: 'en',
    en: TosEnCopy,
};
