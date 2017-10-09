import React from 'react';

  
const Select = (props) => {
  return (
          <div className="select is-small">
            <select onChange={props.changeEvent}>
              {props.options.map((item, id) => {
                return <option key={id}>{item}</option>
              })}
            </select>
          </div>
        )
}


export default Select;
