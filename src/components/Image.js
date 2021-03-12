import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

const Image = () => {
    let { imgID } = useParams();
    const [img, setImg] = useState({});
    const [text, setText] = useState();
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
      setLoading(true);
      fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          const newArr = data.data.memes.filter(item => {
              return item.id === imgID
            });
          setImg(() => newArr[0]);
          console.log(newArr[0]);
          console.log(img.url)
        })
        .catch(err => setError(err));
    }, [imgID])

    const fields = img.box_count;

    const handleChange = (({target}) => {
        setText(target.value);
        console.log(text);
    })

    if (loading)
        return <Spinner />;

    if (error)
        return <div>Sorry for the inconvenience, but there was an error retrieving the data: {error}</div>;

    return (
        <div>
            {[...Array(fields)].map((e, index) => {
            return (<div key={index} className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Your text</span>
                <input type="text" onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            </div>)}
            )}
            <div className="relative">{text}</div>
            <img src={img.url} className="img-fluid"/>
        </div>
    )
}

export default Image;
