import React, { Component } from "react"
import "./day.css"

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
                <form className="dayForm">
                    <div className="form-group">
                        <input type="text" required={true}
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="rating"
                            placeholder="Rating"
                            defaultValue={this.state.rating} />
                        <input type="text" required={true}
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="description"
                            placeholder="Description"
                            defaultValue={this.state.description} />
                    </div>
                    <button type="submit" onClick={this.editDay} >Submit</button>
                </form>
            </React.Fragment>
        )
    }
}