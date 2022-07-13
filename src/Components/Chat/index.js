import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({

}));

export default function Chat() {
    const classes = useStyles();
    return (
        <div className={classes.chatBox}>Chat</div>
    )
}
