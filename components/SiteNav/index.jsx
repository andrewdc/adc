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
                  <Link to={prefixLink('/design/')} className={ location.pathname === prefixLink('./design/') ? "current" : null }> Design <span>and Development Work</span>
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
                  <Link to={prefixLink('/about/')} className={ location.pathname === prefixLink('./about/') ? "current" : null }> About <span>me</span>
                  </Link>
                </li>
                <li>
                  <a href="mailto: &#97;&#110;&#100;&#114;&#101;&#119;&#46;&#100;&#101;&#115;&#105;&#103;&#110;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;">Contact me</a>
                
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
