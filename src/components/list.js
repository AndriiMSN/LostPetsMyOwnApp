import React, { Component } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Post from './post';
import blogStyles from '../pages/Styles/blog.module.scss'

const List = ({ breed, city }) => {
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
  // console.log(JSON.stringify(data));
  { console.log(city) }
  return (
    <ol className={blogStyles.posts}>
      {
        data.allContentfulBlogPost.edges.map((edge) => {
          return (
            <Post edge={edge} breed={breed} city={city} />
          )
        })
      }
    </ol>

  )
}

export default List