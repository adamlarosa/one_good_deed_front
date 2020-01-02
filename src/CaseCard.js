import React, { Component } from 'react'
import CommentContainer from './CommentContainer.js'

class CaseCard extends Component {
    constructor() {
        super();
        this.state = {
            showComments: true
        }
    }

    addComment = () => {
        this.setState({showComments: !this.state.showComments})
    }

    deleteCase = () => {
        const { id } = this.props.info
        let token = localStorage.getItem('token');
        fetch(`http://localhost:3001/cases/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        this.props.deleteCase(id)
    }

    render() {
        const {id, fullname, location, description} = this.props.info
        return (
            <div id={id} className='caseCard'>
                <div className='caseInfo'>
                    <b>{fullname}</b> <br />
                    <b>Location:</b>  {location} <br />
                    <b>Description:</b> {description}
                </div>

                <div className='addCommentBtn' >
                    <button onClick={this.addComment}>
                        {this.state.showComments ?
                            'ADD COMMENT'
                        :
                            'GO BACK'
                        }
                    </button>
                </div><br/>

                <div className='commentSection' >
                    <CommentContainer 
                        caseId={id} 
                        showComments={this.state.showComments}
                        addComment={this.addComment}
                    />
                </div>

                <button onClick={this.deleteCase}>
                    DELETE CASE
                </button>

            </div>
        )
    }
}
export default CaseCard