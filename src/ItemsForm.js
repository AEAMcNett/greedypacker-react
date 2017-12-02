import React from 'react';
import Button from './BulmaComponents/button.js';
import Input from './BulmaComponents/input.js';
import { Panel, PanelHeading, PanelBlock } from './BulmaComponents/panel.js';



class ItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  xcolor: '',
                    ycolor: '',
                    items: [{ x: '1',
                             y: '2',
                             editing: true,
                             xvalid: true,
                             yvalid: true
                           }]
                 }
  }


  handleAddItem = () => {
    this.setState({
      items: this.state.items.concat([{x: '',
                                       y: '',
                                       editing: true, 
                                       xvalid: true,
                                       yvalid: true
                                      }]),
    })
  }


  handleDeleteItem = (id) => () => {
    const newItems = this.state.items.filter((el, i) => id !== i)
    this.setState({items: newItems}, this.props.handleFormUpdates(newItems))
  }


  handleFieldUpdate = (id, [field]) => (e) => {
    const newItems = this.state.items.map((item, sidx) => {
      if (id !== sidx) return item;
      if (/^\d+$/.test(e.target.value) || e.target.value === '') {
        return { ...item, [field]: e.target.value };
      } else { return item }
    })
    this.setState({items: newItems})
  }


  validateField = (field) => {
    return /^\d+$/.test(field)
  }


  handleSubmitItem = (id) => () => {
    const newItems = this.state.items.map((item, sidx) => {
      if (id !== sidx) return item
      if (item.editing) return { ...item, editing: false }
      return { ...item, editing: true }
    })
    this.setState({items: newItems}, this.props.handleFormUpdates(newItems))
  }

  render() { 
      return (
        <Panel>
          <PanelHeading>
            Items
            <Button clickEvent={this.handleAddItem} cls='is-small' style={{'float': 'right'}} text='+'/>
          </PanelHeading>
          <ItemMap items={this.state.items} 
                   handleSubmitItem={this.handleSubmitItem}
                   handleFieldUpdate={this.handleFieldUpdate} 
                   handleDeleteItem={this.handleDeleteItem}
          />

        </Panel>
      )
  }
}


const ItemMap = (props) => {
  const {items, ...other} = props
  const itemList = props.items.map((item, id) => { 
        return <ItemDisplay key={id} item={item} 
                            id={id} {...other}
        />})
  return itemList
}


const ItemDisplay = (props) => {
  const style = { 'display': 'flex', 'justifyContent': 'space-around'}
  if (props.item.editing) {
    return (
        <PanelBlock type='anchor' style={style}>
          <p>{props.id+1}:</p>
          <Input changeEvent={props.handleFieldUpdate(props.id, 'x')} 
                 cls="is-small item-form"
                 placeholder="width"
                 value={props.item.x}
                 type="text"
                 style={{'width':'25%'}}/>
          <Input changeEvent={props.handleFieldUpdate(props.id, 'y')} 
                 cls="is-small item-form"
                 placeholder="height"
                 value={props.item.y}
                 type="text"
                 style={{'width':'25%'}}/>
          <Button 
                  cls="is-small" 
                  clickEvent={props.handleSubmitItem(props.id)}
                  style={{'float':'right'}}
                  text='✓'/>
          <Button clickEvent={props.handleDeleteItem(props.id)} 
                  cls="is-small" 
                  style={{'float':'right'}}
                  text='☓'/>
        </PanelBlock>
    )

  } else {
    return (
      <PanelBlock type='anchor' clickEvent={props.handleSubmitItem(props.id)} 
                  style={style}>
        <p>{props.id+1}:</p>
        <p>Width: {props.item.x}</p>
        <p>Height: {props.item.y}</p>
      </PanelBlock>
    )
  }
}

export default ItemForm
