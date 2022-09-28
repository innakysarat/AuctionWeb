import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Footer = () => {
    const { pathname } = useLocation();
    if (pathname == "/login" || pathname == "/register"
        || pathname == "/forget-password" || pathname =="/landing") return null;
    return (
        <div>
            <section>
                <footer className="text-center text-white" style={{ backgroundColor: "#0a4275" }}>

                    <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        © 2022&nbsp;
                        <NavLink className="text-light text-decoration-none" to="/">
                            AuctiON
                        </NavLink>
                    </div>
                </footer>
            </section>
        </div>
    )
}

export default Footer;
