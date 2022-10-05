import React from "react";

const Button = React.forwardRef((props, ref) => {
  return <button ref={ref}>Tech2 Solutions</button>;
});

export default Button;
