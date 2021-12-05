const breakpoints = {
 mobile: '320px',
 mobileL: '425px',
 tablet: '768px',
 laptop: '1024px',
 laptopL: '1440px',
 desktop: '2560px'
};

export const device = {
    mobile: `(min-width: ${breakpoints.mobile})`,
    mobileL: `(min-width: ${breakpoints.mobileL})`,
    tablet: `(min-width: ${breakpoints.tablet})`,
    laptop: `(min-width: ${breakpoints.laptop})`,
    laptopL: `(min-width: ${breakpoints.laptopL})`,
    desktop: `(min-width: ${breakpoints.desktop})`,
    desktopL: `(min-width: ${breakpoints.desktop})`
}
