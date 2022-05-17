import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import './ContentModal.css';
import { makeStyles } from "@material-ui/core/styles";
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import { YouTube } from '@mui/icons-material';
import Carousel from '../Carousel/Carousel';


const API_KEY = process.env.REACT_APP_API_KEY;

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));

export default function ContentModal({ children, media_type, id }) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState([]);
    const [video, setVideo] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
        );
        setContent(data);
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div onClick={handleOpen} className='media'>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {
                        content &&
                        <div className={classes.paper}>
                            <div className="contentmodal">
                                <img
                                    className='contentmodal-portrait'
                                    src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title} />
                                <img
                                    className="contentmodal-landsapce"
                                    src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} />

                                <div className="contentmodal-about">
                                    <span className='contentmodal-title'>
                                        {content.name || content.title} (
                                        {(
                                            content.release_date || content.first_air_date || "-----"
                                        ).substring(0, 4)
                                        }
                                        )
                                    </span>
                                    {
                                        content.tagline && (
                                            <i className='tagline'>{content.tagline}</i>
                                        )
                                    }
                                    <span className="contentmodal-description">
                                        {
                                            content.overview
                                        }
                                    </span>
                                    <div>

                                        <Carousel media_type={media_type} id={id}/>
                                    </div>
                                    <Button
                                        variant="contained"
                                        startIcon={<YouTube />}
                                        color="secondary"
                                        target="_blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >Watch the Trailer
                                    </Button>


                                </div>
                            </div>
                        </div>
                    }
                </Fade>
            </Modal>
        </>
    );
}
