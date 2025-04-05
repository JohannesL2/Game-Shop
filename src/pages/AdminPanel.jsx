import React from 'react'
import { Admin, Resource } from 'react-admin'
import FirebaseDataProvider from '../firebaseDataProvider'
import { GameList } from '../admin/games/GameList'
import { GameEdit } from '../admin/games/GameEdit'
import { GameCreate } from '../admin/games/GameCreate'
import Dashboard from '../admin/Dashboard'


const AdminPanel = () => {
  const dataProvider = FirebaseDataProvider;

  return (
    <Admin dashboard={Dashboard} dataProvider={dataProvider} basename='/admin'>
      <Resource name="games" list={GameList} edit={GameEdit} create={GameCreate}/>
      </Admin>
  )
}

export default AdminPanel