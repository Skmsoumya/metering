import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const apiUrl = process.env.REACT_APP_METERING_API_URL

ReactDOM.render(
  <React.StrictMode>
    <App apiUrl={apiUrl}/>
  </React.StrictMode>,
  document.getElementById('root')
)
