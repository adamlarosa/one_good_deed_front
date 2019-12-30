import React, { Component } from 'react'

class WriteComment extends Component {
    constructor() {
        super();
        this.state = {
            content: null
        }
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitForm = (e) => {
        let token = localStorage.getItem('token');
        e.preventDefault();
        fetch(`http://localhost:3001/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                comment: {
                    case_id: this.props.caseId, 
                    content: this.state.content
                }
            })
        })
        .then(this.props.addComment())        
    }

    render() {
        return (
            <div>
                <br/>
                <form>
                    <label>
                        <textarea 
                            onChange={(e) => this.inputChange(e)} 
                            type="text" 
                            name="content"
                            rows="5" cols="33"
                        />
                    </label><br />
                   
                    <input 
                        onClick={(e) => this.submitForm(e)} 
                        type="submit" 
                        value="SUBMIT" 
                    />
                </form>
            </div>
        )
    }
}
export default WriteComment