import React from 'react'

export default class Hello extends React.Component {
    render () {
        return <div className='message-box'>
            Hello {this.props.name}
        </div>
    }
}
