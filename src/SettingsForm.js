import React from 'react';
import Field from './BulmaComponents/field.js';
import Input from './BulmaComponents/input.js';
import Select from './BulmaComponents/select.js';
import Checkbox from './BulmaComponents/checkbox.js';
import Button from './BulmaComponents/button.js';


const SettingsForm = (props) => {
 return (
        <div className="field is-horizontal" style={{'justifyContent': 'space-around'}}>
          <div className="field-body">
            <Field>
              <Input changeEvent={props.handleSetWidth}
                     cls="input is-small"
                     placeholder="Bin Width"/>
            </Field>
            <Field>
              <Input changeEvent={props.handleSetHeight}
                     cls="input is-small"
                     placeholder="Bin Height"/>
            </Field>
            <Field>
                <Select changeEvent={props.handleSetBinAlgo}
                        options={props.state.bin_algos}/>
            </Field>
            <Field>
                <Select changeEvent={props.handleSetPackAlgo}
                options={props.state.algorithms}/>
            </Field>
            <Field>
                <Select changeEvent={props.handleSetHeuristic}
                        options={props.state.heuristics}/>
            </Field>
            <Field>
                <Checkbox label="Sort:"
                          style={{'fontSize': '.5em'}}
                          defaultChecked={props.state.settings.sorting}
                          clickEvent={props.handleSetSorting}/>
            </Field>
            <Field>
                <Checkbox label="Rotate:"
                          style={{'fontSize': '.5em'}}
                          defaultChecked={props.state.settings.rotation}
                          clickEvent={props.handleSetSorting}
                />
            </Field>
            <Field>
              <Button text="go" clickEvent={props.clickEvent} cls="is-small" />
            </Field>
          </div>
        </div>
 )
}

export default SettingsForm

