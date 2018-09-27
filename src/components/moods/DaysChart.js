
import React, { Component } from 'react'
import { Doughnut, Radar } from 'react-chartjs-2';
import "./moodChart.css"

export default class DaysChart extends Component {

    chartData = {
        labels: ["Rad", "Tired", "Sad", "Stressed"],
        datasets: [
            {
                label: "Moods",
                data: this.props.data,
                backgroundColor: [
                    "hsl(250, 100%, 45%)",
                    "hsl(150, 100%, 55%)",
                    "hsl(0, 100%, 75%)",
                    "hsl(48, 100%, 65%)"
                ],
                borderColor: "grey",
                fontColor: "grey",
                fontSize: 20
            }
        ]
    }

    render() {
        return (
            <div className="chart">
                <Doughnut
                    data={{
                        labels: ["Rad", "Tired", "Sad", "Stressed"],
                        datasets: [
                            {
                                data: this.props.data,
                                backgroundColor: [
                                    "hsl(250, 100%, 45%)",
                                    "hsl(150, 100%, 55%)",
                                    "hsl(0, 100%, 75%)",
                                    "hsl(48, 100%, 65%)"
                                ],
                                borderColor: "grey",
                                hoverBackgroundColor: "black",
                                fontColor: "grey",
                                fontSize: 25
                            }
                        ]
                    }}
                    width={125}
                    height={100}
                    options={{
                        title: {
                            display: true,
                            text: "Moodiness",
                            fontColor: "rgb(90, 190, 150)",
                            fontSize: 30
                        },
                        legend: {
                            labels: {
                                fontColor: "black"
                            },
                            display: true,
                            position: "left"
                        }
                    }}
                />
            </div>
        )
    }
}