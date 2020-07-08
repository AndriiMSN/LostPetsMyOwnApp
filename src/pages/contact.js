import React from 'react';

import Layout from '../components/layout';
import Head from '../components/head'

const ContactPage = () => {
  return (
    <Layout>
      <Head title='Contact' />
      <h1>Contact</h1>
      <p>My contact <a rel="noreferrer" href="https://www.google.com/" target="_blank">Facebook</a></p>
    </Layout>
  )
}

export default ContactPage