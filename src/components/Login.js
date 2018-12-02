import React, { Component } from "react"
import DataManager from "./data/DataManager"
import { Button, Modal } from 'semantic-ui-react'

export default class Login extends Component {

    // Set state
    state = {
        username: "",
        email: "",
        password: "",
        open: false
    }

    // Modal functions
    show = size => (e) => {e.preventDefault(); this.setState({ size, open: true })}
    close = (e) => {e.preventDefault(); this.setState({ open: false })}

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Login sumbit function
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

    // Constructor for registering a user
    constructNewUser = evt => {
        evt.preventDefault()
        let registerUsername = this.state.username;
        let registerEmail = this.state.email;
        let registerPassword = this.state.password;
        DataManager.getAll("users")
            .then((users) => {
                let loginUser = users.find(u => u.activeEmail === registerEmail && u.activeUser === registerUsername && u.activePassword === registerPassword)
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
                                let loggedIn = users.find(u => u.activeEmail === registerEmail && u.activeUser === registerUsername && u.activePassword === registerPassword)
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
        const { open, size } = this.state
        let session = sessionStorage.getItem("credentials")
        return (
            <React.Fragment>
                {session === null &&
                    <form>
                        <h1>Get in your feelings</h1>
                        <input onChange={this.handleFieldChange} type="username"
                            id="username"
                            placeholder="Username"
                            required="" autoFocus="" />
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" autoFocus="" />
                        <Button onClick={this.handleLogin}>
                            Sign In
                </Button>

                        <Button onClick={this.show('small')}>Register</Button>

                        <Modal size={size} open={open}>
                            <Modal.Header>Start the Journey</Modal.Header>
                            <Modal.Content>
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
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.constructNewUser} positive icon='checkmark' labelPosition='right' content='Register' />
                                <Button onClick={this.close} negative>Cancel</Button>
                            </Modal.Actions>
                        </Modal>
                    </form>
                }
            </React.Fragment>
        )
    }
}