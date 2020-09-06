import React, { Component } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Adrress from '../components/Map/ftechAdrress'
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
            <li style={((breed.length == 0 || (breed) == edge.node.breed)) ? {} : { display: "none" }
            }
            // style={
            //   (<Adrress x={edge.node.location.lon} y={edge.node.location.lat} /> == city) ? { color: "green" } : { color: "red" }
            // }
            >
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
                  <p><Adrress x={edge.node.location.lon} y={edge.node.location.lat} /></p>
                </div>
              </Link>

            </li>
          )
        })
      }
    </ol>

  )
}

export default List