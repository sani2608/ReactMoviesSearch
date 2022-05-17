import { Badge } from '@mui/material';
import React from 'react';
import { img_300, unavailable } from '../../config/config';
import ContentModal from '../ContentModal/ContentModal';
import './SingleContent.css';


const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {
    return (
        
        
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'} />
            <div className="img-wrapper">
                <img
                    className='poster hover-zoom'
                    src={poster ? `${img_300}/${poster}` : unavailable}
                    alt="poster"
                />
            </div>
            <b className='title'>{title}</b>
            <div className="subtitle">
                <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
                <span>{date}</span>
            </div>

        </ContentModal>
    )
}

export default SingleContent