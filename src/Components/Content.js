import React, {Component} from 'react'

export class Content extends Component {
  
  constructor(){
    super();

    this.h2Style = {
        color: 'red',
        fontStyle: 'italic'
    }
  }  

  showMessage(e){
    e.target.style.color = 'red';

    //alert('Tech2');
  }

  showEventContent(e){
    //console.log(e.target);
  }

  render() {

    // const showMessage = () => {
    //     alert('Tech2');
    // }

    return (
      <div className='container'>
        <h1 className='text-center' onClick={this.showEventContent} style={this.h2Style}>Content</h1>
        <button type='button' onClick={this.showMessage}>Click me</button>
      </div>
    )
  }
}

export default Content