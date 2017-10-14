import React from 'react';


const Input = (props) => {
  const cls = 'input '.concat(props.cls, ' ', props.color)
  return <input className={cls} 
                onChange={props.changeEvent}
                value={props.value}
                type={props.type}
                style={props.style}
                inputMode={props.inputMode}
                placeholder={props.placeholder}
                pattern={props.pattern}/>
}

export default Input;
