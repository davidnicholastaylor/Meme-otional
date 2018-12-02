import React, { Component } from "react"
import DataManager from "./data/DataManager"
import { Button, Modal } from 'semantic-ui-react'

export default class Login extends Component {

    // Set initial state
    state = {
        username: "",
        email: "",
        password: "",
        open: false
    }

    show = size => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

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
        const { open, size } = this.state

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
                                <Button onClick={this.close} negative>Cancel</Button>
                                <Button onClick={this.constructNewUser} positive icon='checkmark' labelPosition='right' content='Register' />
                            </Modal.Actions>
                        </Modal>
                    </form>
                }
            </React.Fragment>
        )
    }
}