import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    layoutDiv: {
        paddingTop:'64px',
        height:'calc(100vh - 115px)',
        overflow:'auto'
    }
})

export default function Layout({ children }) {
    const classes = useStyles();
    return (
        <>
            <Header />
            <div className={classes.layoutDiv}>
                {
                    children
                }
            </div>
            <Footer />
        </>

    )
}
