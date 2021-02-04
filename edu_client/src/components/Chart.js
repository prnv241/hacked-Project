import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

const data1 = {
  labels: [
    "Quiz 1",
    "Quiz 2",
    "Quiz 3",
    "Quiz 4",
    "Quiz 5",
    "Quiz 6",
    "Quiz 7",
  ],
  datasets: [
    {
      label: "Quiz Score",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const data2 = {
  labels: [
    "Assignment 1",
    "Assignment 2",
    "Assignment 3",
    "Assignment 4",
    "Assignment 5",
    "Assignment 6",
    "Assignment 7",
  ],
  datasets: [
    {
      label: "Assignment Score",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(232, 71, 115, 0.9)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(232, 71, 115, 0.9)",
      pointBackgroundColor: "#d81b60",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(232, 71, 115, 0.9)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [34, 44, 23, 47, 33, 40, 40],
    },
  ],
};

export default class Graph extends Component {
  render() {
    return (
      <div className="set">
        <div className="item">
          <Line ref="chart" data={data1} />
        </div>
        <div className="item">
          <Line ref="chart" data={data2} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data;
    console.log(datasets[0].data);
  }
}
