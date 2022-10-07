import React, { Component } from 'react'
import GetContext from './GetContext'

export class ComB extends Component {
  constructor(props){
    super(props)
  }  
  render() {
    const {title, author} = this.props;
    return (
        <>
            <div>ComB</div>
            <p>Title: {title}</p>
            <p>Author: {author}</p>
        </>
    )
  }
}

export default GetContext(ComB)