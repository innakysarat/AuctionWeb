import React from 'react'
import { Link } from 'react-router-dom'

import '../App.css'

export default function LandingPage() {
    return (
        <header style={ HeaderStyle}>
            <h1 className="main-title text-center text-dark">the Auction</h1>
            <p className="main-para text-center text-dark">join the AuctiON now</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button" id="reg_btn"><span>log in</span></button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link>
                <Link to="/home">
                    <button className="primary-button" id="reg_btn"><span>auction</span></button>
                </Link>
            </div>
        </header>
    )
}
const HeaderStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: "url(/negotiation3.jpeg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}