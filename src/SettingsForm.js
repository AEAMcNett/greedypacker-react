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
              <Input cls="input is-small" placeholder="Bin Width"/>
            </Field>
            <Field>
              <Input cls="input is-small" placeholder="Bin Height"/>
            </Field>
            <Field>
                <Select options={props.state.bin_algos}/>
            </Field>
            <Field>
                <Select options={props.state.algorithms}/>
            </Field>
            <Field>
                <Select options={props.state.heuristics}/>
            </Field>
            <Field>
              <label className="label checkbox">
                <p style={{'fontSize': '.5em'}}>Sort:</p>            
                <Checkbox />
              </label>
            </Field>
            <Field>
                <Checkbox label="Rotate:" style={{'fontSize': '.5em'}}/>
            </Field>
            <Field>
              <Button text="go" clickEvent={props.clickEvent} cls="is-small" />
            </Field>
          </div>
        </div>
 )
}

export default SettingsForm

