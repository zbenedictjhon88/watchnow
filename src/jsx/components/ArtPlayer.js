import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

export default function Player({ option, getInstance, ...rest }) {
    const artRef = useRef();

    useEffect(() => {
        const art = new Artplayer(
            {
                ...option,
                container: artRef.current,
                autoOrientation: true,
                isLive: false,
                muted: false,
                autoplay: false,
                pip: true,
                autoSize: true,
                autoMini: true,
                screenshot: false,
                setting: true,
                loop: true,
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                fullscreenWeb: false,
                subtitleOffset: true,
                miniProgressBar: true,
                mutex: true,
                backdrop: true,
                playsInline: true,
                autoPlayback: true,
                airplay: true,
                volume: 0.5,
                lang: navigator.language.toLowerCase(),
                type: 'm3u8',
                theme: '#ff9000',
                moreVideoAttr: {
                    crossOrigin: 'anonymous',
                },
            },
        );

        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return <div ref={artRef} {...rest}></div>;
}
