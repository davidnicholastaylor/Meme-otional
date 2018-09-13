import React, { Component } from "react"
import DataManager from "./data/DataManager"

export default class Register extends Component {


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

        constructNewUser = evt => {
            evt.preventDefault()
            let username = this.state.username;
            let email = this.state.email;
            let password = this.state.password;
            DataManager.getAll("users")
            .then((users) => {
                let loginUser = users.find(u => u.inputEmail === email && u.inputUsername === username && u.inputPassword === password)
                if (loginUser) {
                    alert("This user or email is already taken")
                } else {
                    let newUser = {
                        inputUsername: this.state.username,
                        inputEmail: this.state.email,
                        inputPassword: this.state.password,
                    }
                    this.props.addUser(newUser, "users")
                    .then(() => DataManager.getAll("users")
                    .then((users) => {
                    let loggedIn = users.find(u => u.inputEmail === email && u.inputUsername === username && u.inputPassword === password)
                    if (loggedIn){
                    sessionStorage.setItem(
                        "credentials",
                        JSON.stringify({
                            password: this.state.password,
                            username: this.state.username,
                            id: loggedIn.id
                        })
                    )
                }
                this.props.history.push("/days")
            })
        )
            }

            })
        }
        render() {
            return (
                <form onSubmit={this.constructNewUser}>
                    <h1>Start the Journey</h1>
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
                    <button type="submit">
                        Register
                    </button>
                </form>
            )
        }
    }
