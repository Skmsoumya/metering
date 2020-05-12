import React from 'react'
import PropTypes from 'prop-types'
import styles from './SelectedMeterDisplay.module.css'

const SelectedMeterDisplay = (props) => {
  return (
    <div className={styles.SelectedMeterDisplayHolder}>
      <h4>Selected Meter:</h4>
      <h2 id="meterSerialDisplay"><b>Serial:</b> <span>{props.selectedMeter.serial}</span></h2>
      <h4 id="meterPresentWHDisplay"><b>Present WH Reading:</b> <span>{props.selectedMeter.latestWHReading}</span></h4>
      <h4 id="meterPresentVARHDisplay"><b>Present VARH Reading:</b> <span>{props.selectedMeter.latestVARHReading}</span></h4>
      <h4 id="meterLastReadingDisplay"><b>Last Reading Taken On:</b> <span>{`${props.selectedMeter.latestReadingUTCDateTime} UTC`}</span></h4>
    </div>
  )
}

SelectedMeterDisplay.propTypes = {
  selectedMeter: PropTypes.object.isRequired
}

export default SelectedMeterDisplay
