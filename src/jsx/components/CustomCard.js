import { Link } from "react-router-dom";

function CustomCard(props) {
    return (
        <div className='card' title={props.title}>
            <Link to={props.url}>
                <img src={props.image} />
            </Link>
            <div className="card-footer" hidden>
                <span>{props.type}</span>
                {/* <p>{props.title}</p> */}
            </div>
        </div>
    )
}

export default CustomCard;