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
  const options = [];
  data.allContentfulBlogPost.edges.map((edge) => {
    options.push(
      {
        value: <Adrress x={edge.node.location.lon} y={edge.node.location.lat} />,
        label: <Adrress x={edge.node.location.lon} y={edge.node.location.lat} />
      })
    console.log(options)
  }
  )
  return (
    <Layout>
      <Head title='Blog' />
      <h1>lost pets</h1>
      {}
      <WithCallbacks options={options} />
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