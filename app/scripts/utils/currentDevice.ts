export default function setCurrentDevice(Breakpoints) {
    let result: 'desktop' | 'tablet' | 'mobile';
    if (window.matchMedia(Breakpoints.All.Desktop.mediaQuery).matches) {
        result = 'desktop';
    }
    if (window.matchMedia(Breakpoints.All.Tablet.mediaQuery).matches) {
        result = 'tablet';
    }
    if (window.matchMedia(Breakpoints.All.Mobile.mediaQuery).matches) {
        result = 'mobile';
    }
    return result;
}
