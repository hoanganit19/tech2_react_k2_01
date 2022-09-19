import React from 'react'

export default function Tech2({onData}) {
    
    console.log(onData);

  return (
    <div>
        <button type='button' onClick={() => {
            onData('Tech2 Solutions');
        }}>Click me</button>
    </div>
  )
}
