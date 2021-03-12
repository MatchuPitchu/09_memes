import React, { useState, useEffect } from 'react';
import React from 'react';
import './App.css';

const App = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.imgflip.com/get_memes')
      .then(res => console.log(res))

  }, [])


  return (
    <div>
      Test
    </div>
  );
}

export default App;
