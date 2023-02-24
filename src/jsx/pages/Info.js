import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { movieSearchInfo } from '../../services/actions/MovieAction';
import { clearLocalStorage, getLocalStorage } from '../../services/stores/storage';
import Loading from '../components/Loading';

function Info(props) {

    let { id, type } = useParams();
    const [vidinfo, setVidInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (getLocalStorage(id + "/" + type) == null) {
            new Promise(() => {
                movieSearchInfo(id, type).then(res => {
                    setVidInfo(res);
                    setIsLoading(false);
                })
            })

        }

        let data = getLocalStorage(id + "/" + type);
        if (data != null) {
            setVidInfo(data);
            setIsLoading(false);
        }
    }, [id, type]);

    if (isLoading) return <Loading />;

    return (
        <div className='row'>
            <div className='col-lg-4 col-md-6 text-center'>
                <img src={vidinfo.image} className="info-image" />
            </div>
            <div className='col-lg-5 col-md-6 info-description'>
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
                {vidinfo.length != 0 ? vidinfo.episodes.map((data, i) => {
                    return (
                        <Link
                            key={i}
                            to={'/stream/' + data.id + '/' + vidinfo.id}
                            className="btn btn-danger"
                            style={{ margin: '3px' }}
                        >
                            {data.title}
                        </Link>
                    );
                }) : 'N/A'}
            </div>
        </div>
    );
}

export default Info;