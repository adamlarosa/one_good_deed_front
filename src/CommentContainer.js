import React, { Component, Fragment } from 'react'
import DrawComments from './DrawComments'
import WriteComment from './WriteComment'

class CommentContainer extends Component {
    render() {
        return (
            <Fragment>
                {this.props.showComments ? 
                    <DrawComments caseId={this.props.caseId}/> 
                :
                    <WriteComment addComment={this.props.addComment} caseId={this.props.caseId}/>
                }
            </Fragment>
        )
    }
}
export default CommentContainer