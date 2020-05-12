import React from 'react'
import axios from 'axios'
import './App.css'
import MeterSelector from './components/MeterSelector/MeterSelector'
import SelectedMeterDisplay from './components/SelectedMeterDisplay/SelectedMeterDisplay'
import MeteringCharts from './components/MeteringCharts/MeteringCharts'
import PropTypes from 'prop-types'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isFetchingMeters: true,
      meters: [],
      errorWhileFetchingMeters: false,
      selectedMeterSerialNo: null
    }

    this.handleMeterClick = this.handleMeterClick.bind(this)
  }

  fetchMeters () {
    this.setState({
      isFetchingMeters: true,
      meters: [],
      errorWhileFetchingMeters: false
    })
    axios.get(`${this.props.apiUrl}meters/`).then((res) => {
      this.setState({
        isFetchingMeters: false,
        meters: res.data,
        errorWhileFetchingMeters: false
      })
    }).catch((err) => {
      console.error(err)

      this.setState({
        errorWhileFetchingMeters: true,
        isFetchingMeters: false
      })
    })
  }

  handleMeterClick (meterSerialNo) {
    this.setState({
      selectedMeterSerialNo: meterSerialNo
    })
  }

  render () {
    const selectedMeter = this.state.meters.filter((meter) => {
      return meter.serial === this.state.selectedMeterSerialNo
    })[0]

    return (
      <div className="App">

        {
          this.state.isFetchingMeters && (
            <h2 id='loadingMessage'>Loading meters...</h2>
          )
        }

        {
          this.state.errorWhileFetchingMeters && (
            <div>
              <h3 id='errorMessage'>Some error occurred while fetching the list of meters. Please try again.</h3>
              <button id='reloadMetersBtn'>Try again</button>
            </div>
          )
        }

        {
          this.state.meters && !this.state.isFetchingMeters && (
            <MeterSelector meters={this.state.meters} handleMeterClick={this.handleMeterClick}></MeterSelector>
          )
        }

        { selectedMeter ? (
          <div>
            <SelectedMeterDisplay selectedMeter={selectedMeter}></SelectedMeterDisplay>
            <MeteringCharts apiUrl={this.props.apiUrl} selectedMeter={this.state.selectedMeterSerialNo}></MeteringCharts>
          </div>
        ) : ''}
      </div>
    )
  }

  componentDidMount () {
    this.fetchMeters()
  }
}

App.propTypes = {
  apiUrl: PropTypes.string.isRequired
}

export default App
