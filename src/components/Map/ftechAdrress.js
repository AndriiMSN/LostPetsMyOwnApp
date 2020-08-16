import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DataFteching({ x, y }) {
  const [adrress, setAdrress] = useState(null)
  const [loading, setLoading] = useState(true)
  const region = /place/
  useEffect(() => {
    async function FtechData() {
      const token = 'pk.eyJ1IjoiYW5kcmlpbXNuIiwiYSI6ImNrZGYzZ200YTJudXQyeHNjMjk2OTk2bjUifQ.njqMX6x6U946yjJdWwA7mA';
      await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${x},${y}.json?access_token=${token}`)
        .then(res => {
          // console.log(res.data.features.find(place => place.id.match(region)).text)
          setAdrress(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
    FtechData();
  }, [])
  if (loading) return 'Loading...';
  // console.log({ adrress.features.find(place => place.id.match(region)).text })
  return (adrress.features.find(place => place.id.match(region)).text)
}