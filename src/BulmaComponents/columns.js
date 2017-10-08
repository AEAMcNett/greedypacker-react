import React from 'react';

const Columns = (props) => {
  return (
          <div className={ props.class ? 'columns '.concat(props.class) : 'columns'}
               style={props.style} >
          {props.children}
          </div>
        )
}

export default Columns
