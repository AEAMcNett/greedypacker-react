import React from 'react';
import Button from './BulmaComponents/button.js';
import Input from './BulmaComponents/input.js';
import { Panel, PanelHeading, PanelBlock } from './BulmaComponents/panel.js';



const ItemForm = (props) => {
    return (
      <Panel>
        <PanelHeading>
          Items
          <Button clickEvent={props.handleAddItem} cls='is-small' style={{'float': 'right'}} text='+'/>
        </PanelHeading>
        <ItemMap editing={props.state.editing}
                 items={props.state.items}
                 handleEditItem={props.handleEditItem}
                 handleFormUpdate={props.handleFormUpdate}
                 handleDelItem={props.handleDelItem} />
      </Panel>
    )
}


const ItemMap = (props) => {
  const items = props.items.map((item, id) =>
    props.editing !== id ? 
      <ItemDisplay key={id} item={item} clickEvent={props.handleEditItem(id)} 
                   style={{ 'display': 'flex',
                   'justifyContent': 'space-around'}} />
      : <ItemEdit key={id} id={id} item={item} 
                  changeEvent={props.handleFormUpdate} 
                  clickEvent={props.handleEditItem(id)}
                  handleDelItem={props.handleDelItem}
                  style={{ 'display': 'flex',
                           'justifyContent': 'space-around'}} />
  )
  return items
}

const ItemDisplay = (props) => {
  return (
    <PanelBlock type='anchor' clickEvent={props.clickEvent} style={props.style}>
      <p>Width: {props.item.x}</p>
      <p>Height: {props.item.y}</p>
    </PanelBlock>
  )
}

const ItemEdit = (props) => {
  return (
        <PanelBlock type='anchor' style={props.style}>
          <Input changeEvent={props.changeEvent(props.id, 'x')} 
                 cls="is-small item-form" placeholder="width"
                 value={props.item.x} style={{'width':'25%'}}/>
          <Input changeEvent={props.changeEvent(props.id, 'y')} 
                 cls="is-small item-form" placeholder="height"
                 value={props.item.y} type="text"
                 style={{'width':'25%'}}/>
          <Button clickEvent={props.clickEvent}
                  cls="is-small" 
                  style={{'float':'right'}}
                  text='✓'/>
          <Button clickEvent={props.handleDelItem(props.id)}
                  cls="is-small" 
                  style={{'float':'right'}}
                  text='☓'/>
        </PanelBlock>
  )
}

export default ItemForm
