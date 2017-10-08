import React from 'react';


const Column = (props) => {
  return (
          <div className={"column ".concat(props.class)}>
          {props.children}
          </div>
        )
}

export default Column;
