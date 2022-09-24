import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const { pathname } = useLocation();
    if (pathname === "/login" || pathname == "/register"
        || pathname == "/forget-password" || pathname == "/landing" || pathname == "/home") return null;
    return (
        <div>
            <nav className="navbar bg-light fixed-top shadow">
                <div className="container-fluid container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <i className="fa fa-bars"></i>
                    </button>
                    <NavLink to="/">
                        <img src="/auc.png" alt="logo" style={{ height: "90px" }} />
                        {/* AuctiON */}
                    </NavLink>
                    <button className="navbar-toggler" type="button">
                        <i className="fa fa-shopping-cart"></i>
                    </button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <NavLink to="/">
                                <img src="/Auction-logos.jpeg" alt="logo" style={{ height: "90px" }} />
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

export default Navbar;