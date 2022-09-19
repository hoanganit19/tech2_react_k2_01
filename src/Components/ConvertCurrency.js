import React from 'react'
import UsdVnd from './UsdVnd'
import VndUsd from './VndUsd'

export default function ConvertCurrency() {

  const handleDataVnd = (number, currency) => {
      console.log(number+currency);  
  }

  const handleDataUsd = (number, currency) => {
    console.log(number+currency);
  }

  return (
    <div style={{margin: '3%'}}>
        <UsdVnd onDataVnd={handleDataVnd}/>
        <VndUsd onDataUsd={handleDataUsd}/>
    </div>
  )
}
