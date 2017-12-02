import React    from  'react';
import Box      from  './BulmaComponents/box.js';
import Tabs     from  './BulmaComponents/tabs.js';
import {Layer, Rect, Stage} from 'react-konva'

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
            <SheetRender activeSheet={props.activeSheet} sheets={props.sheets} settings={props.settings}/>
          </Box>
        )
}


const SheetRender = (props) => {
  const currentItems  = props.sheets[props.activeSheet]
  const bin_height    = props.settings['bin_height']
  const bin_width     = props.settings['bin_width']

  var scaled_width
  var scaled_height
  var scalar
  if (bin_width > bin_height) {
    scalar        = 750 / bin_width
    scaled_width  = 750
    scaled_height = bin_height * scalar
  } else {
    scalar        = 400 / bin_height
    scaled_height = 400
    scaled_width  = bin_width * scalar
  }
  //console.log(currentItems)

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
                    <Rect key={id}
                          x={item.x*scalar}
                          y={item.y*scalar}
                          width={item.width*scalar}
                          height={item.height*scalar}
                          stroke={'black'}
                          strokeWidth={'1'}
                  />))}

                </Layer>
              </Stage>
          </div>
        )
}

//const ItemRects = (props) => {
//  console.log(props)
//  const rects = props.items.map((item, id) => { 
//        return <Rect x={item.cornerPoint[0]*props.scalar}
//                     y={item.cornerPoint[1]*props.scalar}
//                     width={item.x*props.scaled_width}
//                     height={item.y*props.scaled_height}
//                     stroke={'black'}
//                     strokeWidth={'1'}
//                />})
//  return rects
//}

export default RenderFrame
