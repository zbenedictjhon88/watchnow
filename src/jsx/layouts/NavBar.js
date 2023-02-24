import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

function NavBar(props) {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const find = (e) => {
        e.preventDefault();
        return navigate('search/' + search, {replace: true});
    }

    return (
        <nav className="navbar navbar-expand-xl">
            <div className="container">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to='/'>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/about'>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/terms'>
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <form className="d-flex" onSubmit={find}>
                        <input className="form-control me-2" value={search} type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;