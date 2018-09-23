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

        let username = this.state.username;
        let password = this.state.password;
        DataManager.getAll("users")
            .then(users => {
                let loginUser = users.find(u => u.activePassword === password && u.activeUser === username)
                if (loginUser) {
                    sessionStorage.setItem(
                        "credentials",
                        JSON.stringify({
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
    
    
    render() {
        let registerLink = () => this.props.history.push("/register")
        let session = sessionStorage.getItem("credentials")
        return (
            <React.Fragment>
            {session === null &&
            <form>
                <h1>Welcome back</h1>
                <label htmlFor="activeUser">
                    Username
                </label>
                <input onChange={this.handleFieldChange} type="username"
                    id="username"
                    placeholder="Username"
                    required="" autoFocus="" />
                <label htmlFor="activePassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Password"
                    required="" autoFocus="" />
                <button onClick={this.handleLogin}>
                    Sign In
                </button>

                <button onClick={registerLink.bind()}>
                    Register
                </button>
            </form>
            }
            </React.Fragment>
        )
    }
}