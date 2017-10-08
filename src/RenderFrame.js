import React from 'react';
import Box from './BulmaComponents/box.js';
import Tabs from './BulmaComponents/tabs.js';

const RenderFrame = (props) => {
  const testData = JSON.stringify(props.sheets)
  return (
          <Box style={{'height': '85vh'}}>
            <Tabs>
              <li className='is-active'><a>Sheet 0</a></li>
              <li><a>Sheet 1</a></li>
              <li><a>Sheet 2</a></li>
              <li><a>Sheet 3</a></li>
            </Tabs>
            {testData}
          </Box>
        )
}

export default RenderFrame
