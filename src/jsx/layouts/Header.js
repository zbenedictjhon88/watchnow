import { Link } from "react-router-dom";

function Header(props) {
    return (
        <nav className="navbar navbar-expand-xl">
            <div className="container">
                <Link className='navbar-brand' to='/'>
                    WATCH<span>NOW</span>
                </Link>
            </div>
        </nav>
    );
}

export default Header;