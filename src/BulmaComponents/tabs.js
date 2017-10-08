import React from 'react';

const Tabs = (props) => {
  return (
          <div className={ props.alignment ? 'tabs '.concat(props.alignment) : 'tabs'}>
            <ul>
              {props.children}
            </ul>
          </div>
        )
}

export default Tabs
