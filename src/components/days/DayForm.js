import React, { Component } from "react"
import DayDate from "./DayDate"
import "./day.css"

export default class DayForm extends Component {
    // Set initial state

    
    state = {
        rating: "",
        description: ""
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
            const days = {
                rating: this.state.rating,
                description: this.state.description,
                date: DayDate.getDate(),
                userId: JSON.parse(sessionStorage.getItem("credentials")).id
            }

            // Create the day and redirect user to day list
            this.props.addDay(days, "days").then(() => this.props.history.push("/days"))
    }

    render() {
        
        return (
            <React.Fragment>
                <form className="dayForm">
                    <div className="form-group">
                        <input type="text" required
                               onChange={this.handleFieldChange}
                               id="rating"
                               placeholder="Rating" />
                        <input type="text" required
                               onChange={this.handleFieldChange}
                               id="description"
                               placeholder="Description" />
                        <button onClick={this.constructNewDay}>Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}