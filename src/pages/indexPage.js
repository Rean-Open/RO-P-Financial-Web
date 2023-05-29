import React from 'react'
import Dashboard from './dashboard/dashboard'
import Income from './income/income'

const IndexPage = () => {
  return (
    <div className='col-md-12 container'>
      <Dashboard />
      <Income />
    </div>
  )
}

export default IndexPage