import React from 'react';
import axios from 'axios';
import './App.css';
import MeterSelector from './components/MeterSelector';

class App extends React.Component {
  state = {
    isFetchingMeters: false,
    meters: [],
    error: false,
    selectedMeterSerialNo: null
  }

  constructor(props) {
    super(props)
    this.handleMeterClick = this.handleMeterClick.bind(this)
  }
  
  fetchMeters() {
    this.setState({
      isFetchingMeters: true
    })
    axios.get('https://metering-assignment.uc.r.appspot.com/api/v1/meters/').then((res) => {
      this.setState({
        isFetchingMeters: false,
        meters: res.data
      })
    }).catch((err) => {
      this.setState({
        error: true,
        isFetchingMeters: false
      })
    })
  }

  handleMeterClick(meterSerialNo) {
    this.setState({
      selectedMeterSerialNo: meterSerialNo
    })
  }

  render() {
    const selectedMeter = this.state.meters.filter((meter) => {
      return meter.serial === this.state.selectedMeterSerialNo;
    })[0]

    return (
      <div className="App">
        <MeterSelector meters={this.state.meters} handleMeterClick={this.handleMeterClick}></MeterSelector>
        
        { selectedMeter ? (
          <div>
            <label>Selected Meter:</label>
            <h2>Serial No: {selectedMeter.serial}</h2>
          </div>
        ) : ""}
      </div>
    );
  }

  componentDidMount() {
    this.fetchMeters();
  }
}

export default App;
