import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router";
import { Link } from 'react-router-dom';
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
    <div className="container mt-5">
      <h1>Create your own memes</h1>
      <Switch>
        <Route path="/:imgID">
            <div className="row bg-light border border-dark mt-4 pb-2">
              <h2 className="mt-3">Creation time</h2>
              <p className="fst-italic mb-3">Create your appropriate text</p>
              <Image />
            </div>
        </Route>
        <Route path="/">
          <div className="row bg-light border border-dark mt-5">
            <h2 className="mt-3">Choose your picture</h2>
            <p className="fst-italic mb-3">Click on your desired picture</p>
            {memes && memes.map(img => <ImagesAll key={img.id} data={img} />)
            }
          </div>
        </Route>
      </Switch>
      <div className="text-center linkToHome">
            <Link to={'/'} className="btn-back">Restart your creation</Link>
      </div>
    </div>
  );
}

export default App;
