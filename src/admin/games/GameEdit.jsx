import React from "react";
import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

export const GameEdit = (props) => {
  return(
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Name" source="name"/>
        <TextInput label="Genre" source="genre"/>
        <NumberInput label="Price" source="price"/>
      </SimpleForm>
    </Edit>
  )
}