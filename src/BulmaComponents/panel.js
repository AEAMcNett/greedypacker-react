import React from 'react';

const Panel = (props) => {
  return (
          <nav className='panel'>
            {props.children}
          </nav>
        )
}


const PanelHeading = (props) => {
  return ( <p className='panel-heading'>{props.children}</p>)
}


const PanelBlock = (props) => {
  if (props.type === 'anchor') {
    return (
          <a className='panel-block' onClick={props.clickEvent} style={props.style}>
            {props.children}
          </a>
          )
  } else if (props.type === 'label') {
    return (
          <label className='panel-block' style={props.style}>
            {props.children}
          </label>
          )
  } else {
    return (
          <div className='panel-block' style={props.style}>
            {props.children}
          </div>
          )
  }
}
export { Panel, PanelHeading, PanelBlock }

