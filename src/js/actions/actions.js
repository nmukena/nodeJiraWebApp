import axios from 'axios';

var API_SERVER = "http://localhost:3000";

export function getIssue(issueId){
    return function(dispatch){
        axios.get(API_SERVER+"/getIssue/"+issueId)
        .then((response)=>{
            dispatch({type: "GET_ISSUE_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "GET_ISSUE_REJECTED", error: err})
        })
    }
}

export function getAllIssues(projectId){
    return function(dispatch){
        axios.get(API_SERVER+"/getAllIssues/"+projectId)
        .then((response)=>{
            dispatch({type: "GET_ALL_ISSUES_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "GET_ALL_ISSUES_REJECTED", error: err})
        })
    }
}

export function getAllRapidViews(){
    return function(dispatch){
        axios.get(API_SERVER+"/getSprints/"+rapidViewId)
        .then((response)=>{
            dispatch({type: "GET_ALL_SPRINTS_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "GET_ALL_SPRINTS_REJECTED", error: err})
        })
    }
}

export function getAllSprints(rapidViewId){
    return function(dispatch){
        axios.get(API_SERVER+"/getSprints/"+rapidViewId)
        .then((response)=>{
            dispatch({type: "GET_ALL_SPRINTS_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "GET_ALL_SPRINTS_REJECTED", error: err})
        })
    }
}