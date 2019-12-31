import React, { Component, Fragment } from 'react'
class DrawComments extends Component {
    constructor() {
        super();
        this.state = {
            comments: null
        }
    }
    componentDidMount() {
        this.getComments()
    }

    getComments = () => {
        const token = localStorage.getItem('token');
        const SERVER = `http://localhost:3001/comments?caseId=${this.props.caseId}`;
        fetch(SERVER, {
                headers: {
                    'Content-Type': 'application/json',
                    Accepts: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then(json => {
                if (json.comments.length > 0) {
                    let final = []
                    json.comments.map(comment => {
                        final.push(comment.content)
                        return null
                    })
                    this.setState({comments: final})
                }

            })
        ; //end of fetch
    } //end of getComments

    showComments = (comments) => {
        return comments.map((comment, i) => 
            <div key={i}className='comment'>{comment}</div>)
    }

    render() {
        return (
            <Fragment>
                {this.state.comments ? this.showComments(this.state.comments) : null }  
            </Fragment>
        )
    }
}

export default DrawComments