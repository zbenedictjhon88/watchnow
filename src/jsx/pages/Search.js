import { Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { movieSearch, movieSearchPage } from "../../services/actions/MovieAction";
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "../../services/stores/storage";
import CustomCard from "../components/CustomCard";
import Loading from "../components/Loading";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { pageViewsTracking } from "../../services/analytics";


function Search(props) {

    let { id } = useParams();
    let location = useLocation();
    const keyword = id;

    const [video, setVideo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        pageViewsTracking(location);

        if (getLocalStorage(keyword + page) == null) {
            new Promise(() => {
                movieSearchPage(keyword, page).then(res => {
                    setVideo(res.results);
                    setIsLoading(false);
                    setHasNextPage(res.hasNextPage);
                });
            });
        }

        let data = getLocalStorage(keyword + page);
        if (data != null) {
            setVideo(data.results);
            setIsLoading(false);
            setHasNextPage(data.hasNextPage);
        }

    }, [id, page])

    if (isLoading) return <Loading />;

    const prev = (e) => {
        e.preventDefault();
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const next = (e) => {
        e.preventDefault();
        setPage(page + 1);
    }

    return (
        <div className="row">
            {video.length == 0 ? <NotFound /> : video.map((data, i) => {
                return (
                    <CustomCard
                        key={i}
                        url={'/info/' + data.id}
                        image={data.image}
                        title={data.title}
                        type="Asian Drama"
                    />
                );
            })}

            <div className="col-lg-12 text-center mt-auto">
                <button onClick={prev} className="btn btn-danger">
                    Prev
                </button>
                {' '}
                <button onClick={next} className="btn btn-danger" disabled={!hasNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Search;

