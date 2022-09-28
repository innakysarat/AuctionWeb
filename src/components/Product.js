import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

function Product() {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productPrice, setProductPrice] = useState('');

    const PRICE_REGEX = /^\d+(\.\d+)*$/;
    const [price, setPrice] = useState('');
    const [validPrice, setValidPrice] = useState(false);
    const [priceFocus, setPriceFocus] = useState(false);

    useEffect(() => {
        setValidPrice(PRICE_REGEX.test(price));
    }, [price])

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/adverts/${id}`);
            const data = await response.json();
            setProduct(data);
            setProductPrice(data.price);
            setLoading(false);
        }
        getProduct();
    }, [id]);

    const Loading = () => {
        return (
            <>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <NavLink className="text-decoration-none text-dark" to={`/`}>
                            <div className="d-flex align-items-center m-3">
                                <Skeleton height={20} width={50} />
                            </div>
                        </NavLink>
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="images p-3">
                                        <div className="text-center p-4">
                                            <Skeleton height={300} width={250} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="border p-4">
                                        <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">                                                <Skeleton height={30} width={150} />
                                        </span>
                                            <h5 className="text-uppercase">
                                                <Skeleton height={30} width={200} />
                                            </h5>
                                            <div className="price d-flex flex-row align-items-center">
                                                <span className="act-price">
                                                    <Skeleton height={20} width={70} />
                                                    <Skeleton height={30} width={100} />
                                                </span>
                                            </div>
                                        </div>
                                        <p className="about">
                                            <Skeleton height={10} width={300} />
                                            <Skeleton height={10} width={300} />
                                            <Skeleton height={10} width={300} />
                                            <Skeleton height={10} width={300} />
                                        </p>
                                        <div className="cart mt-4 align-items-center">
                                            <Skeleton height={40} width={150} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = PRICE_REGEX.test(price);
        if (!v1) {
            setErrMsg("Invalid price");
            return;
        }
        try {
            console.log(localStorage.getItem("token"));
            console.log(id);
            console.log(price);
            // const params = new URLSearchParams({
            //     price: price
            // }).toString();
            axios
                .put(
                    `http://localhost:8080/api/adverts/price/${id}?price=${price}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
            setPrice('');
            setProduct(product);
            // const response = await fetch(`http://localhost:8080/api/adverts/${id}`);
            // const data = await response.json();
            // setProduct(data);
            setProductPrice(price);
        } catch (err) {
            setErrMsg('Failed to offer a price')
            errRef.current.focus();
        }
    }
    const ShowDetails = () => {
        return (
            <>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <NavLink className="text-decoration-none text-dark" to={`/home`}>
                            <div className="d-flex align-items-center m-3">
                                <i className="fa fa-long-arrow-left"></i>
                                <span className="ml-1">&nbsp;Back</span>
                            </div>
                        </NavLink>
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="images p-3">
                                        <div className="text-center p-4">
                                            <img id="main-image" alt="product" src={product.advertImageLink} width="250" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="border p-4">
                                        <div className="mt-4 mb-3">

                                            <span className="text-muted text-capitalize"> in {product.category}</span>

                                            <h5 className="text-uppercase">
                                                {product.title}
                                            </h5>

                                            {/* Rating {product.rating && product.rating.rate}
                                            <i className="fa fa-star text-warning"></i> */}

                                            <div className="price d-flex flex-row align-items-center">
                                                {/* <big className="display-6"><b>${product.price}</b></big> */}
                                                <big className="display-6"><b>${productPrice}</b></big>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <p className="text-muted">{product.description}</p>
                                        </div>
                                        {/* <div className="cart mt-4 align-items-center"> <button className="btn btn-outline-dark text-uppercase mr-2 px-4">Buy</button></div> */}
                                        <section>
                                            {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
                                            <h5>State your offered price:</h5>
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="text"
                                                    id="price"
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    value={price}
                                                    aria-invalid={validPrice ? "false" : "true"}
                                                    aria-describedby="pricenote"
                                                // onFocus={() => setPriceFocus(true)}
                                                // onBlur={() => setPriceFocus(false)}
                                                />
                                                <button
                                                    disabled={!validPrice ? true : false}
                                                >Offer price</button>
                                            </form>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>

                {loading ? <Loading /> : <ShowDetails />}

            </div>
        </>
    )
}

export default Product;