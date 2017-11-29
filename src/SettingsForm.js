import React from 'react';
import Field from './BulmaComponents/field.js';
import Input from './BulmaComponents/input.js';
import Select from './BulmaComponents/select.js';
import Checkbox from './BulmaComponents/checkbox.js';
import Button from './BulmaComponents/button.js';

class SettingsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
                  wcolor: '',
                  hcolor: ''
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
    this.handleSubmit = () => {
      this.validate()
      this.props.handleSubmit()
    }
  }
  render() {
    return (
        <div className="field is-horizontal" style={{'justifyContent': 'space-around'}}>
          <div className="field-body">
            <Field label='bin dimensions'>
              <Input changeEvent={this.props.handleSetWidth}
                     cls="input is-small"
                     color={this.state.wcolor}
                     placeholder="Bin Width"/>
            </Field>
            <Field label='.'>
              <Input changeEvent={this.props.handleSetHeight}
                     cls="input is-small"
                     color={this.state.hcolor}
                     placeholder="Bin Height"/>
            </Field>
            <Field label='bin select algorithm'>
                <Select changeEvent={this.props.handleSetBinAlgo}
                        options={this.props.state.bin_algos}/>
            </Field>
            <Field label='packing algorithm'>
                <Select changeEvent={this.props.handleSetPackAlgo}
                options={this.props.state.algorithms}/>
            </Field>
            <Field label='heuristic'>
                <Select changeEvent={this.props.handleSetHeuristic}
                        options={this.props.state.heuristics}/>
            </Field>
            <Field label='sorting rules'>
                <Select changeEvent={this.props.handleSetSorting}
                        options={this.props.state.sorting}/>
            </Field>
            {this.props.state.settings.pack_algo === 'shelf' || this.props.state.settings.pack_algo === 'skyline' ? (
              <Field label='wastemap'>
                <Select changeEvent={this.props.handleSetSorting}
                        options={['True', 'False']} />
              </Field> ) : null }
            <Field>
                <Checkbox label="Rotate:"
                          style={{'fontSize': '.5em'}}
                          defaultChecked={this.props.state.settings.rotation}
                          clickEvent={this.props.handleSetSorting}
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

const Optimizations = (props) => {
  return (
    <div>
    </div>
  )
}

export default SettingsForm
