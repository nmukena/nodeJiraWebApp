import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import store from "../store.js"

import '../../App.css';
import Header from "./Header";
import AllEpics from "./AllEpics";
import AllStoriesByEpic from "./AllStoriesByEpic";
import Footer from "./Footer";

@connect((store)=>{
    return {
        data: store,
    };
})

export default class Layout extends React.Component {

    constructor(props){
        super(props)
    }
    
    displayEpics(){
        this.props.dispatch(actions.displayEpics())
    }

    render(){
        if(this.props.data.view=="Epics"){
            return(
                <div>
                    <div>
                        <Header />
                    </div>
                    <div>
                        <AllEpics projectId = {"GTMP"}/>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            );
        }else if(this.props.data.view=="Stories"){
            return(
                <div>
                    <div>
                        <Header />
                    </div>
                    <div>
                        <AllStoriesByEpic epicId = {this.props.data.epicView}/>
                        <button onClick={()=>this.displayEpics()}>
                                Back to Epics!
                        </button>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            );
        }
    };
}
