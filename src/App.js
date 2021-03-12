import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router";
import './App.css';
import Spinner from './components/Spinner';
import ImagesAll from './components/ImagesAll';
import Image from './components/Image';
import Input from './components/Input';

const App = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setMemes(data.data.memes);
      })
      .catch(err => setError(err));
  }, [])

  if(!loading) console.log(memes);

  if(loading)
    return <Spinner />;

  if (error)
    return <div>Sorry for the inconvenience, but there was an error retrieving the data: {error}</div>;

  return (
    <div className="container">
      <h1>Create your own memes</h1>
      <Route>
        <Input />
      </Route>
      <Route>
        <Image />
      </Route>
      <Route path="/">
        <div className="row">
        {memes && memes.map(img => (
          <ImagesAll key={img.id} data={img} />
          ))
        }
        </div>
      </Route>
    </div>
  );
}

export default App;
