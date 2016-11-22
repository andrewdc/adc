import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import SitePost from '../components/SitePost'
import SiteSidebar from '../components/SiteSidebar'

class SiteIndex extends React.Component {
    render() {
        const pageLinks = []
        // Sort pages.
        const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
        ).reverse()
        sortedPages.forEach((page) => {
            if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post') {
                const title = access(page, 'data.title') || page.path
                const description = access(page, 'data.description')
                const datePublished = access(page, 'data.date')
                const category = access(page, 'data.category')

                pageLinks.push(
                    <div className='blog-post'>
                      
                      <h2><Link style={ {    borderBottom: 'none',} } to={ prefixLink(page.path) } > { title } </Link></h2>
                      <p dangerouslySetInnerHTML={ {    __html: description} } />
                      <Link className='readmore' to={ prefixLink(page.path) }> Read
                      </Link>
                    </div>
                )
            }
        })

        return (
            <DocumentTitle title={ config.siteTitle }>
              <div>
                <div className="mast" style={{backgroundImage:'url(./about/homeMast.jpeg)'}}></div>
                <SiteSidebar {...this.props}/>
                <div className='content'>
                  <div className='main'>
                    <div className='main-inner'>
                      <div className='featured-work grid'>
                        <a href={prefixLink('/illustration/len/')}>
                          <img src='./feat-lonelylenny.png' />
                        </a>
                        <a href={prefixLink('/design/')}>
                          <img src='./feat-pds.png' />
                        </a>
                      </div>
                      <h2 className="recent-header"><span>Recent Articles</span></h2>
                      { pageLinks }
                    </div>
                  </div>
                </div>
              </div>
            </DocumentTitle>
        )
    }
}

SiteIndex.propTypes = {
    route: React.PropTypes.object,
}

export default SiteIndex
