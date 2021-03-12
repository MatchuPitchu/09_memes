import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ImagesAll = ( {data: {id, url} } ) => {
    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to={`/${id}`} >
                <img className="img-fluid style-images" id={id} src={url} />
            </Link>
        </div>
    )
}

export default ImagesAll;
