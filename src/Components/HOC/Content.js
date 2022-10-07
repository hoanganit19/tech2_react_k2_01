import React, {memo} from 'react'
import PreventRender from './PreventRender';

function Content({count}) {
   console.log('re-render');
  return (
    <h1>Content: {count}</h1>
  )
}

export default memo(Content);