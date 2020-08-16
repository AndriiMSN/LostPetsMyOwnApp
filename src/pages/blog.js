import React, { Component } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import blogStyles from './Styles/blog.module.scss'
import Head from '../components/head'
import Adrress from '../components/Map/ftechAdrress'



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
  return (
    <Layout>
      <Head title='Blog' />
      <h1>Blog</h1>
      <form action="">
        <label for="cities">Choose a city:</label>
        <select name="cities" id="cities">
          {data.allContentfulBlogPost.edges.map((edge) => {
            return (
              <option value=""><Adrress x={edge.node.location.lon} y={edge.node.location.lat} /></option>
            )
          }
          )}
        </select>
        <br /><br />
        <input type="submit" value="Submit" />
      </form>
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