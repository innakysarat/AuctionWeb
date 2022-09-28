import React from 'react'
import Products from './Products';

const Home = () => {
    return (
        <>
            <div className="container px-0" style={{ marginTop: "66px" }}>
                <div id="AuctionCarouselInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src="banners/5.jpg" className="d-block w-100" alt="..." />
                        </div>
                        {/* <div className="carousel-item" data-bs-interval="2000">
                            <img src="banners/9.jpeg" className="d-block w-100" alt="..." />
                        </div> */}
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="banners/2.png" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="banners/4.png" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#AuctionCarouselInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#AuctionCarouselInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <Products />
            </div>
        </>
    )
}

export default Home;