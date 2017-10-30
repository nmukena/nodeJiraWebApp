import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions/actions.js";

import '../App.css';
import Header from "./Header";
import Epic from "./Epic";
import Footer from "./Footer";

@connect((store)=>{
    return {
        data: store.json,
    };
})

export default class Layout extends React.Component {

    getAllIssuesFunc(id){
        this.props.dispatch(actions.getAllIssues(id))
    }

    componentWillMount(){
        this.props.dispatch(actions.getAllIssues("GTMP"))
    }

    render(){

        if (!this.props.data){
            return <button onClick={this.getAllIssuesFunc("GTMP").bind(this)}>Get Issues</button>
        }


        const listIssues = this.props.data.issues.
        map((issue, i) =>
        <div className="epic-details" key={issue.key}>
            <article>
                <h2>Issue {issue.key}</h2>
                <h3>Description: {issue.fields.summary}</h3>
                <p>Status: {issue.fields.status.name} </p>
            </article>
        </div>)

        return(

        <div>
            <div>
                <Header />
            </div>
            <div>
                <Epic />
            </div>
{/*            <div>          
                <ul>{ listIssues }</ul>
            </div>*/}
            <div>
                <Footer />
            </div>
        </div>
        );
    };
}
