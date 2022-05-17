import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import EventBox from './EventBox';
import { makeStyles } from '@material-ui/core';
import { ApiGet, ApiPost } from '../../apiHelper';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    eventSection: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 25,
        marginTop: '20px',
        padding: '50px'
    }
}));

export default function Events() {
    const classes = useStyles();
    toast.configure();
    const [eventData, setEventData] = useState([]);
    console.log("eventData", eventData);
    useEffect(() => {
        fetchEventData();
    }, []);

    const fetchEventData = async () => {
        try {
            await ApiGet('/partyEvents')
                .then((res) => {
                    if (res.status === 200) {
                        setEventData(res.data)
                    }
                })

        } catch (error) {
            console.log("err", error);
        }
    }

    const handleLikeDisLike = async (id, is_like) => {
        try {
            await ApiPost(`/partyEvents/party/${!is_like ? 'like' : 'dis-like'}`, { id })
                .then((res) => {
                    if (res.status === 200) {

                        const findIndex = eventData.findIndex((item) => item._id === id)
                        if (findIndex >= 0) {
                            const copyData = eventData;
                            copyData[findIndex].is_like = !is_like;
                            setEventData([...copyData])
                            toast.success(res.data);
                        }
                    }
                })

        } catch (error) {
            toast.error(error)
            // console.log("err", error);
        }
    }

    return (
        <Layout>
            <div className={classes.eventSection}>
                {
                    eventData && eventData.length ?
                        <>
                            {
                                eventData.map((item, index) => {
                                    return (
                                        <EventBox data={item} key={index} handleLikeDisLike={handleLikeDisLike} />
                                    )
                                })
                            }
                        </>
                        : null
                }
            </div>
        </Layout>
    )
}
