import React, { useState } from 'react'
import { TextField, makeStyles, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../helper';
import { ApiPostNoAuth } from '../../apiHelper';
import { toast } from 'react-toastify';


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

export default function Login() {
    toast.configure();
    const navigate = useNavigate();
    const classes = useStyles();

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleRedirctToLogin = () => {
        navigate('/registration')
    }


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleResetData = () => {
        setData({
            email: '',
            password: '',
        })
    }

    const handleLogin = async () => {
        if (data.email && data.password) {
            try {
                await ApiPostNoAuth('/auth/login', data)
                    .then((res) => {
                        if (res.status === 200) {
                            toast.success("User Login Successfully")
                            setToken(res.data.token)
                            navigate('/home');
                            handleResetData();
                        }
                    })

            } catch (error) {
                toast.error(error)
            }
        }
    }


    return (
        <form className={classes.root}>
            <h1>Login</h1>
            <TextField label="Email" variant="filled" type="email" name="email" value={data.email} required onChange={handleChange} />
            <TextField label="Password" variant="filled" type="password" name="password" value={data.password} required onChange={handleChange} />
            <div>
                <Button type="button" variant="contained" onClick={handleResetData}>
                    Cancel
                </Button>
                <Button type="button" variant="contained" color="primary" onClick={handleRedirctToLogin}>
                    SignUp
                </Button>
                <Button type="button" variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </div>
        </form>
    )
}
