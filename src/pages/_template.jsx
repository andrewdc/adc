import React from 'react'
import { Link } from 'gatsby-link'
import { prefixLink } from 'gatsby-helpers'
// import { config } from 'config'

import '../static/css/reset.css'
import '../static/css/base.css'
import '../static/css/typography.css'
import '../static/css/app.scss'

class Template extends React.Component {
    render() {
        const {location, children} = this.props

        return (
            <div className='wrapper'>
              { children }
            </div>
            );
    }
}

Template.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
    route: React.PropTypes.object,
}

export default Template
