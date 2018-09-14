import React, { Component } from "react"
import "./day.css"
import party from "../images/party.gif"
import sloth from "../images/sloth.gif"
import sad from "../images/sad.gif"
import love from "../images/love.gif"
import stress from "../images/stress.gif"
export default class DayEdit extends Component {
    // Set initial state
    state = {
        rating: "",
        description: "",
        date: null
    }

    componentDidMount() {
        const rating = this.props.days.find(rating => rating.id === parseInt(this.props.match.params.dayId, 0))
        this.setState(rating);
        const description = this.props.days.find(description => description.id === parseInt(this.props.match.params.dayId, 0))
        this.setState(description);
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating day object, and
        invoking the function reference passed from parent component
     */
    editDay = evt => {
        evt.preventDefault()
        const day = {
            rating: this.state.rating,
            description: this.state.description,
            date: this.props.days.date,
            userId: JSON.parse(sessionStorage.getItem("credentials")).id

        }
        const dayEditId = parseInt(this.props.match.params.dayId, 0)

        // Create the day and redirect user to day display
        this.props.editDay(day, dayEditId, "days").then(() => this.props.history.push("/days"))
    }

    render() {
        return (
            <React.Fragment>
                <form className="container">
                    <label>
                        <input type="radio"
                            onChange={this.handleFieldChange}
                            id="rating"
                            name="mood"
                            value="/static/media/party.cd534470.gif"
                            checked={this.state.rating === "/static/media/party.cd534470.gif"}
                        />
                        <img src={party} alt="Rad" className="rad" />
                    </label>
                    <label>
                        <input type="radio"
                            onChange={this.handleFieldChange}
                            id="rating"
                            name="mood"
                            value="/static/media/sloth.38784354.gif"
                            checked={this.state.rating === "/static/media/sloth.38784354.gif"}
                        />
                        <img src={sloth} alt="Tired" className="tired" />
                    </label>
                    <label>
                        <input type="radio"
                            onChange={this.handleFieldChange}
                            id="rating"
                            name="mood"
                            value="/static/media/sad.e49477f7.gif"
                            checked={this.state.rating === "/static/media/sad.e49477f7.gif"}
                        />
                        <img src={sad} alt="Sad" className="sad"></img>
                    </label>
                    <label>
                        <input type="radio"
                            onChange={this.handleFieldChange}
                            id="rating"
                            name="mood"
                            value="/static/media/love.0f3c8c74.gif"
                            checked={this.state.rating === "/static/media/love.0f3c8c74.gif"}
                        />
                        <img src={love} alt="Love" className="love"></img>
                    </label>
                    <label>
                        <input type="radio"
                            onChange={this.handleFieldChange}
                            id="rating"
                            name="mood"
                            value="/static/media/stress.078d84f6.gif"
                            checked={this.state.rating === "/static/media/stress.078d84f6.gif"}
                        />
                        <img src={stress} alt="Stress" className="stress"></img>
                    </label>
                    <input type="textarea" required
                        onChange={this.handleFieldChange}
                        id="description"
                        className="description"
                        placeholder="Why tho?" />
                    <button type="submit" onClick={this.editDay} >Submit</button>
                </form>
            </React.Fragment >
        )
    }
}