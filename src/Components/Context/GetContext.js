import React from "react";
import { MyContext } from "./ComA";

function GetContext(ParentComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <MyContext.Consumer>
          {(data) => <ParentComponent {...data} {...this.props} />}
        </MyContext.Consumer>
      );
    }
  };
}

export default GetContext;
