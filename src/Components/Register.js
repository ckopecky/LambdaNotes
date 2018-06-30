import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props);
        this.state ={
            username: "",
            password: ""
        }
    }

    //handleChange

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    //handleClick

    handleClick = (e) => {
        axios.post("http://localhost:5555/api/user/register", this.state)
            .then(response => {
                localStorage.setItem("jwt", response.data.token);
                this.props.history.push("/notes");
            })
    }



    render() {
        console.log(this.state);
        return (
            <div className="main-form-container">
                <div className="form-wrapper">
                    <h1>New User? Register Here</h1>
                    <div className="input-wrapper">
                    <label className="label">Username:</label>
                    <input onChange={this.handleChange} name="username" type="text" value={this.state.username}/>
                    </div>
                    <div className="input-wrapper">
                    <label className="label">Password:</label>
                    <input onChange={this.handleChange} name="password" type="password" value={this.state.password}/>
                    </div>
                    <div className="button login-button"onClick={this.handleClick}>Register</div>
                    <Link to="/login"><div className="register-here">Already Have An Account? Login Here!</div></Link>
                </div>
            </div>
        );
    }
}

export default Register;