import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions.js";

@connect((store)=>{
        return {
            data: store.json,
        };
    })


export default class Layout extends React.Component {
    
    componentWillMount(){
        this.props.dispatch(actions.getAllIssues("GTMP"))
    }

    render(){
        return <h1>{this.props.data}</h1>;
    };
}