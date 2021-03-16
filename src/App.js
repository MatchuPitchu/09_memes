import React, { useState, useEffect, useRef } from 'react';
// library, um auf das fertige Bild aus der DOM zuzugreifen
// https://github.com/tsayen/dom-to-image
import domtoimage from 'dom-to-image';
// library, um Bild-Datei zu speichern
import { saveAs } from 'file-saver';
import { Route, Switch } from "react-router";
import './App.css';
import Spinner from './components/Spinner';
import ImagesAll from './components/ImagesAll';
import Image from './components/Image';

// Repo of Jorge as an example: https://github.com/weyvern/meme-generator-workshop
// Video mit Erklärung API POST für imgFlip (https://imgflip.com/api): https://www.youtube.com/watch?v=rtQKP1we-Dk&t=696s

const App = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setTemplates(data.data.memes);
      })
      .catch(err => setError(err));
  }, [])

  const memeToShare = useRef();
  // Hier sehe ich, dass mein Image in Image.js erst zu memeToShare.current wird, 
  // wenn ich das Image mit onClick "Generate Meme"-Button, was shareMeme-Funktion
  // hier drunter auslöst, festgemacht habe
  console.log(memeToShare);
  const shareMeme = async () => {
    const blob = await domtoimage.toBlob(memeToShare.current);
    saveAs(blob, `meme_${Date.now()}`);
  };

  if(!loading) console.log(templates);

  if(loading)
    return <Spinner />;

  if (error)
    return <div>Sorry for the inconvenience, but there was an error retrieving the data: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Create your own memes</h1>
      <Switch>
        <Route path="/:imgID">
            <div className="row bg-light border border-dark mt-4 pb-2">
              <Image ref={memeToShare} shareMeme={shareMeme} />
            </div>
        </Route>
        <Route path="/">
          <div className="row bg-light border border-dark mt-5 mb-5">
            <h2 className="mt-3">Choose your picture</h2>
            <p className="fst-italic mb-3">Click on your desired picture</p>
            {templates && templates.map(template => <ImagesAll key={template.id} data={template} />)
            }
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
