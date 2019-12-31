import React, { Component } from 'react'
import CaseCard from './CaseCard'

class DrawCases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cases: this.props.cases
        }
    }


    render() {
        const { cases } = this.props
        return (
            <div className='caseContainer'>
                { cases.map((c,i) => <CaseCard deleteCase={this.props.deleteCase} key={i} info={c} />) }
            </div>
        )
    }
}
export default DrawCases