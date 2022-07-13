import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { ApiDelete, ApiPost, ApiPut } from '../../apiHelper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddEventModal from '../../commonComponents/AddEventModal';
import AddIcon from '@material-ui/icons/Add';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import Pagination from 'react-bootstrap-4-pagination';


const useStyles = makeStyles(theme => ({

    eventBox: {
        padding: 15,
        background: 'rgba(105,105,105,.3)',
        margin: '25px',
        borderRadius: '15px',
        display: 'flex'
    },
    eventTitles: {
        display: 'block',

        '& p': {
            margin: 0,
            paddingTop: 15,
            fontSize: 14,
            width: '80%',
            lineHeight: '20px',
            fontWeight: 400
        }
    },
    mainTitle: {
        display: 'flex',

        '& h1': {
            margin: 0,
            fontSize: '20px'
        },

        '& h6': {
            margin: 0,
            fontSize: '15px',
            padding: '4px 0px 0px 10px',
            fontWeight: '500'
        }
    },

    actionIcons: {
        display: 'flex',
        marginLeft: 'auto',

        '& svg': {
            display: 'block',
            background: '#fff',
            borderRadius: '100px',
            padding: '5px',
            margin: '0px 5px',
            cursor: 'pointer',
            width: '20px',
            height: '20px',

            '&:hover': {
                fill: 'blue'
            }
        }
    },

    addButton: {
        display: 'flex',
        margin: '25px 25px 25px 25px',

        '& button': {
            marginLeft: 'auto'
        }
    }

}));

export default function HomePage() {

    const classes = useStyles();

    const [eventData, setEventData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({
        event_name: '',
        event_address: '',
        description: ''
    });
    const [type, setType] = useState('Edit');
    const [htmlDoc, setHtmlDoc] = useState(null);
    const [totalData, setTotalData] = useState(0);

    useEffect(() => {
        fetchEventData(1)
    }, [])

    const fetchEventData = async (pageNumber) => {
        try {
            await ApiPost('/event', { page: pageNumber, limite: 5 })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("res", res);
                        setEventData(res.data.eventData);
                        setTotalData(res.data.totalData);
                    }
                })

        } catch (error) {
            console.log("err", error);
        }
    }

    const handleDeleteEvent = async (id) => {
        if (id) {
            try {
                await ApiDelete(`/event/delete/${id}`)
                    .then((res) => {
                        if (res.status === 200) {
                            setEventData([...res.data])
                        }
                    })

            } catch (error) {
                console.log("err", error);
            }
        }
    }

    const handleToggleModal = () => {
        setOpen(!open)
    }

    const handleEditEvent = (id) => {
        const findData = eventData.find(item => item.id === id);
        if (findData) {
            setSelectedRowData(findData)
            handleToggleModal()
        }
    }

    const handleEditData = async (data) => {

        if (data._id) {
            try {
                await ApiPut(`/event/edit/${data._id}`, data)
                    .then((res) => {
                        if (res.status === 200) {
                            handleToggleModal();
                            setSelectedRowData({
                                event_name: '',
                                event_address: '',
                                description: ''
                            });
                            setEventData([...res.data])
                        }
                    })

            } catch (error) {
                console.log("err", error);
            }
        }
    }

    const handleAddData = async (data) => {

        if (data) {
            try {
                await ApiPost(`/event/add`, data)
                    .then((res) => {
                        if (res.status === 200) {
                            handleToggleModal();
                            setSelectedRowData({
                                event_name: '',
                                event_address: '',
                                description: ''
                            });
                            setEventData([...res.data]);
                        }
                    })

            } catch (error) {
                console.log("err", error);
            }
        }
    }

    const handleAdd = () => {
        setType("Add");
        handleToggleModal();
    }

    const handleViewContent = async (data) => {
        if (data) {
            console.log("data", data);
            try {
                await ApiPost(`/event/html`, data)
                    .then((res) => {
                        if (res.status === 200) {
                            setHtmlDoc(res.data.EventHtmlTemplate)
                            console.log("res", res);
                        }
                    })

            } catch (error) {
                console.log("err", error);
            }
        }
    }

    const handleViewPdf = async (data) => {
        if (data) {
            try {
                await ApiPost(`/event/html/pdf`, data)
                    .then((res) => {
                        if (res.status === 200) {
                            let a = document.createElement("a");
                            a.href = "data:application/octet-stream;base64," + res.data.pdf;
                            a.download = "event_pdf.pdf"
                            a.click();
                            console.log("res", res);
                        }
                    })

            } catch (error) {
                console.log("err", error);
            }
        }
    }

    const handleChangePagination = (e) => {
        fetchEventData(e)
    }

    return (
        <>
            <AddEventModal open={open} handleClose={handleToggleModal} type={type} selectedRowData={selectedRowData} handleEditData={handleEditData} handleAddData={handleAddData} />
            <div className={classes.addButton}>
                <Button variant="contained" startIcon={<AddIcon />} color="success" onClick={handleAdd}>
                    Add
                </Button>
            </div>
            {eventData.map((item, index) => {
                return (
                    <div key={index} className={classes.eventBox}>
                        <div className={classes.eventTitles}>
                            <div className={classes.mainTitle}>
                                <h1>{item.event_name}</h1>
                                <h6>{item.event_address}</h6>
                            </div>
                            <p>{item.description}</p>
                        </div>
                        <div className={classes.actionIcons}>
                            <DeleteIcon onClick={() => handleDeleteEvent(item._id)} />
                            <EditIcon onClick={() => handleEditEvent(item.id)} />
                            <VisibilityIcon onClick={() => handleViewContent(item)} />
                            <AssignmentReturnedIcon onClick={() => handleViewPdf(item)} />
                        </div>
                    </div>
                )
            })}
            <div dangerouslySetInnerHTML={{ __html: htmlDoc }} ></div>
            <Pagination totalPages={totalData / 5} onClick={handleChangePagination} />
        </>
    )
}
