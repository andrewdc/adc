import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
// import { config } from 'config'
import './style.css'
import '../../static/fonts/fontawesome/style.css'
import './_sitelinks.scss'

class SiteLinks extends React.Component {
    render() {

        return (
            <div className='blog-social'>
              <ul>
                <li>
                  <a href={ config.siteInstagram }><i className='fa fa-instagram'></i></a>
                </li>
                <li>
                  <a href={ config.siteDribbbleUrl }><i className='fa fa-dribbble'></i></a>
                </li>
                <li>
                  <a href={ config.siteLinkedin }><i className='fa fa-linkedin'></i></a>
                </li>
                <li>
                  <a href={ config.siteGithubUrl }><i className='fa fa-github-alt'></i></a>
                </li>
                <li>
                  <a href={ config.siteTwitterUrl }><i className='fa fa-twitter'></i></a>
                </li>
              </ul>
        
            </div>
            );
    }
}

export default SiteLinks
