import React from 'react';


const Checkbox = (props) => {
  const label= props.label;
  return (
          <label className='checkbox'>
            <p style={props.style}>{label}</p>
            <input type='checkbox'
                   onClick={props.clickEvent}
                   checked={props.checked}
                   defaultChecked={props.defaultChecked}
            />
          </label>
        )
}

export default Checkbox;
