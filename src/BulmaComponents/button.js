import React from 'react';

const Button = (props) => {
 return <button className={ props.cls ? "button ".concat(props.cls) : "button"}
           style={props.style}
           onClick={props.clickEvent}>{props.text}</button>;
}

export default Button;
