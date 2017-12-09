import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import store from "../store.js"

import '../../App.css';
import Header from "./Header";
import SprintHeader from "./SprintHeader";
import AllEpics from "./AllEpics";
import AllStoriesByEpic from "./AllStoriesByEpic";
import Footer from "./Footer";
import Index from "./Index"

@connect((store)=>{
    return {
        data: store.views,
        epics: store.epics,
        connection: store.connection
    };
})

export default class Layout extends React.Component {

    constructor(props){
        super(props)
    }
    
    displayEpics(project){
        this.props.dispatch(actions.displayEpics(project))
    }

    render(){
        if (this.props.data.view=="Epics"){
            return(
                <div>
                    <div>
                        <Header />
                    </div>
                    <div className="main-layout">
                        <AllEpics projectId = {this.props.epics.projectId}/>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            );
        }
        if (this.props.data.view=="Stories"){
            return(
                <div>
                    <div>
                        <SprintHeader />
                    </div>
                    <div className="main-layout">
                        <AllStoriesByEpic epicId = {this.props.data.epicView}/>
                        <button className="button-back" onClick={()=>this.displayEpics(this.props.epics.projectId)}>
                                Back to Epics!
                        </button>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            );
        }else if(this.props.data.view=="Index"){
            return(
                <div>
                <div>
                <h1 class="col-12">
                    ProJER
                </h1>
                <h2 class="col-12">
                Welcome to Projer, a Project Management and Planning Tool designed for Jira.
                </h2>
                </div>
                <div>
                    <p>Enter your Jira Project Details:</p>
                    <Index />
                </div>
                </div>
            );
        }
    };
}
