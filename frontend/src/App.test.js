import React from 'react'
import App from './App'
import axios from 'axios'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

jest.mock('axios', () => {
  return {
    get: jest.fn()
  }
})

/*
  Mock meters data for testing
*/
const meters = [
  {
    latestVARHReading: '6266426',
    firstReadingTimestamp: 1584829800,
    initialVARHReading: '6232597',
    latestWHReading: '27338584',
    firstReadingUTCDateTime: '21/03/2020 22:30',
    initialWHReading: '27180198',
    serial: 'METER000001',
    latestReadingTimestamp: 1587362400,
    latestReadingUTCDateTime: '20/04/2020 06:00'
  },
  {
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
]

describe('Tests For App component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const apiUrl = process.env.REACT_APP_METERING_API_URL

  it('It fetches all the meters from meter api and shows the meter selector if meters list loaded successfully', async () => {
    const mockResponse = {
      data: meters
    }
    axios.get.mockResolvedValueOnce(mockResponse)
    const wrapper = mount(<App urlForAllMeters={apiUrl}/>)
    expect(wrapper.exists).toBeTruthy()
    expect(wrapper.find('#loadingMessage').text()).toBe('Loading meters...')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    wrapper.update()
    expect(wrapper.find('MeterSelector').exists).toBeTruthy()
  })

  it('If it fails to load the list of meters, it shows a error message and a button to retry loading the data', async () => {
    const mockError = new Error('Some error')
    axios.get.mockRejectedValueOnce(mockError)
    const wrapper = mount(<App urlForAllMeters={apiUrl}/>)
    expect(wrapper.exists).toBeTruthy()
    expect(wrapper.find('#loadingMessage').text()).toBe('Loading meters...')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    wrapper.update()
    expect(wrapper.find('#errorMessage').text()).toBe('Some error occurred while fetching the list of meters. Please try again.')
    expect(wrapper.find('#reloadMetersBtn').exists).toBeTruthy()
  })

  it('If a li is clicked in MeterSelector update state to contain the serial of newly selected meter', async () => {
    const mockResponse = {
      data: meters
    }
    axios.get.mockResolvedValueOnce(mockResponse)
    const wrapper = mount(<App urlForAllMeters={apiUrl}/>)
    expect(wrapper.exists).toBeTruthy()
    const searchInputValue = 'METER000001'
    expect(wrapper.find('#loadingMessage').text()).toBe('Loading meters...')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    wrapper.update()
    const meterselector = wrapper.find('MeterSelector')
    const meterli = meterselector.find('#meters').find('li').filterWhere((node) => node.text() === searchInputValue)
    meterli.simulate('click')
    wrapper.update()
    expect(wrapper.state().selectedMeterSerialNo).toBe(searchInputValue)
  })
})
