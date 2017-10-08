import React from 'react';


const Field = (props) => {
  const label = props.label;
  return (
          <div className="field">
          {label && 
            <label className="label"><p style={props.style}>{label}</p></label>}
          {props.children}
          </div>
        )
}

export default Field
