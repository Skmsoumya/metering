import React from 'react'
import MeterSelector from './MeterSelector'
import { shallow } from 'enzyme'

/*
  Mock meters data for testing
*/
const meters = [
  {
    serial: 'METER000001'
  },
  {
    serial: 'METER000002'
  },
  {
    serial: 'METER100001'
  }
]

describe('Tests For MeterSelector Component', () => {
  const handleMeterClickFunction = jest.fn()
  const wrapper = shallow(<MeterSelector meters={meters} handleMeterClick={handleMeterClickFunction}/>)

  it('Has has a title of search and select meters', () => {
    expect(wrapper.find('h2.title').text()).toBe('Search and Select A Meter')
  })

  it('Shows a ul element containing a list of li elements if the list of meters is not empty', () => {
    expect(wrapper.find('#meters').exists).toBeTruthy()
    expect(wrapper.find('#meters').find('li').length).toBe(3)
  })

  it('shows a message "No meters found" list of meters contains no meter', () => {
    const wrapper = shallow(<MeterSelector meters={[]} handleMeterClick={handleMeterClickFunction}/>)
    expect(wrapper.find('#noMetersFoundMessage').text()).toBe('No Meters Found')
    expect(wrapper.find('#meters').find('li').length).toBe(0)
  })

  it('has a search input for filtering the list of meters', () => {
    expect(wrapper.find('#filterMetersInput').exists).toBeTruthy()
  })

  it('filters the list of meters to show only the meter whose id is entered in search field', () => {
    const wrapper = shallow(<MeterSelector meters={meters} handleMeterClick={handleMeterClickFunction}/>)
    const input = wrapper.find('#filterMetersInput')
    const searchInputValue = 'METER000001'

    input.simulate('change', { target: { value: searchInputValue } })
    expect(wrapper.find('#meters').find('li').length).toBe(1)
    expect(wrapper.find('#meters').find('li').text()).toBe(searchInputValue)
  })

  it('shows no meters in the list if the no meter matches the id entered in search input', () => {
    const wrapper = shallow(<MeterSelector meters={meters} handleMeterClick={handleMeterClickFunction}/>)
    const input = wrapper.find('#filterMetersInput')
    const searchInputValue = 'METER000012'

    input.simulate('change', { target: { value: searchInputValue } })
    expect(wrapper.find('#meters').find('li').length).toBe(0)
  })

  it('shows multiple meters if the search input value matches multiple meters', () => {
    const wrapper = shallow(<MeterSelector meters={meters} handleMeterClick={handleMeterClickFunction}/>)
    const input = wrapper.find('#filterMetersInput')
    const searchInputValue = 'METER00000'

    input.simulate('change', { target: { value: searchInputValue } })
    expect(wrapper.find('#meters').find('li').length).toBe(2)
  })

  it('calls the callback function if a meter li is clicked and passes the correct li data', () => {
    const handleMeterClickFunction = jest.fn()
    const wrapper = shallow(<MeterSelector meters={meters} handleMeterClick={handleMeterClickFunction}/>)
    const meterSerial = 'METER000001'
    const liClicker = wrapper.find('#meters').find('li').filterWhere((node) => {
      return node.text() === meterSerial
    })
    liClicker.simulate('click')
    expect(handleMeterClickFunction).toHaveBeenCalled()
    expect(handleMeterClickFunction.mock.calls[0][0]).toBe(meterSerial)
  })

  it('search field is not case sensitive', () => {
    const wrapper = shallow(<MeterSelector meters={meters} handleMeterClick={handleMeterClickFunction}/>)
    const input = wrapper.find('#filterMetersInput')
    const searchInputValue = 'meter000001'

    input.simulate('change', { target: { value: searchInputValue } })
    expect(wrapper.find('#meters').find('li').length).toBe(1)
    expect(wrapper.find('#meters').find('li').text()).toBe(searchInputValue.toUpperCase())
  })
})
