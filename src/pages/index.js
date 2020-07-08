import React from "react"
import { Link } from 'gatsby';

import Layout from '../components/layout';
import '../styles/styles.scss'
import Head from '../components/head'

const IndexPage = () => {
  return (
    <Layout>
      <Head title='Home' />
      <h1>Hello,</h1>
      <h2>I'm Andrew, junior Front-END developer living in Ukraine</h2>
      <p>Need a developer? <Link to="/contact">Conctact me</Link></p>
    </Layout>
  )
}

export default IndexPage
