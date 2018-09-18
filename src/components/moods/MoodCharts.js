import React, { Component } from 'react'
import DaysChart from "./DaysChart"

export default class MoodCharts extends Component {

    // Create a variable to hold a filter function
    // filter the days to return the equal of days.moodId to differnt ids of moods 
    // do .length of the variable and set it to state
    radDays = () => {
        const radArray = this.props.days.filter(day => 
            day.moodId === 1
        )
        return radArray.length
    }
    tiredDays = () => {
        const tiredArray = this.props.days.filter(day => 
            day.moodId === 2
        )
        return tiredArray.length
    }
    sadDays = () => {
        const sadArray = this.props.days.filter(day => 
            day.moodId === 3
        )
        return sadArray.length
    }
    stressedDays = () => {
        const stressedArray = this.props.days.filter(day => 
            day.moodId === 4
        )
        return stressedArray.length
    }

    state = {
        Rad: this.radDays(),
        Tired: this.tiredDays(),
        Sad: this.sadDays(),
        Stressed: this.stressedDays()
    }

    getData = () => {
        let newArray = [];
        newArray.push(this.state.Rad);
        newArray.push(this.state.Tired);
        newArray.push(this.state.Sad);
        newArray.push(this.state.Stressed);
        return newArray;
      };


    render() {
        return (
            <React.Fragment>
                <DaysChart data={this.getData()} />
            </React.Fragment>
        )
    }
}