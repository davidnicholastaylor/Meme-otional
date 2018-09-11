import React, { Component } from "react"
import "./day.css"

export default class DayForm extends Component {
    // Set initial state
    state = {
        rating: "",
        description: "",
        date: null
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
    constructNewDay = evt => {
        evt.preventDefault()
            const day = {
                rating: this.state.rating,
                description: this.state.description,
                date: this.state.date,
                userId: JSON.parse(sessionStorage.getItem("credentials")).id

            }

            // Create the day and redirect user to day list
            this.props.addDay(day, "days").then(() => this.props.history.push("/days"))
    }

    render() {
        return (
            <React.Fragment>
                <form className="dayForm">
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input type="text" required
                               onChange={this.handleFieldChange}
                               id="Rating"
                               placeholder="Rating" />
                        <label htmlFor="description">Description</label>
                        <input type="text" required
                               onChange={this.handleFieldChange}
                               id="Description"
                               placeholder="Description" />
                        <label htmlFor="date">Date</label>
                        <input type="date" required
                               onChange={this.handleFieldChange}
                               id="date"
                               placeholder="Date" />
                        <button onClick={this.constructNewDay}>Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}