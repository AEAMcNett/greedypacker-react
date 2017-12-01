import React from 'react';
import Field from './BulmaComponents/field.js';
import Input from './BulmaComponents/input.js';
import Select from './BulmaComponents/select.js';
import Checkbox from './BulmaComponents/checkbox.js';
import Button from './BulmaComponents/button.js';
import { h_choices, sorting_choices, bin_algo_choices, algo_choices } from './constants.js';

class SettingsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
                  wcolor: '',
                  hcolor: '',
                  algorithms: algo_choices,
                  heuristics: h_choices['shelf'],
                  sorting:    sorting_choices,
                  bin_algos:  bin_algo_choices,
                 }


    this.validate = () => {
      if (/^\d+$/.test(this.state.settings.bin_height) !== true) {
        this.setState({wcolor: 'is-danger'})
      } else {
        this.setState({wcolor: ''})
      }
      if (/^\d+$/.test(this.state.settings.bin_height) !== true) {
        this.setState({hcolor: 'is-danger'})
      } else {
        this.setState({hcolor: ''})
      }
    }
    //this.handleSubmit = () => {
    //  this.validate()
    //  this.props.handleSubmit()
    //}

    this.handleSetWidth = (e) => {
      const val = e.target.value ? parseInt(e.target.value, 10) : 0
      const field = {bin_width: val}
      this.props.handleSetField(field)
    }


    this.handleSetHeight = (e) => {
      const val = e.target.value ? parseInt(e.target.value, 10) : 0
      const field = {bin_height: val}
      this.props.handleSetField(field)
    }


    this.handleSetBinAlgo = (e) => {
      const val = e.target.value.replace(/ /g,"_")
      const field = {bin_algo: val}
      this.props.handleSetField(field)
    }

    
    this.handleSetPackAlgo = (e) => {
      const algo = e.target.value.replace(/ /g,"_").toLowerCase()
      const pack_algo = {
        pack_algo: algo,
        heuristic: h_choices[algo][0]
      }
      this.props.handleSetField(pack_algo)
      const heuristics = h_choices[algo]
      this.setState({heuristics})
    }
    

    this.handleSetHeuristic = (e) => {
      const val = e.target.value.replace(/ /g,"_").toLowerCase()
      const field = {heuristic: val}
      this.props.handleSetField(field)
    }

    
    this.handleSetSorting = (e) => {
      const val = e.target.value
      var field = {
        sorting_heuristic: val,
        sorting: true
      }
      if (val === 'None') {
        field = {...field, sorting: false}
      }
      this.props.handleSetField(field)
    }


    this.handleSetWastemap = (e) => {
      let val = null
      if (e.target.value === 'True') {
        val = true
      } else {
        val = false
      }
      const field = {wastemap: val}
      this.props.handleSetField(field)
    }


    this.handleSetRectangleMerge = (e) => {
      let val = null
      if (e.target.value === 'True') {
        val = true
      } else {
        val = false
      }
      const field = {rectangle_merge: val}
      this.props.handleSetField(field)
    }


    this.handleSetRotate = () => {
      var val = this.props.state.settings.rotation
      val = !val
      const field = {rotation: val}
      this.props.handleSetField(field)
    }
  }
  render() {
    return (
        <div className="field is-horizontal" style={{'justifyContent': 'space-around'}}>
          <div className="field-body">
            <Field label='bin width'>
              <Input changeEvent={this.handleSetWidth}
                     cls="input is-small"
                     color={this.state.wcolor} />
            </Field>
            <Field label='bin height'>
              <Input changeEvent={this.handleSetHeight}
                     cls="input is-small"
                     color={this.state.hcolor} />
            </Field>
            <Field label='bin select algorithm'>
                <Select changeEvent={this.handleSetBinAlgo}
                        options={this.props.state.bin_algos}/>
            </Field>
            <Field label='packing algorithm'>
                <Select changeEvent={this.handleSetPackAlgo}
                options={this.state.algorithms}/>
            </Field>
            <Field label='heuristic'>
                <Select changeEvent={this.handleSetHeuristic}
                        options={this.state.heuristics}/>
            </Field>
            <Field label='sorting rules'>
                <Select changeEvent={this.handleSetSorting}
                        options={this.state.sorting}/>
            </Field>
            {this.props.state.settings.pack_algo === 'shelf' || this.props.state.settings.pack_algo === 'skyline' ? (
              <Field label='wastemap'>
                <Select changeEvent={this.handleSetWastemap}
                        options={['True', 'False']} />
              </Field> ) : null }
            {this.props.state.settings.pack_algo === 'guillotine' ? (
              <Field label='rectangle merge'>
                <Select changeEvent={this.handleSetRectangleMerge}
                        options={['True', 'False']} />
              </Field>) :null }
            <Field>
                <Checkbox label="Rotate:"
                          style={{'fontSize': '.5em'}}
                          defaultChecked={this.props.state.settings.rotation}
                          clickEvent={this.handleSetRotate}
                />
            </Field>
            <Field>
              <Button text="go" clickEvent={this.props.clickEvent} cls="is-small" />
            </Field>
          </div>
        </div>
    )
 }
}

export default SettingsForm
