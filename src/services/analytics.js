import ReactGA from 'react-ga';

export const pageViewsTracking = (props) => {
    if(typeof props == "undefined"){
        return false;
    }

    const { pathname } = props;
    ReactGA.pageview(pathname);
}
