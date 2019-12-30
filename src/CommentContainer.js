import React, { Component } from 'react'
import DrawComments from './DrawComments'
import WriteComment from './WriteComment'

class CommentContainer extends Component {
    render() {
        return (
            <div>
                {this.props.showComments ? 
                    <DrawComments caseId={this.props.caseId}/> 
                :
                    <WriteComment addComment={this.props.addComment}caseId={this.props.caseId}/>
                }
            </div>
        )
    }
}
export default CommentContainer