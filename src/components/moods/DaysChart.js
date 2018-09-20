
import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';
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
                ]
            }
        ]
    }

    render() {
        return (
            <div className="chart">
                <Doughnut
                    data={this.chartData}
                    width={125}
                    height={100}
                    options={{
                        legend: {
                            labels: {
                                fontColor: "black"
                            }
                        }
                    }}
                />
            </div>
        )
    }
}