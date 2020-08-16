import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import headerStyles from './Styles/header.module.scss';

const Header = () => {
  const data = useStaticQuery(graphql`
  query {
    site{
      siteMetadata{
        title
      }
    }
  }
  `)
  return (
    <header className={headerStyles.header}>
      <nav>
        <ul className={headerStyles.navList} >
          <li><Link className={headerStyles.link} activeClassName={headerStyles.activeNavItem} to="/">Главная</Link></li>
          <li> <Link className={headerStyles.link} activeClassName={headerStyles.activeNavItem} to="/blog">Вы меня не видели?</Link></li>
          <li><Link className={headerStyles.link} activeClassName={headerStyles.activeNavItem} to="/about">Карта</Link></li>
          <li><Link className={headerStyles.link} activeClassName={headerStyles.activeNavItem} to="/contact">Напишите нам</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header