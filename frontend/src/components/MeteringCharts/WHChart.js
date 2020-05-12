import React from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'

const WHChart = ({ readings }) => {
  if (!readings || readings.length === 0) {
    return (
      <h4>No Readings to display chart</h4>
    )
  }

  const whReadings = readings.map((reading) => {
    return reading.changeInWH
  })
  const labels = readings.map((reading) => {
    return reading.UTCDateTime
  })
  const options = {
    title: {
      display: true,
      text: 'Change in WH over time',
      fontSize: 20
    },
    legend: {
      display: true,
      position: 'right'
    }
  }

  const state = {
    labels: labels,
    datasets: [
      {
        label: 'Change In WH',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: whReadings
      }
    ]
  }

  return (
    <div>
      <Line data={state} options={ options }/>
    </div>
  )
}

WHChart.propTypes = {
  readings: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default WHChart
