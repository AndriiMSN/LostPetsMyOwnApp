import React from 'react';
import { useState } from 'react';
import { Link } from 'gatsby';

import Adrress from '../components/Map/ftechAdrress'
import { useEffect } from 'react';


const Post = ({ edge, breed, city }) => {
  const token = 'pk.eyJ1IjoiYW5kcmlpbXNuIiwiYSI6ImNrZGYzZ200YTJudXQyeHNjMjk2OTk2bjUifQ.njqMX6x6U946yjJdWwA7mA';
  const [adress, setAdress] = useState("")
  useEffect(() => {
    async function getCity() {
      await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${edge.node.location.lon},${edge.node.location.lat}.json?access_token=${token}`)
        .then(response => response.json())
        .then(json => setAdress(json.features.find(place => place.id.match(/place/)).text))
    }
    getCity()
  }, [])
  return (
    <li style={((
      (breed.length == 0
        || ((breed) == edge.node.breed))
      && (city == "" || (adress) == city)
    )) ? {} : { display: "none" }
    }

    // style={
    //   (<Adrress x={edge.node.location.lon} y={edge.node.location.lat} /> == city) ? { color: "green" } : { color: "red" }
    // }
    >
      <Link to={`/blog/${edge.node.slug}`}>
        <div style={
          (edge.node.image) ?
            ({ backgroundImage: `url("${edge.node.image.file.url}")` }) :
            ({
              backgroundImage: `url("https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.jpg")`
            })}>
          <h2>
            {edge.node.title}
          </h2>
          <p>
            {edge.node.publishedDate}
          </p>
          <p>
            Порода: {edge.node.breed}
          </p>
          <p>
            Статус: <span>{(edge.node.find) ? 'Найден' : 'Потерян'}</span>
          </p>
          <p>{adress}</p>
        </div>
      </Link>

    </li>

  )
}

export default Post
