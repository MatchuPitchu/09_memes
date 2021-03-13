import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// library, um Bild-Datei zu speichern
import { saveAs } from 'file-saver';
import Spinner from './Spinner';

const Image = () => {
    let { imgID } = useParams();
    const [img, setImg] = useState({});
    const [text, setText] = useState([]);
    const [memeURL, setMemeURL] = useState(null);
    const [memePageURL, setMemePageURL] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
      setLoading(true);
      fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(data => {
            const newArr = data.data.memes.filter(item => item.id === imgID);
            // always better setState with callback?!
            setImg(() => newArr[0]);
            console.log(newArr[0]);
            setLoading(false);
        })
        .catch(err => setError(err));
    }, [imgID])

    useEffect(() => {
        // create Array which index number of img.box_count
        const arrText = new Array(img.box_count).fill('', 0, img.box_count);
        console.log(arrText);
        // always better setState with callback?!
        setText(() => arrText);
    }, [img])

    const updateText = (({target}, index) => {
        const value = target.value || '';
        console.log(value);

        const newText = text.map((input, i) => {
            // Wenn index des Eingabefeldes mit Index aus text Array übereinstimmt,
            // dann wird da ein neuer Wert zugeordnet, ansonst bleibt der vormalige
            // input bestehen
            return (index === i) ? value : input;
        });
        setText(newText);
        console.log(newText);
    })

    // Macht aus einem Object einen Query Parameter, den ich dann in POST API URL einsetzen kann
    const objectToQueryParam = (obj) => {
        // 1. Object.entries returns an arr of key/values of the properties of an object
        // 2. ich mappe dann über den arr, der ja aus [key, value] Elementen besteht
        // 3. map method macht daraus ein string, was ich so für POST API URL brauche
        const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
        // 4. join method verkettet alle Elemente des arr in einem String und trennt jedes Element mit &
        return '?' + params.join('&');
    };

    const generateMeme = (e) => {
        e.preventDefault();
        const params = {
            // with env. is not working - why?
            // username: process.env.REACT_APP_USERNAME,
            // password: process.env.REACT_APP_PASSWORD,
            username: 'MatchuPitchu',
            password: 'wbs_2021',
            template_id: imgID
        }

        // for of Loop; ist syntethic suggar, d.h. hier brauche ich keinen counter
        for (let textfield of text) {
          if (!textfield) return alert('Fill in all text fields.');
        }

        // Array of content of the textfields
        const textArr = text.map((t, index) => `boxes[${index}][text]=${t}`).join('&');

        // I create meme with POST with API
        const createMeme = async () => {
            // for this API, I use URL Params, also füge ich alles in URL ein, statt 
            // "body: JSON.stringify(params)" als 2. parameter in fetch function einzufügen
            const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}&${textArr}`
            );
            const json = await response.json();
            console.log(json);
            setMemeURL(json.data.url);
            setMemePageURL(json.data.page_url);
        }
        createMeme();
    }

    const shareMeme = () => {
        saveAs(memePageURL, `meme_${Date.now()}.jpg`);
    };


    if (loading)
        return <Spinner />;

    if (error)
        return <div>Sorry for the inconvenience, but there was an error retrieving the data: {error}</div>;

    if (memeURL)
        return (
            <div>
                <div className="row justify-content-around mt-3 mb-3">
                    <button className="col-auto btn-meme" onClick={shareMeme}>Share meme</button>
                </div>
                <img src={memeURL} alt={`meme ${img.name}`}/>
            </div>
        );

    return (
        <div>
            <h2 className="mt-3">Creation time</h2>
            <p className="fst-italic mb-3">Type in your appropriate text</p>
            {/* Hier erstelle ich Array mit sovielen Elementen, wie img.box_count aus API vorgibt */}
            {text.map((item, index) => {
            return (
                <div key={index} className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">{index + 1}</span>
                    <input 
                        type="text"
                        className="form-control textfield"
                        aria-label="caption"
                        value={item} 
                        onChange={(event) => updateText(event, index)} />
                </div>
                )
            }
            )}
            <form onSubmit={generateMeme} className="row justify-content-around mb-3">
                <button type="submit" className="col-auto btn-meme">Generate meme</button>
            </form>
            <img src={img.url} className="img-fluid" alt={img.name}/>
        </div>
    );
}

export default Image;
