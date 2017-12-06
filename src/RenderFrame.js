import React    from  'react';
import Box      from  './BulmaComponents/box.js';
import Tabs     from  './BulmaComponents/tabs.js';
import {Layer, Rect, Stage, Text, Group} from 'react-konva'

const RenderFrame = (props) => {
  return (
          <Box style={{'height': '85vh'}}>
            <Tabs>
              {props.sheets.map((sheet, id) => (
                <li className={props.activeSheet === id ? 'is-active' : ''} key={id}>
                  <a onClick={props.handleActiveSheet(id)}>Bin {id}</a>
                </li>
              ))}
            </Tabs>
            <SheetRender activeSheet={props.activeSheet} 
                         bin_dims={props.bin_dims}
                         sheets={props.sheets}
                         settings={props.settings}
            />
          </Box>
        )
}


const SheetRender = (props) => {
  const frameHeight   = window.innerHeight * 0.60
  const frameWidth    = window.innerWidth * 0.55
  const bin_height    = props.bin_dims[1]
  const bin_width     = props.bin_dims[0]

  var scalar        = Math.min(frameHeight/bin_height, frameWidth/bin_width)
  var scaled_width  = bin_width  * scalar
  var scaled_height = bin_height * scalar

  const currentItems  = props.sheets[props.activeSheet].map((item) => {
  var scaled_w = item.width*scalar
  var scaled_h = item.height*scalar
  var scaled_x = item.x*scalar
  var scaled_y = Math.abs((item.y*scalar)-scaled_height)-scaled_h
  return { x: scaled_x, 
             y: scaled_y, 
             width: scaled_w,
             height: scaled_h,
             id: item.id
           }
  })

  return (
          <div>
              {/*
              {currentItems.map((item, itemId) => (
                <ul key={itemId}>
                  <ul>Item {itemId}:
                  <li>width: {item['x']}</li>
                  <li>height: {item['y']}</li>
                  <li>Corner: {item['cornerPoint']}</li>
                  </ul>
                </ul>
                ))}
              */}
              <Stage width={750} height={400}>
                <Layer>
                  <Rect
                    x={0}
                    y={0}
                    width={scaled_width}
                    height={scaled_height}
                    stroke={'black'}
                    strokeWidth={'1'}
                  />
                  {currentItems.map((item, id) => (
                    <Group key={id}>
                      <Text x={item.x+(item.width/2)} y={item.y+(item.height/2)} text={item.id} />
                      <Rect key={id}
                            x={item.x}
                            y={item.y}
                            width={item.width}
                            height={item.height}
                            stroke={'black'}
                            strokeWidth={'1'}
                      />  
                    </Group>))}
                </Layer>
              </Stage>
          </div>
        )
}

export default RenderFrame
