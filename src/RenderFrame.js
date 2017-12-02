import React    from  'react';
import Box      from  './BulmaComponents/box.js';
import Tabs     from  './BulmaComponents/tabs.js';
import {Layer, Rect, Stage, Group} from 'react-konva'

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
              <Stage width={700} height={700}>
                <Layer>
                  <Rect
                    x={0}
                    y={0}
                    width={50}
                    height={50}
                    stroke={'black'}
                    strokeWidth={'1'}
                  />
                  <Rect
                    x={50}
                    y={0}
                    width={50}
                    height={50}
                    stroke={'black'}
                    strokeWidth={'1'}
                  />
                </Layer>
              </Stage>
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
