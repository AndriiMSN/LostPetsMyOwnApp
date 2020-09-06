import React, { Component, useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { createStore, combineReducers, Middleware, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'


import Layout from '../components/layout';
import List from '../components/list'
import Head from '../components/head'
import WithCallbacks from '../components/Search-panel';


// const mathReducer = (state = {
//   result: 1,
//   lastvalue: []
// }, action) => {
//   switch (action.type) {
//     case "Select":
//       state = {
//         ...state,
//         result: state.result + action.payload,
//         lastvalue: [...state.lastvalue, action.payload]
//       }
//       break;
//     case "Another":
//       state = {
//         ...state,
//         result: state.result - action.payload,
//         lastvalue: [...state.lastvalue, action.payload]
//       }
//       break;
//   }
//   return state
// }

// const userReducer = (state = {
//   username: "Andrii", age: 22
// }, action) => {
//   switch (action.type) {
//     case "SET_NAME":
//       state = {
//         ...state,
//         name: action.payload
//       }
//       break;
//     case "SET_AGE":
//       state = {
//         ...state,
//         age: action.payload
//       }
//       break;
//   }
//   return state
// }

// const myLogger = (store) => (next) => (action) => {
//   console.log("Logged Action", action);
//   next(action)
// }

// const store = createStore(
//   combineReducers({ math: mathReducer, user: userReducer }),
//   {},
//   applyMiddleware(myLogger, logger)
// )

// store.subscribe(() => {
//   console.log("Store updated", store.getState());
// })

// store.dispatch({
//   type: "Select",
//   payload: 50
// })

// store.dispatch({
//   type: "Another",
//   payload: 100
// })

// store.dispatch({
//   type: "SET_AGE",
//   payload: 5
// })



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
  const breeds = []
  const region = /place/
  data.allContentfulBlogPost.edges.forEach(async (edge) => {
    await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${edge.node.location.lon},${edge.node.location.lat}.json?access_token=${token}`)
      .then(response => response.json())
      .then(json => options.push({
        value: json.features.find(place => place.id.match(region)).text,
        label: json.features.find(place => place.id.match(region)).text
      }))
    options.sort(compare)
    breeds.push({
      value: edge.node.breed,
      label: edge.node.breed
    })
  }
  )
  const [breed, setBreed] = useState("")
  const [city, setCity] = useState("")


  return (
    <Layout>
      <Head title='Blog' />
      <h1>lost pets</h1>
      {console.log(options)}
      <WithCallbacks options={options} title='город' selectCity={(hadleCity) => setCity(hadleCity)}
      />
      <WithCallbacks options={breeds.sort(compare)} title='породу'
        selectBreed={(hadleBreed) => setBreed(hadleBreed)} />
      <List breed={breed} city={city} />
    </Layout >
  )
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     math: state.math
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setName: (name) => {
//       dispatch({
//         type: "SET_NAME",
//         payload: name
//       })
//     }
//   }
// }

export default BlogPage







