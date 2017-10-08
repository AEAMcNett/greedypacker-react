import React from 'react';


const Input = (props) => {
  return <input className={ props.cls ? 'input '.concat(props.cls) : 'input'} 
                onChange={props.changeEvent}
                value={props.value}
                type={props.type}
                style={props.style}
                inputMode={props.inputMode}
                placeholder={props.placeholder}
                pattern={props.pattern}/>
}

export default Input;
