import React from 'react';
import Box from './BulmaComponents/box.js';
import Tabs from './BulmaComponents/tabs.js';

const RenderFrame = (props) => {
  return (
          <Box style={{'height': '85vh'}}>
            <Tabs>
              {props.sheets.map((sheet, id) => (
                <li className={props.activeSheet === id ? 'is-active' : ''} key={id}>
                  <a onClick={props.handleActiveSheet(id)}>Sheet {id}</a>
                </li>
              ))}
            </Tabs>
            <SheetRender activeSheet={props.activeSheet} sheets={props.sheets}/>
          </Box>
        )
}


const SheetRender = (props) => {
  const currentItems = props.sheets[props.activeSheet]

  return (
          <div>
              {currentItems.map((item, itemId) => (
                <ul key={itemId}>
                  <ul>Item {itemId}:
                  <li>width: {item['x']}</li>
                  <li>height: {item['y']}</li>
                  <li>Corner: {item['cornerPoint']}</li>
                  </ul>
                </ul>
                ))}
          </div>
        )
}
export default RenderFrame
