import React from 'react';
import { useLocation } from 'react-router-dom';

const FooterAuth = () => {
    const { pathname } = useLocation();
    if (pathname === "/" || pathname == "/products"
        || pathname == "/product/:id") return null;
    return (
        <p className="text-center" style={FooterStyle}></p>
    )
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    // padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
}
export default FooterAuth;
