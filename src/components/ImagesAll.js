import React from 'react';

const ImagesAll = ( {data: {url} } ) => {
    return (
        <div className="col-3">
            <img className="img-fluid style-images" src={url} />
        </div>
    )
}

export default ImagesAll;
