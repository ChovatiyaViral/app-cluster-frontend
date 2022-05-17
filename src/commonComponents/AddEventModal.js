import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import { Button, TextareaAutosize, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: "white",
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        padding: '10px 15px',
        border: '0px',
        outline: "none",
        borderRadius: '15px'
    },

    modal: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #000',

        '& h1': {
            fontSize: '20px',
            fontWeight: 500,
        },

        '& svg': {
            cursor: 'pointer'
        }
    },

    modalBody: {
        marginTop: '25px',

        '& .MuiTextField-root': {
            margin: '0px 0px 25px 0px'
        }
    },
    modalFooter: {
        display: 'flex',
        marginTop: '25px',
        gap: 10,
        justifyContent: 'flex-end',
        marginBottom: 15
    }
}));

const data = {
    event_name: '',
    event_address: '',
    description: ''
}


const AddEventModal = ({ open, handleClose, selectedRowData, handleEditData, type, handleAddData }) => {
    const classes = useStyles();
    const [eventData, setEventData] = useState(data);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setEventData(selectedRowData)
    }, [selectedRowData])


    const handleChange = (e) => {
        setIsEdit(true);
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value
        })
    };

    const handleEdit = (type) => {
        if (type === 'Edit' && isEdit) {
            handleEditData(eventData)
        }
        if (type === "Add") {
            handleAddData(eventData)
        }
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
        >
            <div className={classes.paper}>
                <div className={classes.modalHeader}>
                    <h1>Add Event</h1>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div className={classes.modalBody}>
                    <form>
                        <TextField
                            id="outlined-secondary"
                            label="Event Name"
                            variant="outlined"
                            color="primary"
                            style={{ width: '100%' }}
                            name="event_name"
                            value={eventData.event_name}
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-secondary"
                            label="Event Address"
                            variant="outlined"
                            color="primary"
                            style={{ width: '100%' }}
                            name="event_address"
                            value={eventData.event_address}
                            onChange={handleChange}
                        />
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={4}
                            style={{ width: '100%', borderRadius: '5px', margin: '0px 1px' }}
                            placeholder="Minimum 3 rows"
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                        />
                    </form>
                </div>
                <div className={classes.modalFooter}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(type)}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default AddEventModal;