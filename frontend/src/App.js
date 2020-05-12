import React from 'react'
import axios from 'axios'
import './App.css'
import MeterSelector from './components/MeterSelector'
import PropTypes from 'prop-types'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isFetchingMeters: false,
      meters: [],
      error: false,
      errorMessage: '',
      selectedMeterSerialNo: null
    }

    this.handleMeterClick = this.handleMeterClick.bind(this)
  }

  fetchMeters () {
    this.setState({
      isFetchingMeters: true
    })

    axios.get().then((res) => {
      this.setState({
        isFetchingMeters: false,
        meters: res.data
      })
    }).catch((err) => {
      console.error(err)

      this.setState({
        errorMessage: 'Some error occurred while loading the list of meters. Please try again.',
        error: true,
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
        <MeterSelector meters={this.state.meters} handleMeterClick={this.handleMeterClick}></MeterSelector>

        { selectedMeter ? (
          <div>
            <label>Selected Meter:</label>
            <h2>Serial No: {selectedMeter.serial}</h2>
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
  urlForAllMeters: PropTypes.string.isRequired
}

export default App
