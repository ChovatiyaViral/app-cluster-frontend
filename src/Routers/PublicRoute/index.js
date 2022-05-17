import React from 'react'
import { Navigate } from 'react-router-dom';
import { isAuthentication } from '../../helper';

export default function PublicRoutes(props) {
  return (
    <>
      {
        !isAuthentication() ?
          props.children
          :
          <Navigate to='/home' />
      }
    </>
  )
}
