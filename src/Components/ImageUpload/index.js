import { makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { ApiPost, ApiGet } from '../../apiHelper';

const useStyles = makeStyles(theme => ({
    imageUploadSection: {
        height: 'calc(100vh - 121px)',
        marginTop: '70px'
    }

}));

export default function ImageUpload() {
    const classes = useStyles();

    const [fileUpload, setFileUpload] = useState(null);
    const [ImageData, setImageData] = useState([]);

    useEffect(() => {
        getImages()
    }, [])



    const handleChange = (e) => {
        setFileUpload(e.target.files)
    }


    const handleSubmit = async () => {
        if (Object.keys(fileUpload).length) {
            var formData = new FormData();

            for (const files of fileUpload) {
                formData.append('img_Collection', files)
            }
            try {
                await ApiPost('/imageUpload', formData)
                    .then((res) => {
                        if (res.status === 200) {
                            setFileUpload(null)
                            setImageData([...ImageData, ...res.data])
                        }
                    })

            } catch (error) {
                console.log("err", error);

            }
        }
    }

    const getImages = async () => {
        try {
            await ApiGet('/imageUpload')
                .then((res) => {
                    if (res.status === 200) {
                        console.log("res", res);
                        setImageData(res.data)
                    }
                })

        } catch (error) {
            console.log("err", error);

        }
    }

    return (
        <>
            <div className={classes.imageUploadSection}>
                Image upload
                <TextField
                    required
                    inputProps={{
                        multiple: true
                    }}
                    accept="image/*"
                    id="standard-required"
                    onChange={(e) => handleChange(e)}
                    name="image-upload"
                    type="file"
                    variant="standard"
                />
                <button onClick={handleSubmit}>Upload</button>
                <div>
                    {
                        ImageData.map(item => {
                            return (
                                <img src={item} alt="img" width="80px" height="80px" style={{ margin: '20px' }} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
