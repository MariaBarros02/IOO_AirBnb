import React from 'react'
import Users from '../components/Users'
import TablaPropiedades from '../components/TablaPropiedades'
import TablaReservas from '../components/TablaReservas'
import HeaderAdministrador from '../layout/HeaderAdministrador';

const Administracion = () => {
  
  return (
    <>
      
      <HeaderAdministrador/>
      <TablaPropiedades />
      <TablaReservas />
      <Users />

    </>
  )
}

export default Administracion