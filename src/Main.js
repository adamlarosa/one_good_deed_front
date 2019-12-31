import React, { Component } from 'react'
import DrawCases from './DrawCases'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            createButton: true,
            fullname: null,
            location: null,
            description: null,
            
        }
    }
    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/')
        }
    }


    //form for new cases
    submitForm = (e) => {
        let token = localStorage.getItem('token');
        e.preventDefault();
        fetch(`http://localhost:3001/cases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                case: {
                    fullname: this.state.fullname, 
                    location: this.state.location, 
                    description: this.state.description
                }
            })
        })
        .then(resp => resp.json())
        .then(json => this.props.addToCases(json.case))
        this.setState({createButton: !this.state.createButton})
    }
    //html for form
    newCase = () => {
        return (
            <div>
                Tell us about your case!
                <form>
                    <label>
                        Name:
                        <input 
                            onChange={(e) => this.inputChange(e)} 
                            type='text' 
                            name='fullname' 
                        />
                    </label>

                    <label>
                        Location:
                        <input 
                            onChange={(e) => this.inputChange(e)} 
                            type='text' 
                            name='location'
                        />
                    </label>

                    <label>
                        About:
                        <textarea 
                            onChange={(e) => this.inputChange(e)} 
                            type='text' 
                            name='description' 
                            rows="5" cols="33"
                        />
                    </label>

                    <input 
                        onClick={(e) => this.submitForm(e)} 
                        type='submit' 
                        value='CREATE NEW CASE'>
                    </input><br />
                </form>
                <button 
                    onClick={() => this.setState({
                        createButton: !this.state.createButton
                    })}
                >
                    Go Back
                </button>
            </div>
        )
    }
    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    drawButton = () => {
        if (this.state.createButton) {
            return <button onClick={() => this.setState({
                createButton: !this.state.createButton})}>
                Create new Case
            </button>
        } 
    }
    // end new case form

    render(){
        // console.log('MAIN! props:',this.props,'STATE',this.state)
        console.log('----------')
        console.log('Main.js', this.props)
        return (
            <div className='main'>
                
                <h1>
                    {this.props.fullname ? 
                        `Welcome ${this.props.fullname.split(' ')[0]}` 
                    :
                        'Welcome!'
                    }
                </h1>

                {this.state.createButton ? 
                    this.drawButton() 
                : 
                    this.newCase()
                }<br/>

                <DrawCases deleteCase={this.props.deleteCase} cases={this.props.cases}/>

            </div>
        )
    }
}
export default Main