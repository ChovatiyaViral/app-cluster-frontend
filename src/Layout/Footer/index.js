import { Container, Typography } from '@material-ui/core'
import React from 'react'

export default function Footer() {
    return (
        <div style={{ height: '50px', display: 'flex', justifyContent: 'center', background: '#3f51b5', alignItems: 'center' }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    style={{ color: 'white' }}
                >
                    Footer
                </Typography>
            </Container>
        </div>
    )
}
