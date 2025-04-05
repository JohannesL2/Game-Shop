import React from "react";
import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

export const GameCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Name" source="name"/>
        <TextInput label="Genre" source="genre"/>
        <NumberInput label="Price" source="price"/>
      </SimpleForm>
    </Create>
  )
}