import React, { Component } from "react"
import DataManager from "./data/DataManager"

export default class Login extends Component {

    // Set initial state
    state = {
        username: "",
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        let username = this.state.username;
        let password = this.state.password;
        DataManager.getAll("users")
            .then(users => {
                let loginUser = users.find(u => u.inputPassword === password && u.inputUsername === username)
                if (loginUser) {
                    sessionStorage.setItem(
                        "credentials",
                        JSON.stringify({
                            email: this.state.email,
                            password: this.state.password,
                            username: this.state.username,
                            id: loginUser.id
                        })
                    )
                    this.props.history.push("/days")
                } else {
                    alert("No user found, please register!")
                }
            })
    }

    constructNewUser = evt => {
        evt.preventDefault()
        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;
        DataManager.getAll("users").then((users) => {
            let loginUser = users.find(u => u.inputEmail === email && u.inputUsername === username && u.inputPassword === password)
            console.log(loginUser)
            if (loginUser) {
                alert("This user or email is already taken")
            } else {
                let newUser = {
                    inputUsername: this.state.username,
                    inputEmail: this.state.email,
                    inputPassword: this.state.password,
                }

                this.props.addUser(newUser, "users").then(() => this.props.history.push("/days"))
            }

        })
    }


    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <h1>Please sign in</h1>
                <label htmlFor="inputUsername">
                    Username
                </label>
                <input onChange={this.handleFieldChange} type="username"
                    id="username"
                    placeholder="Username"
                    required="" autoFocus="" />
                <label htmlFor="inputEmail">
                    Email address
                </label>
                <input onChange={this.handleFieldChange} type="email"
                    id="email"
                    placeholder="Email address"
                    required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Password"
                    required="" autoFocus="" />
                <button type="submit" onClick={this.constructNewUser}>
                    Register
                </button>
                <button type="submit" onClick={this.handleLogin}>
                    Sign In
                </button>
            </form>
        )
    }
}