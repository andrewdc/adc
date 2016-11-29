import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import './style.css'
import './_nav.scss'

class SiteNav extends React.Component {
    render() {
        const {location} = this.props
        return (
            <nav className='blog-nav'>
              <ul>
                <li>
                  <Link to={prefixLink('/design/')} className={ location.pathname === prefixLink('./design/') ? "current" : null }> Design and Development Work
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/illustration/')} className={ location.pathname === prefixLink('./illustration/') ? "current" : null }> Illustration
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/')} className={ location.pathname === prefixLink('/') ? "current" : null }> Articles
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/about/')} className={ location.pathname === prefixLink('./about/') ? "current" : null }> About me
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/contact/')} className={ location.pathname === prefixLink('./contact/') ? "current" : null }> Contact me
                  </Link>
                </li>
              </ul>
            </nav>
            );
    }
}

SiteNav.propTypes = {
    location: React.PropTypes.object,
}

export default SiteNav
