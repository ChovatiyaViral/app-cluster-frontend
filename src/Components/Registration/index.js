import React, { useState } from 'react'
import { TextField, makeStyles, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { ApiPostNoAuth } from '../../apiHelper';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

export default function Registration() {
    const navigate = useNavigate();
    const classes = useStyles();

    const [data, setData] = useState({
        first_name: '',
        email: '',
        password: ''
    })

    const handleRedirctToLogin = () => {
        navigate('/login')
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleResetData = () => {
        setData({
            ...data,
            first_name: '',
            email: '',
            password: ''
        })
    }

    const handleRegistartion = async () => {
        if (data.first_name && data.email && data.password) {
            try {
                await ApiPostNoAuth('/auth/registration', data)
                    .then((res) => {
                        if (res.status === 200) {
                            navigate('/login');
                            handleResetData();
                        }
                    })

            } catch (error) {
                console.log("err", error);
            }
        }
    }

    return (
        <form className={classes.root}>
            <h1>Registration</h1>
            <TextField label="First Name" name="first_name" value={data.first_name} variant="filled" required onChange={handleChange} />
            <TextField label="Email" name="email" variant="filled" value={data.email} type="email" required onChange={handleChange} />
            <TextField label="Password" name="password" variant="filled" value={data.password} type="password" required onChange={handleChange} />
            <div>
                <Button type="button" variant="contained" onClick={handleResetData}>
                    Cancel
                </Button>
                <Button type="button" variant="contained" color="primary" onClick={handleRegistartion}>
                    Signup
                </Button>
                <Button type="button" variant="contained" color="primary" onClick={handleRedirctToLogin}>
                    Login
                </Button>
            </div>
        </form>
    )
}
