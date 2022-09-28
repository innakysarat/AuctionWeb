import { Button, Card, Row, Col, ButtonGroup, Form, Alert } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from 'react-router-dom';

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [userId, setUserId] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");

    const [showError, setShowError] = useState(false);
    const toEditHandler = () => {
        setUsername(username);
        setPassword(password);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPhone(phoneNumber);
        setLocation(location);
        setIsEdit(true);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .put(
                `http://localhost:8080/api/users/${userId}`,
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then(() => {
                setIsEdit(false);
            })
            .catch((err) => {
                setShowError(true);
            });
    };
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            return;
        } else {
            const getUser = async () => {
                await axios.get("http://localhost:8080/api/users", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
                    .then((response) => {
                        setUserId(response.data.userId);
                        setUsername(response.data.username);
                        setPassword(response.data.password);
                        setFirstName(response.data.firstName);
                        setLastName(response.data.lastName);
                        setEmail(response.data.email);
                        setPhone(response.data.phoneNumber);
                        setLocation(response.data.location);
                        setImage(response.data.userImageLink);
                    });
            }
            getUser();
        }
    }, []);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 15,
            }}
        >
            {isEdit ? (
                <>
                    <Form style={{ width: "50%" }}>
                        <Alert className={"alert alert-primary"}>
                            Edit your profile
                        </Alert>
                        {showError && (
                            <Alert variant="danger" onClose={() => setShowError(false)}>
                                <Alert.Heading>Error!</Alert.Heading>
                                <p>Invalid input</p>
                                <div className="d-flex justify-content-end">
                                    <Button onClick={() => setShowError(false)} variant="danger">
                                        Close
                                    </Button>
                                </div>
                            </Alert>
                        )}
                        <Form.Group>
                            <Form.Label className="mt-2">Username</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Type new username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Type your new password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">First name</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Type your name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">Surname</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Type your surname"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-2">E-mail</Form.Label>
                            <Form.Control
                                type="e-mail"
                                className="form-control"
                                placeholder="Type your email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-2">Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Type your phone number"
                                value={phoneNumber}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-2">Location</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Type your location"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                            />
                        </Form.Group>
                        <Row className="row justify-content-between mt-2 w-100">
                            <Col className="col-4 text-start">
                                <Button
                                    style={{ width: 220 }}
                                    type="submit"
                                    className="btn btn-primary mt-2 "
                                    onClick={onSubmitHandler}
                                >
                                    Save changes
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </>
            ) : (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="images p-3">
                                <div className="text-center p-4">
                                    <img id="main-image" alt="user" src={image} width="270" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="border p-4">
                                <div className="mt-4 mb-3">
                                    <h3 className="text">
                                        {username}
                                    </h3>
                                    <div className="price d-flex flex-row align-items-center">
                                        <p className="display-7">First name: {firstName}</p>

                                    </div>
                                    <div>
                                        <p className="display-7">Last name: {lastName}</p>
                                    </div>
                                    <div>
                                        <p className="display-8">Email: {email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="display-8">Phone number: {phoneNumber}</p>
                                </div>
                                <div>
                                    <p className="display-8">Location: {location}</p>
                                </div>
                                 <button className="btn btn-dark btn-block" id="reg_btn" onClick={() => toEditHandler()}><span>Edit</span></button>
                                <footer>
                                    <p>Back to home page? <Link to="/">Auction</Link></p>
                                </footer>
                            </div>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Profile;