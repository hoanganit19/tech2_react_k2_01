import React, { Component } from 'react'
import { MyContext } from './ComA';
import GetContext from './GetContext';

export class ComC extends Component {
    constructor(props){
        super(props);
    }
  render() {
    const {title, content} = this.props;
    return (
      <>
        <p>ComC</p>
        <p>Title: {title}</p>
        <p>Content: {content}</p>
      </>
    )
  }
}

export default GetContext(ComC)