import React from 'react'

class MeterSelector extends React.Component {
    state = {
        enterMeterSearchValue: ""
    }
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }
    getMeters(meters) {
        return (
            <ul>
                {
                    meters.map((meter) => {
                        return (
                            <li key={meter.serial} onClick={() => { this.props.handleMeterClick(meter.serial) }}>{meter.serial}</li>
                        )
                    })
                }
            </ul>
        );
    }

    handleChange(event) {
        const searchValue = event.target.value;
        this.setState({
            enterMeterSearchValue: searchValue
        })
    }
    render() {
        const filteredMetersList = this.props.meters.filter((meter) => {
            return meter.serial.indexOf(this.state.enterMeterSearchValue) >= 0;
        })
        return (
            <div>
                <label>Search and Select A Meter</label>
                <input  className="meterSearchInput" 
                        placeholder="Search for a meter by meter ID" 
                        type="text" 
                        value={this.state.enterMeterSearchValue} 
                        onChange={this.handleChange}/>
                {this.getMeters(filteredMetersList)}
            </div>
        )
    }
}

export default MeterSelector