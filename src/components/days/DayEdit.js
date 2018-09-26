import React, { Component } from "react"
import "./day.css"
import party from "../images/party.gif"
import sloth from "../images/sloth.gif"
import sad from "../images/sad.gif"
import stress from "../images/stress.gif"
import { TextArea, Button } from 'semantic-ui-react'
export default class DayEdit extends Component {
    // Set initial state
    state = {
        moodId: "",
        description: "",
        date: null
    }

    componentDidMount() {
        const moodId = this.props.days.find(moodId => moodId.id === parseInt(this.props.match.params.dayId, 0))
        this.setState(moodId);
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
            moodId: this.props.moods.find(m => m.rating === this.state.moodId).id,
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
                <form>
                    <div className="container">
                    <label>
                        <h5 id="moodLabel">Rad</h5>
                    <input type="radio"
                        onChange={this.handleFieldChange}
                        id="moodId"
                        name="mood"
                        value="/static/media/party.cd534470.gif"
                        checked={this.state.moodId === "/static/media/party.cd534470.gif"}
                    />
                    <img src={party} alt="Rad" className="rad" />
                    </label>
                <label>
                    <h5 id="moodLabel">Tired</h5>
                    <input type="radio"
                        onChange={this.handleFieldChange}
                        id="moodId"
                        name="mood"
                        value="/static/media/sloth.38784354.gif"
                        checked={this.state.moodId === "/static/media/sloth.38784354.gif"}
                    />
                    <img src={sloth} alt="Tired" className="tired" />
                </label>
                <label>
                    <h5 id="moodLabel">Sad</h5>
                    <input type="radio"
                        onChange={this.handleFieldChange}
                        id="moodId"
                        name="mood"
                        value="/static/media/sad.e49477f7.gif"
                        checked={this.state.moodId === "/static/media/sad.e49477f7.gif"}
                    />
                    <img src={sad} alt="Sad" className="sad" />
                </label>
                <label>
                    <h5 id="moodLabel">Stressed</h5>
                    <input type="radio"
                        onChange={this.handleFieldChange}
                        id="moodId"
                        name="mood"
                        value="/static/media/stress.078d84f6.gif"
                        checked={this.state.moodId === "/static/media/stress.078d84f6.gif"}
                    />
                    <img src={stress} alt="Stressed" className="stressed" />
                </label>
                <TextArea autoHeight placeholder={this.state.description} style={{ minHeight: 100 }} required
                    onChange={this.handleFieldChange}
                    id="description"
                    className="descriptionForm" />
                <Button compact size="huge" floated="right" icon="save outline" type="submit" onClick={this.editDay} />
                    </div>
                </form >
            </React.Fragment >
        )
    }
}