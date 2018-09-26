import React, { Component } from 'react'
import DaysChart from "./DaysChart"
import "./moodChart.css"

export default class MoodCharts extends Component {

    // Create a variable to hold a filter function
    // filter the days to return the equal of days.moodId to differnt ids of moods 
    // do .length of the variable and set it to state
    radDays = () => {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))
        const radArray = this.props.days.filter(day => 
            day.moodId === 1 && activeUser.id === day.userId
        )
        return radArray.length
    }
    tiredDays = () => {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))
        const tiredArray = this.props.days.filter(day => 
            day.moodId === 2 && activeUser.id === day.userId
        )
        return tiredArray.length
    }
    sadDays = () => {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))
        const sadArray = this.props.days.filter(day => 
            day.moodId === 3 && activeUser.id === day.userId
        )
        return sadArray.length
    }
    stressedDays = () => {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))
        const stressedArray = this.props.days.filter(day => 
            day.moodId === 4 && activeUser.id === day.userId
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
            <div className="daysChart">
                <DaysChart  data={this.getData()} />
            </div>
            </React.Fragment>
        )
    }
}