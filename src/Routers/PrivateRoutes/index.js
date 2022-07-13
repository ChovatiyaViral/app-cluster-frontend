import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthentication } from '../../helper'
import Layout from '../../Layout'


export default function PrivateRoutes(props) {
    return (
        <>
            {
                isAuthentication() ?
                    <Layout>
                        {
                            props.children
                        }
                    </Layout>
                    :
                    <Navigate to='/login' />
            }
        </>
    )
}
