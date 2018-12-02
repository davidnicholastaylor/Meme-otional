import React, { Component } from "react"
import DataManager from "./data/DataManager"
import { Button, Modal, Divider, Grid, Input } from 'semantic-ui-react'

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
                <Grid centered columns={2}>
                    <form>
                        <br/>
                        <br/>
                        <br/>
                        <Grid.Row>
                        <h1>Get in your feelings</h1>
                        </Grid.Row>
                        <Divider hidden/>
                        <Grid.Row>
                        <Input focus onChange={this.handleFieldChange} type="username"
                            id="username"
                            placeholder="Username"
                            required="" autoFocus="" />
                            </Grid.Row>
                        <Divider hidden/>
                        <Grid.Row>
                        <Input focus onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" autoFocus="" />
                            <Divider hidden/>
                            </Grid.Row>
                        <Button onClick={this.handleLogin}>
                            Sign In
                </Button>

                        <Button onClick={this.show('mini')}>Register</Button>

                        <Modal size={size} open={open}>
                            <Modal.Header>Let the moodiness begin</Modal.Header>
                            <Modal.Content>
                                <label htmlFor="activeUser">
                                    What do you want to be called?
                </label>
                                <Input focus onChange={this.handleFieldChange} type="username"
                                    id="username"
                                    placeholder="Username"
                                    required="" autoFocus="" />
                                <Divider hidden/>
                                <label htmlFor="activeEmail">
                                    How can we reach you?
                </label>
                                <Input focus onChange={this.handleFieldChange} type="email"
                                    id="email"
                                    placeholder="Email address"
                                    required="" autoFocus="" />

                                <Divider hidden/>
                                <label htmlFor="activePassword">
                                    Super secret password
                </label>
                                <Input focus onChange={this.handleFieldChange} type="password"
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
                    </Grid>
                }
            </React.Fragment>
        )
    }
}