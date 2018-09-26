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
                let loginUser = users.find(u => u.activeEmail === email && u.activeUser === username && u.activePassword === password)
                if (loginUser) {
                    alert("This user or email is already taken")
                } else {
                    let newUser = {
                        activeUser: this.state.username,
                        activeEmail: this.state.email,
                        activePassword: this.state.password,
                    }
                    this.props.addUser(newUser, "users")
                        .then(() => DataManager.getAll("users")
                            .then((users) => {
                                let loggedIn = users.find(u => u.activeEmail === email && u.activeUser === username && u.activePassword === password)
                                if (loggedIn) {
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
        let cancel = () => this.props.history.push("/login")
        return (
            <form>
                <h1>Start the Journey</h1>
                <label htmlFor="activeUser">
                    Username
                </label>
                <input onChange={this.handleFieldChange} type="username"
                    id="username"
                    placeholder="Username"
                    required="" autoFocus="" />
                <label htmlFor="activeEmail">
                    Email address
                </label>
                <input onChange={this.handleFieldChange} type="email"
                    id="email"
                    placeholder="Email address"
                    required="" autoFocus="" />
                <label htmlFor="activePassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Password"
                    required="" autoFocus="" />
                <button onClick={this.constructNewUser}>
                    Register
                    </button>
                <button onClick={cancel.bind()}>
                Cancel
                </button>
            </form>
        )
    }
}
