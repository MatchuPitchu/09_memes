import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import Input from './Input';

const Image = () => {
    let { imgID } = useParams();
    const [img, setImg] = useState({});
    const [text, setText] = useState();
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState([]);
    
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
          console.log(img.name);
        })
        .catch(err => setError(err));
    }, [imgID])

    const handleChange = (({target}, index) => {
        const value = target.value || '';
        console.log(value);

        const newInputs = inputs.map((input, i) => {
            if (index === i) {
                return value;
            } else {
                return input;
            };
        });
        setInputs(newInputs);
        console.log(newInputs);
        
        setText(target.value);
        console.log(text);
    })

    if (loading)
        return <Spinner />;

    if (error)
        return <div>Sorry for the inconvenience, but there was an error retrieving the data: {error}</div>;

    return (
        <div>
            {/* Hier erstelle ich Array mit sovielen Elementen, wie img.box_count aus API vorgibt */}
            {[...Array(img.box_count)].map((item, index) => {
            return (<div key={index} className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Text {index + 1}</span>
                <input 
                    type="text"
                    className="form-control"
                    aria-label="caption"
                    value={item} 
                    onChange={(event) => handleChange(event, index)} />
            </div>)}
            )}
            <div className="relative text-center">{text}</div>
            <img src={img.url} className="img-fluid" alt={img.name}/>
        </div>
    )
}

export default Image;
