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
                  sheets: [[]],
                  editing: undefined,
                  activeSheet: 0,
                  algorithms: ['Shelf', 'Guillotine', 'Maximal Rectangle', 'Skyline'], 
                  heuristics: ['First Fit',
                               'Next Fit',
                               'Best Width Fit',
                               'Best Height Fit',
                               'Best Area Fit',
                               'Worst Width Fit',
                               'Worst Height Fit',
                               'Worst Area Fit'],
                  h_choices:  {'Shelf':
                                ['First Fit',
                                 'Next Fit',
                                 'Best Width Fit',
                                 'Best Height Fit',
                                 'Best Area Fit',
                                 'Worst Width Fit',
                                 'Worst Height Fit',
                                 'Worst Area Fit'
                                ],
                               'Guillotine':
                                ['Best Shortside',
                                 'Best Longside',
                                 'Best Area',
                                 'Worst Shortside',
                                 'Worst Longside',
                                 'Worst Area',
                                ],
                                'Maximal Rectangle':
                                ['Best Shortside',
                                 'Best Longside',
                                 'Best Area',
                                 'Worst Shortside',
                                 'Worst Longside',
                                 'Worst Area',
                                 'Bottom Left',
                                 'Contact Point',
                                ],
                                'Skyline':
                                ['Bottom Left',
                                 'Best Fit'
                                ]
                              },
                  sorting:    ['ASCA', 'DESCA', 'ASCSS', 'DESCSS',
                               'ASCLS', 'DESCLS', 'ASCPERIM', 'DESCPERIM',
                               'ASCDIFF', 'DESCDIFF', 'ASCRATIO', 'DESCRATIO', 'None'],
                  bin_algos:  ['bin first fit', 'bin best fit'],
                  settings:   {'bin_width': 8, 
                               'bin_height': 4, 
                               'bin_algo': 'bin_best_fit', 
                               'pack_algo': 'shelf', 
                               'heuristic': 'first_fit', 
                               'sorting': true, 
                               'sorting_heuristic': 'DESCA',
                               'rotation': true, 
                               'wastemap': true,
                               'rectangle_merge': true} 
                 }  
  }

  
  //// SettingsForm Methods

  handleSetWidth = (e) => {
    var settings = {...this.state.settings}
    settings['bin_width'] = e.target.value ? parseInt(e.target.value, 10) : 0
    this.setState({settings})
  }


  handleSetHeight = (e) => {
    var settings = {...this.state.settings}
    settings['bin_height'] = e.target.value ? parseInt(e.target.value, 10) : 0
    this.setState({settings})
  }


  handleSetBinAlgo = (e) => {
    var settings = {...this.state.settings}
    settings['bin_algo'] = e.target.value.replace(/ /g,"_");
    this.setState({settings})
  }


  setNewSettingsState = (newSettings) => {
    this.setState({
       settings: {
          ...this.state.settings,
          newSettings
          }
          })
  }


  handleSetPackAlgo = (e) => {
    const algo = e.target.value    
    const heuristics = this.state.h_choices[e.target.value] 
    var settings = {...this.state.settings}

    settings['pack_algo'] = algo.replace(/ /g,"_").toLowerCase()
    settings['heuristic'] = this.state['h_choices'][algo][0].replace(/ /g,"_").toLowerCase()
    this.setState({settings, heuristics})
  }


  handleSetHeuristic = (e) => {
    var settings = {...this.state.settings}
    settings['heuristic'] = e.target.value.replace(/ /g,"_").toLowerCase()
    this.setState({settings})
  }


  handleSetSorting = (e) => {
    var settings = {...this.state.settings}
    settings['sorting_heuristic'] = e.target.value 
    e.target.value === 'None' ? settings['sorting'] = false : settings['sorting'] = true
    this.setState({settings})
  }


  handleSetRotation = () => {
    var settings = {...this.state.settings}
    settings['rotation'] = !settings['rotation']
    this.setState({settings})
  }

  handleSetWastemap = (e) => {
    var settings = {...this.state.settings}
    e.target.value === 'True' ? settings['wastemap'] = true : settings['wastemap'] = false
    this.setState({settings})
  }

  handleSetRectangleMerge = (e) => {
    var settings = {...this.state.settings}
    e.target.value === 'True' ? settings['rectangle_merge'] = true : settings['rectangle_merge'] = false
    this.setState({settings})
  }

  //// Sync item list
  handleFormUpdates = (newItems) => {
    this.setState({items: newItems })
  }


  //// Ajax Methods
  
  handleFetchData = () => {
    const items = this.state.items.map(item => { return [parseInt(item['x'], 10), parseInt(item['y'], 10)]})
    const data = { 'items': items, 
                   'binmanager': this.state.settings
                 }
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
  
  //// RenderFrame Methods
  handleActiveSheet = (id) => () => {
    this.setState({activeSheet: id})
  }

  render() {
    return (
            <Columns style={{'padding': '5vh'}}> 
              <Column>
                <SettingsForm handleSetWidth={this.handleSetWidth}
                              handleSetHeight={this.handleSetHeight}
                              handleSetBinAlgo={this.handleSetBinAlgo}
                              handleSetPackAlgo={this.handleSetPackAlgo}
                              handleSetHeuristic={this.handleSetHeuristic}
                              handleSetSorting={this.handleSetSorting}
                              handleSetRotation={this.handleSetRotation}
                              handleSetWastemap={this.handleSetWastemap}
                              handleSetRectangleMerge={this.handleSetRectangleMerge}
                              clickEvent={this.handleFetchData} 
                              state={this.state}/>
                <Columns>
                  <Column class='is-two-thirds'>
                  <RenderFrame handleActiveSheet={this.handleActiveSheet}
                               sheets={this.state.sheets}
                               activeSheet={this.state.activeSheet}/>
                  </Column>
                  <Column class='is-one-third'>
                    <ItemForm handleFormUpdates={this.handleFormUpdates} />
                  </Column>
                </Columns>
              </Column>
            </Columns>
    );
  }
}



export default App;
