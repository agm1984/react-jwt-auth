import React, { Component } from 'react'
import { connect } from 'react-redux'

class HeaderBar extends Component {
    render() {
        return (
            <div>asdf</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps)(HeaderBar)