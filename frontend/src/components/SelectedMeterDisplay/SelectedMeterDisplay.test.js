import React from 'react'
import SelectedMeterDisplay from './SelectedMeterDisplay'
import { shallow } from 'enzyme'

const meter = {
  latestReadingUTCDateTime: '20/04/2020 06:00',
  latestVARHReading: '8962585',
  firstReadingTimestamp: 1584829800,
  initialVARHReading: '8899118',
  latestWHReading: '31802406',
  firstReadingUTCDateTime: '21/03/2020 22:30',
  initialWHReading: '31508111',
  serial: 'METER000002',
  latestReadingTimestamp: 1587362400
}

describe('Tests for SelectedMeterDisplay', () => {
  const wrapper = shallow(<SelectedMeterDisplay selectedMeter={meter}/>)

  it('It should display the serial no of the meter passed as props', () => {
    expect(wrapper.find('#meterSerialDisplay').find('span').text()).toBe(meter.serial)
  })

  it('It should display the current wh reading of the selected meter', () => {
    expect(wrapper.find('#meterPresentWHDisplay').find('span').text()).toBe(meter.latestWHReading)
  })

  it('It should display the current VARH reading of the selected meter', () => {
    expect(wrapper.find('#meterPresentVARHDisplay').find('span').text()).toBe(meter.latestVARHReading)
  })

  it('It should display the Date time in UTC when the last reading was taken', () => {
    expect(wrapper.find('#meterLastReadingDisplay').find('span').text()).toBe(`${meter.latestReadingUTCDateTime} UTC`)
  })
})
