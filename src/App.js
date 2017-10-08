import React, { Component } from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'

import SettingsForm from './SettingsForm.js'
import ItemForm from './ItemsForm.js';
import RenderFrame from './RenderFrame.js';

import Columns from './BulmaComponents/columns.js';
import Column from './BulmaComponents/column.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
                  items: [{x: '', y: ''}],
                  sheets: [],
                  editing: 0,
                  algorithms: ['shelf', 'Guillotine'], 
                  heuristics: ['First Fit',
                               'Next Fit',
                               'Best Width Fit',
                               'Best Height Fit',
                               'Best Area Fit',
                               'Worst Width Fit',
                               'Worst Height Fit',
                               'Worst Area Fit'],
                  bin_algos: ['bin_first_fit', 'bin_best_fit']
                 }  
  }

  handleFetchData = () => {
    const data = { "items": [[4,5], [2,3], [5,6]], "binmanager": { "bin_width": 10, "bin_height": 5, "bin_algo": "bin_best_fit", "pack_algo": "guillotine", "heuristic": "best_width_fit", "sorting": true, "rotation": true } }
    axios.post('http://127.0.0.1:5000', data)
    .then( (response) => {
      this.setState({
        sheets: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
            <Columns style={{'padding': '5vh'}}> 
              <Column>
                <SettingsForm clickEvent={this.handleFetchData} state={this.state}/>
                <Columns>
                  <Column class='is-two-thirds'>
                  <RenderFrame sheets={this.state.sheets}/>
                  </Column>
                  <Column class='is-one-third'>
                    <ItemForm />
                  </Column>
                </Columns>
              </Column>
            </Columns>
    );
  }
}



export default App;
