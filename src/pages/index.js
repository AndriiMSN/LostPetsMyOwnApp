import React from "react"
import { Link } from 'gatsby';

import Layout from '../components/layout';
import '../styles/styles.scss'
import Head from '../components/head'

const IndexPage = () => {
  return (
    <Layout>
      <Head title='Home' />
      <h1>Всем привет,</h1>
      <h2>Нашли или потеряли своего питомца </h2><p><Link to="/contact">Напишите нам</Link></p>
    </Layout>
  )
}

export default IndexPage
