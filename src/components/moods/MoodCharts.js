import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';

export default class DayChart extends Component {

    chartData = {}

    componentDidMount = () => {
        this.props.days.map(day =>
            this.chartData = {
                labels: ["Rad", "Tired", "Sad", "Stressed"],
                datasets: [
                    {
                        label: "Moods",
                        data: day.rating,
                        backgroundColor: [
                            "hsl(227, 100%, 35%)",
                            "hsl(0, 100%, 70%)",
                            "hsl(10, 100%, 75%)",
                            "hsl(48, 100%, 65%)"
                        ]
                    }
                ]
            }
        )
    }


    render() {
        console.log(this.chartData)
        return (
            <div className="chart">
                <Doughnut
                    data={this.chartData}
                    width={180}
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