import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ImagesAll = ( {data: {id, url} } ) => {
    const [choice, setChoice] = useState({});
    const [imgID, setImgID] = useState(null);
    
    const handleClick = (() => {
        setChoice({id}, {url} );
        setImgID(choice.id)
        console.log(choice.id);
    })
    
    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to={`/${id}`}>
                <img onClick={handleClick} className="img-fluid style-images" id={id} src={url} />
            </Link>
        </div>
    )
}

export default ImagesAll;
