import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Head from '../components/head'


const AboutPage = () => {
  return (
    <Layout>
      <Head title='Карта' />
      <Link to="/contact">Контакты</Link>
    </Layout>
  )
}

export default AboutPage