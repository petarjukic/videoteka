import React, { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    const [email, setEmail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    // const navigate = Navigate();

    function onChangeFirstName(e) {
        setfirstName(e.target.value);
    }

    function onChangeLastName(e) {
        setLastName(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangePassword2(e) {
        setPassword2(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();
    
        if (password !== password2) {
           alert("Passwords do not match");
            return;
        }

        fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("User Registered!");
            // navigate('/login');
        })
        .catch((err)=>console.log(err));
    }

    return(
        <div>
            <div className="register-photo">
                <div className="form-container">
                    <div className="image-holder"></div>
                    <form onSubmit={(e) => {handleLogin(e);}}>
                        <h2 className="text-center"><strong>Create</strong> an account.</h2>
                        <div className="form-group">
                            <input className="form-control"
                                type="text" name="email"
                                value={firstName}
                                onChange={onChangeFirstName}
                                onBlur={onChangeFirstName}
                                placeholder="First name" />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                type="text" name="email"
                                value={lastName}
                                onChange={onChangeLastName}
                                onBlur={onChangeLastName}
                                placeholder="Last name" />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                type="email" name="email"
                                value={email}
                                onChange={onChangeEmail}
                                onBlur={onChangeEmail}
                                placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                type="password" name="password"
                                value={password}
                                onChange={onChangePassword}
                                onBlur={onChangePassword}
                                placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                type="password" name="password-repeat"
                                value={password2}
                                onChange={onChangePassword2}
                                onBlur={onChangePassword2}
                                placeholder="Password (repeat)" />
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label"></label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
                        </div>
                        <Link to={"/login"} ><a href="#" className="already">You already have an account? Login here.</a></Link>
                    </form>
                </div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default Register;