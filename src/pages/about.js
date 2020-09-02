import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';


import Layout from '../components/layout';
import Head from '../components/head'
import CitiesMap from '../components/Map/MapTooltips'
import './Styles/about.module.scss'

const AboutPage = () => {
  const data = useStaticQuery(graphql`
  query{
    allContentfulBlogPost(
      sort:{
        fields:publishedDate,
        order:DESC
      }
      filter:{node_locale:{eq:"en-US"}}
    ){
      edges{
        node{
          title
          slug
          publishedDate(formatString:"MMM Do, YYYY")
					image{file{url}}
          location{lat, lon}
          breed
					find
          }
        }
      }
    }
  `)
  // console.log(data);
  const TOKEN = 'pk.eyJ1IjoiYW5kcmlpbXNuIiwiYSI6ImNrZGYzZ200YTJudXQyeHNjMjk2OTk2bjUifQ.njqMX6x6U946yjJdWwA7mA';
  const CITIES = []
  const region = /place/
  data.allContentfulBlogPost.edges.forEach(async (edge) => {
    await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${edge.node.location.lon},${edge.node.location.lat}.json?access_token=${TOKEN}`)
      .then(response => response.json())
      .then(json => CITIES.push({
        city: json.features.find(place => place.id.match(region)).text,
        image: (edge.node.image) ? (`url("https:${edge.node.image.file.url}")`) : (`url("https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.jpg")`),
        latitude: edge.node.location.lat,
        longitude: edge.node.location.lon
      }))
    // console.log(options);
  }
  )
  console.log(CITIES.length)
  return (
    <Layout>
      <Head title='Карта' />
      <CitiesMap cities={CITIES} />
      <Link to="/contact">Контакты</Link>
    </Layout>
  )
}

export default AboutPage