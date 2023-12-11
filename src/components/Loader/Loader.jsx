import React from 'react'
import { FidgetSpinner } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
      <FidgetSpinner
  visible={true}
  height="180"
  width="180"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  ballColors={['#ff0000', '#00ff00', '#0000ff']}
  backgroundColor="#F4442E"
/>
    </div>
  )
}
