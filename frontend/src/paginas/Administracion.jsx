import React from 'react'
import Users from '../components/Users'
import TablaPropiedades from '../components/TablaPropiedades'
import HeaderAdministrador from '../layout/HeaderAdministrador';

const Administracion = () => {
  
  return (
    <>
      
      <HeaderAdministrador/>
      <TablaPropiedades />
      <Users />

    </>
  )
}

export default Administracion