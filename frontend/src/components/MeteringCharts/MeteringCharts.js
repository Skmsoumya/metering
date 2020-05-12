import React from 'react'
import PropTypes from 'prop-types'
import VARHChart from './VARHChart'
import WHChart from './WHChart'
import axios from 'axios'

class MeteringCharts extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      meterReadingData: null,
      isLoadingReadings: true,
      errorWhileLoadingReadings: false
    }
  }

  componentDidMount () {
    this.fetchData(this.props.selectedMeter)
  }

  componentDidUpdate (prevProps) {
    if (this.props.selectedMeter !== prevProps.selectedMeter) {
      this.fetchData(this.props.selectedMeter)
    }
  }

  fetchData (meterId) {
    this.setState({
      isLoadingReadings: true,
      meterReadingData: null,
      errorWhileLoadingReadings: false
    })

    axios.get(`${this.props.apiUrl}meters/${meterId}/readings/`).then((res) => {
      this.setState({
        isLoadingReadings: false,
        meterReadingData: res.data,
        errorWhileLoadingReadings: false

      })
    }).catch(() => {
      this.setState({
        meterReadingData: null,
        isLoadingReadings: false,
        errorWhileLoadingReadings: true
      })
    })
  }

  render () {
    return (
      <div>
        {
          this.state.isLoadingReadings && <h4 id='loadingReadingsMsg'>Loading Meter Readings...</h4>
        }

        {
          this.state.meterReadingData && (
            <div>
              <VARHChart readings={this.state.meterReadingData.readings}/>
              <WHChart readings={this.state.meterReadingData.readings}/>
            </div>
          )
        }
      </div>
    )
  }
}

MeteringCharts.propTypes = {
  selectedMeter: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired
}

export default MeteringCharts
