import React, { Component } from "react";

export class Counter extends Component {

  constructor(props){
    super(props);

    const {start} = props;

    this.state = {
        count: start,
        title: 'Init'
    }
  }  

  handleUp = () => {
    //this.setState(prevState => ({count: prevState.count+this.props.step}));
    this.setState({
      count: this.state.count+1,
      //title: 'Tăng'
    });
  }

  handleDown = () => {

    if (this.state.count>this.props.step){
        this.setState({
            count: this.state.count-this.props.step,
         //   title: 'Giảm'
        })
    }
    
  }

  render() {

    const {count, title} = this.state;

    const css = {color: count>=10?'red':'initial'};

    return (
      <div>
        <h1 style={css}>Count: {count}</h1>
        <h2>{title}</h2>
        <button onClick={this.handleDown}>-</button>
        <button onClick={this.handleUp}>+</button>
      </div>
    );
  }
}

export default Counter;
