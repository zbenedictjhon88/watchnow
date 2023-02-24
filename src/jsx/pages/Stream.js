import Hls from "hls.js";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { movieSearchInfo, movieStream } from "../../services/actions/MovieAction";
import { getLocalStorage, setLocalStorage } from "../../services/stores/storage";
import swal from "sweetalert";
import Player from "../components/ArtPlayer";
import { movieStreamProvider } from "../../services/providers/MovieProvider";
import Loading from "../components/Loading";

function Stream(props) {

    const navigate = useNavigate();
    let { episodeId, id, type } = useParams();

    const [watch, setWatch] = useState([]);
    const [vidinfo, setVidInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        let dataInfo = getLocalStorage(id + "/" + type);
        if (dataInfo != null) {
            setVidInfo(dataInfo);
        }

        if (getLocalStorage(episodeId) == null) {
            new Promise(() => {
                new Promise(() => {
                    movieStream(episodeId, id, type).then(res => {
                        setWatch(res);

                        playQuality(res);
                        playSubtitle(res);

                        setIsLoading(false);
                    })
                })
            });
        }

        let dataWatch = getLocalStorage(episodeId);
        if (dataWatch != null) {
            setWatch(dataWatch);

            playQuality(dataWatch);
            playSubtitle(dataWatch);

            setIsLoading(false);
        }

    }, [episodeId, id, type]);

    const playM3u8 = (video, url, art) => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);

            // optional
            art.hls = hls;
            art.once('url', () => hls.destroy());
            art.once('destroy', () => hls.destroy());
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        } else {
            art.notice.show = 'Unsupported playback format: m3u8';
        }
    }

    function playQuality(data) {
        let quality = [];
        for (var i = 0; i < data.sources.length; i++) {
            var url = data['sources'][i]['url'];
            if (i == 0) {
                quality[i] = {
                    default: true,
                    html: 'auto',
                    url: url
                }
            } else {
                quality[i] = {
                    html: 'Q-' + i,
                    url: url
                }
            }
        }

        setLocalStorage('quality', quality);
    }

    function playSubtitle(data) {
        let subtitle = [];
        for (var i = 0; i < data.subtitles.length; i++) {
            if (i == 0) {
                subtitle[i] = {
                    default: true,
                    html: data.subtitles[i]['lang'],
                    url: data.subtitles[i]['url']
                }
            } else {
                subtitle[i] = {
                    default: false,
                    html: data.subtitles[i]['lang'],
                    url: data.subtitles[i]['url']
                }
            }
        }

        setLocalStorage('subtitle', subtitle);
    }

    if (isLoading) return <Loading />;

    return (
        <div className="row">
            <div className="col-lg-9">
                <Player
                    option={{
                        title: vidinfo.title,
                        poster: vidinfo.image,
                        url: watch.length != 0 ? 'https://cors.consumet.stream/' + watch['sources'][0]['url'] : '',
                        quality: getLocalStorage('quality'),
                        customType: {
                            m3u8: playM3u8
                        },
                        settings: [
                            {
                                html: 'Subtitle',
                                selector: getLocalStorage('subtitle'),
                                tooltip: 'Default',
                                onSelect: function (item) {
                                    this.subtitle.switch(item.url, {
                                        name: item.html,
                                    });

                                    return item.html;
                                },
                            },
                        ],
                    }}
                    style={{
                        width: '100%',
                        height: '500px',
                        margin: '0',
                    }}
                    getInstance={(art) => {
                        // console.log(art);
                    }}
                />
            </div>
            <div className="col-lg-3">
                <h1>{vidinfo.title}</h1>
                <p>{vidinfo.description}</p>
                <table className='table table-border'>
                    <tbody>
                        <tr>
                            <td>Released Date</td>
                            <td>{vidinfo.releaseDate}</td>
                        </tr>
                        <tr>
                            <td>Other Name(s)</td>
                            <td>
                                {vidinfo.length != 0 ? vidinfo.otherNames.map((data, i) => {
                                    var otherNames = vidinfo.otherNames.length != i + 1 ? data + ', ' : data;
                                    return (
                                        <span key={i}>{otherNames}</span>
                                    );
                                }) : 'N/A'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Stream;