import React from 'react'
import {List, Datagrid, DeleteButton, EditButton, TextField } from 'react-admin'

export const GameList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id'/>
        <TextField source='name'/>
        <TextField source='genre'/>
        <TextField source='price'/>
        <EditButton/>
        <DeleteButton/>
      </Datagrid>
    </List>
  )
}

export default GameList