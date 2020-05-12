import React from 'react'
import MeteringCharts from './MeteringCharts'
import axios from 'axios'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'

jest.mock('axios', () => {
  return {
    get: jest.fn()
  }
})

const readings = {
  meterId: 'METER000001',
  period: 'last_month',
  startTimestamp: 1586713874,
  endTimestamp: 1589305874,
  readings: [
    {
      changeInWH: 74,
      UTCDateTime: '12/04/2020 18:00',
      changeInVARH: 14,
      timestamp: 1586714400,
      WH: 27306630,
      VARH: 6259749
    },
    {
      WH: 27306705,
      VARH: 6259763,
      changeInWH: 75,
      UTCDateTime: '12/04/2020 18:30',
      changeInVARH: 14,
      timestamp: 1586716200
    }
  ]
}

describe('MeteringCharts', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const meterSerial = 'METER000001'
  const apiUrl = process.env.REACT_APP_METERING_API_URL

  it('Should load the readings of the selected meter', async () => {
    const mockResponse = {
      data: readings
    }

    axios.get.mockResolvedValueOnce(mockResponse)
    const wrapper = shallow(<MeteringCharts apiUrl={apiUrl} selectedMeter={meterSerial}/>)
    expect(wrapper.exists).toBeTruthy()
    expect(wrapper.find('#loadingReadingsMsg').text()).toBe('Loading Meter Readings...')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    wrapper.update()
    expect(wrapper.find('#loadingReadingsMsg').length).toBe(0)
    expect(wrapper.state().meterReadingData).not.toBeUndefined()
  })

  it('It should display both VARH and WH chart', async () => {
    const mockResponse = {
      data: readings
    }

    axios.get.mockResolvedValueOnce(mockResponse)
    const wrapper = shallow(<MeteringCharts apiUrl={apiUrl} selectedMeter={meterSerial}/>)
    expect(wrapper.exists).toBeTruthy()
    expect(wrapper.find('#loadingReadingsMsg').text()).toBe('Loading Meter Readings...')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    wrapper.update()
    expect(wrapper.find('VARHChart').length).toBe(1)
    expect(wrapper.find('WHChart').length).toBe(1)
  })
})
