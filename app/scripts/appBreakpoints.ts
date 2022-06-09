import Breakpoints, { BreakpointData } from 'app/core/breakpoints';

// TODO define & register additional breakpoints for your app

export enum BreakpointType {
    Desktop = 'Desktop',
    Tablet = 'Tablet',
    Mobile = 'Mobile',
}

const AppBreakpoints: Record<BreakpointType, BreakpointData> = {
    Desktop: {
        id: 3,
        name: BreakpointType.Desktop,
        width: 1440,
        height: 800,
        mediaQuery: '(min-width: 1025px)',
    },
    Tablet: {
        id: 2,
        name: 'Tablet',
        width: 768,
        height: 1024,
        mediaQuery: '(min-width: 481px) and (max-width: 1024px)',
    },
    Mobile: {
        id: 1,
        name: 'Mobile',
        width: 320,
        height: 1024,
        mediaQuery: '(max-width: 480px)',
    },
};

Breakpoints.registerBreakpoint(AppBreakpoints.Desktop);
Breakpoints.registerBreakpoint(AppBreakpoints.Tablet);
Breakpoints.registerBreakpoint(AppBreakpoints.Mobile);

// that's just a wrapper for core Breakpoints, nothing else should be added here
export default {
    get All(): Readonly<typeof AppBreakpoints> { return AppBreakpoints; },

    get Current() { return Breakpoints.Current; },

    isActive(...breakpointsIds: number[]) {
        return breakpointsIds.includes(this.Current.breakpoint.id);
    },
};
