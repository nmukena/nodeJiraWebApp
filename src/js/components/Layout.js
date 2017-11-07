import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import store from "../store.js"

import '../../App.css';
import Header from "./Header";
import AllEpics from "./AllEpics";
import Footer from "./Footer";

@connect((store)=>{
    return {
        data: store,
    };
})

export default class Layout extends React.Component {

    render(){
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
};
}
