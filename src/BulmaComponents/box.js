import React from 'react';

const Box = (props) => {
 return (
        <div className="box" style={props.style}>
          {props.children}
        </div>
      )
}

export default Box;

