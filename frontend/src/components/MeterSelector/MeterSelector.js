import React from 'react'
import PropTypes from 'prop-types'

class MeterSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      enterMeterSearchValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  getMeters (meters) {
    return (
      <ul id='meters'>
        {
          meters.map((meter) => {
            return (
              <li key={meter.serial} onClick={() => { this.props.handleMeterClick(meter.serial) }}>{meter.serial}</li>
            )
          })
        }
      </ul>
    )
  }

  handleChange (event) {
    const searchValue = event.target.value ? event.target.value.toUpperCase() : ''
    this.setState({
      enterMeterSearchValue: searchValue
    })
  }

  render () {
    const filteredMetersList = this.props.meters.filter((meter) => {
      return meter.serial.indexOf(this.state.enterMeterSearchValue) >= 0
    })
    return (
      <div>
        <h2 className='title'>Search and Select A Meter</h2>
        <input className="meterSearchInput" id='filterMetersInput'
          placeholder="Search for a meter by meter ID"
          type="text"
          value={this.state.enterMeterSearchValue}
          onChange={this.handleChange} />
        {
          filteredMetersList && filteredMetersList.length ? this.getMeters(filteredMetersList) : (
            <h4 id='noMetersFoundMessage'>
              No Meters Found
            </h4>
          )
        }
      </div>
    )
  }
}

MeterSelector.propTypes = {
  handleMeterClick: PropTypes.func.isRequired,
  meters: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MeterSelector
