import React from 'react';
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Map from '../components/map'
import Layout from '../components/layout';
import Adrress from '../components/ftechAdrress';




export const query = graphql`
  query($slug: String!){
    contentfulBlogPost(slug:{eq: $slug}){
      title
      publishedDate(formatString:"MMMM Do, YYYY")
      body{
        json
      }
      location{lat, lon}
    }
  }
`

const Blog = (props) => {
  const option = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
      }
    }
  }
  return (
    <Layout>
      <h1>{props.data.contentfulBlogPost.title}</h1>
      <p>{props.data.contentfulBlogPost.publishedDate}</p>
      <Adrress x={props.data.contentfulBlogPost.location.lat} y={props.data.contentfulBlogPost.location.lon} />
      {documentToReactComponents(props.data.contentfulBlogPost.body.json, option)}
      <Map lat={props.data.contentfulBlogPost.location.lat} lon={props.data.contentfulBlogPost.location.lon} />
    </Layout>
  )
}

export default Blog