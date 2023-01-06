import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext);
    // const navigate = Navigate();

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();
    
        fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            if (data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                setUser(email);
                // navigate('/');
            } else {
                console.log("Authentication error");
            }
        })
        .catch((err)=>console.log(err));
    }

    return(
        <div>
            <div className="login-clean">
                <form onSubmit={(e) => {handleLogin(e);}}>
                    <h2 className="sr-only">Login Form</h2>
                    <div className="illustration"><i class="icon ion-ios-navigate"></i></div>
                    <div className="form-group">
                        <input className="form-control" value={email}
                            onChange={onChangeEmail}
                            onBlur={onChangeEmail}
                            type="email" name="email" placeholder="Email" />
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
                        <button className="btn btn-primary btn-block" type="submit">Log In</button>
                    </div><br></br>
                   <Link to={"/register"}><a href="#" className="forgot">Signu up</a></Link>
                </form>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default Login;