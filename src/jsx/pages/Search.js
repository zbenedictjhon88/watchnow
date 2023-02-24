import { Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { movieSearch } from "../../services/actions/MovieAction";
import { clearLocalStorage, getLocalStorage } from "../../services/stores/storage";
import CustomCard from "../components/CustomCard";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";


function Search(props) {

    let { id } = useParams();
    const keyword = id;

    const [video, setVideo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (getLocalStorage(keyword) == null) {
            new Promise(() => {
                movieSearch(keyword).then(res => {
                    setVideo(res.results);
                    setIsLoading(false);
                });
            });
        }

        let data = getLocalStorage(keyword);
        if (data != null) {
            setVideo(data.results);
            setIsLoading(false);
        }
    }, [id])

    if (isLoading) return <Loading />;

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
        </div>
    );
}

export default Search;

