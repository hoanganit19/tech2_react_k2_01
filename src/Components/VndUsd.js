import React from 'react'

export default function ({onDataUsd}) {
    const changeValue = (e) => {
        let usd = e.target.value / 23500;
        usd = usd.toFixed(2);
        onDataUsd(usd, '$');
      }  

  return (
    <div>
        <label>VND:</label>
        <input type={'number'} onChange={changeValue} placeholder={'VND...'} />
    </div>
  )
}
