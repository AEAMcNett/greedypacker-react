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
                  algorithms: ['shelf', 'Guillotine'], 
                  heuristics: ['First Fit',
                               'Next Fit',
                               'Best Width Fit',
                               'Best Height Fit',
                               'Best Area Fit',
                               'Worst Width Fit',
                               'Worst Height Fit',
                               'Worst Area Fit'],
                  bin_algos:  ['bin first fit', 'bin best fit'],
                  settings:   {'bin_width': 10, 
                               'bin_height': 5, 
                               'bin_algo': 'bin_best_fit', 
                               'pack_algo': 'guillotine', 
                               'heuristic': 'best_width_fit', 
                               'sorting': true, 
                               'rotation': true } 
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


  handleSetPackAlgo = (e) => {
    var settings = {...this.state.settings}
    settings['pack_algo'] = e.target.value.replace(/ /g,"_");
    this.setState({settings})
  }


  handleSetHeuristic = (e) => {
    var settings = {...this.state.settings}
    settings['heuristic'] = e.target.value.replace(/ /g,"_");
    this.setState({settings})
  }


  handleSetSorting = () => {
    var settings = {...this.state.settings}
    settings['sorting'] = !settings['sorting']
    this.setState({settings})
  }


  handleSetRotation = () => {
    var settings = {...this.state.settings}
    settings['rotation'] = !settings['rotation']
    console.log(settings['rotation'])
    this.setState({settings})
  }


  //// Item Form Methods
  handleAddItem = () => {
    this.setState({
      items: this.state.items.concat([{x: '', y: ''}]),
      editing: this.state.items.length
    })
  }

  handleEditItem = (id) => () => {
    id === this.state.editing ?
      this.setState({editing: ''}) : this.setState({editing: id})  
  }

  handleFormUpdate = (id, [field]) => (e) => {
    const newItems = this.state.items.map((item, sidx) => {
      if (id !== sidx) return item;
      if (/^\d+$/.test(e.target.value) || e.target.value === '') {
        return { ...item, [field]: e.target.value };
      } else { return item }
    })
    this.setState({items: newItems})
  }

  handleDelItem = (id) => ()  => {
    this.setState({
      items: this.state.items.filter((s, sidx) => id !== sidx),
      editing: '',
    });
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
                              clickEvent={this.handleFetchData} 
                              state={this.state}/>
                <Columns>
                  <Column class='is-two-thirds'>
                  <RenderFrame handleActiveSheet={this.handleActiveSheet}
                               sheets={this.state.sheets}
                               activeSheet={this.state.activeSheet}/>
                  </Column>
                  <Column class='is-one-third'>
                    <ItemForm state={this.state}
                              handleAddItem={this.handleAddItem}
                              handleEditItem={this.handleEditItem}
                              handleDelItem={this.handleDelItem}
                              handleFormUpdate={this.handleFormUpdate}/>
                  </Column>
                </Columns>
              </Column>
            </Columns>
    );
  }
}



export default App;
