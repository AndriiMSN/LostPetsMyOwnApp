import React, { Component } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Select from 'react-select';


import Layout from '../components/layout';
import blogStyles from './Styles/blog.module.scss'
import Head from '../components/head'
import Adrress from '../components/Map/ftechAdrress'
import WithCallbacks from '../components/Search-panel';



const BlogPage = () => {
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
  console.log(data);
  function compare(a, b) {
    if (a.value < b.value)
      return -1;
    if (a.value > b.value)
      return 1;
    return 0;
  }
  const token = 'pk.eyJ1IjoiYW5kcmlpbXNuIiwiYSI6ImNrZGYzZ200YTJudXQyeHNjMjk2OTk2bjUifQ.njqMX6x6U946yjJdWwA7mA';
  const options = []
  const region = /place/
  data.allContentfulBlogPost.edges.forEach(async (edge) => {
    await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${edge.node.location.lon},${edge.node.location.lat}.json?access_token=${token}`)
      .then(response => response.json())
      .then(json => options.push({
        value: json.features.find(place => place.id.match(region)).text,
        label: json.features.find(place => place.id.match(region)).text
      }))
    options.sort(compare)
  }
  )
  return (
    <Layout>
      <Head title='Blog' />
      <h1>lost pets</h1>
      {console.log(options)}
      <WithCallbacks options={options.sort(compare)} />
      <ol className={blogStyles.posts}>
        {
          data.allContentfulBlogPost.edges.map((edge) => {
            return (

              <li>
                <Link to={`/blog/${edge.node.slug}`}>
                  <div style={{ backgroundColor: "pink" }} style={(edge.node.image) ? ({ backgroundImage: `url("${edge.node.image.file.url}")` }) : ({ backgroundImage: `url("https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.jpg")` })}>
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
                    <p>city: <Adrress x={edge.node.location.lon} y={edge.node.location.lat} /></p>
                  </div>
                </Link>

              </li>
            )
          })
        }
      </ol>
    </Layout >
  )
}

export default BlogPage