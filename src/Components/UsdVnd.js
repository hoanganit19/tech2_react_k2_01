import React from 'react'

export default function UsdVnd({onDataVnd}) {

  const changeValue = (e) => {
    const vnd = e.target.value * 23500;
    onDataVnd(vnd, 'vnd');
  }  

  return (
    <div>
        <label>USD:</label>
        <input type={'number'} onChange={changeValue} placeholder={'USD...'} />
    </div>
  )
}
