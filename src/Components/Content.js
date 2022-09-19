import React, { Component } from "react";

export class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: props.author
    }

    this.h2Style = {
      color: "red",
      fontStyle: "italic",
    };
  }

  showMessage(e) {
    e.target.style.color = "red";

    //alert('Tech2');
  }

  showEventContent(e) {
    //console.log(e.target);
  }

  changeAuthor = () => {
    //console.log(this.props.author);
    //this.props.author = 'Tech2';
    this.setState(
      {author: 'Tech2'}
    );
  }

  render() {
    console.log('re-render');
    const { title, detail, author, time } = this.props;

    return (
      <div className="container">
        <h1
          className="text-center"
          onClick={this.showEventContent}
          style={this.h2Style}
        >
          {title}
        </h1>
        <h3>Author: {this.state.author}</h3>
        {
          time ? <h4>Posted At: {time}</h4>: null
        }

        <div>{detail}</div>
        <button type="button" onClick={this.changeAuthor}>
          Click me
        </button>
      </div>
    );
  }
}

export default Content;
