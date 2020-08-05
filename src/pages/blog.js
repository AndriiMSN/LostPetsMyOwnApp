import React, { Component } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Map from '../components/map'
import Layout from '../components/layout';
import blogStyles from './blog.module.scss'
import Head from '../components/head'



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
					location{lat, lon}
					image{file{url}}
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
      <ol className={blogStyles.posts}>
        {
          data.allContentfulBlogPost.edges.map((edge) => {
            return (
              <li>
                <Link to={`/blog/${edge.node.slug}`}>
                  <div style={(edge.node.image) ? ({ backgroundImage: `url("${edge.node.image.file.url}")` }) : ({ backgroundImage: `url("https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.jpg")` })}>
                    <h2>
                      {edge.node.title}
                    </h2>
                    <p>
                      {edge.node.publishedDate}
                    </p>
                  </div>
                </Link>
                <Map lat={edge.node.location.lat} lon={edge.node.location.lon} />
              </li>
            )
          })
        }
      </ol>
    </Layout >
  )
}

export default BlogPage