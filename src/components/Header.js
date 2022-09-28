import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate('/profile');
    };
    if (pathname == "products" || pathname == "products/:id" || pathname == "/home") {
        return (
            <div>
                <nav className="navbar bg-light fixed-top shadow">
                    <div className="container-fluid container">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <i className="fa fa-bars"></i>
                        </button>
                        <NavLink to="/">
                            <h1 className="title text-center text-dark"> AuctiON</h1>
                        </NavLink>
                        <button className="navbar-toggler" type="button" onClick={navigateProfile}>
                            <i className="fa fa-user"></i>
                        </button>
                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <NavLink to="/">
                                    <h1 className="title text-center text-dark"> AuctiON</h1>
                                </NavLink>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Header;