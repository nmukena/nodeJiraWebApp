import axios from 'axios';

var API_SERVER = "http://localhost:3000";

export function getIssue(issueId){
    return function(dispatch){
        axios.get(API_SERVER+"/getIssue/"+issueId)
        .then((response)=>{
            dispatch({type: "GET_ISSUE_SUCCESS", id: issueId, json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function getAllIssues(projectId){
    return function(dispatch){
        axios.get(API_SERVER+"/getAllIssues/"+projectId)
        .then((response)=>{
            dispatch({type: "GET_ALL_ISSUES_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function getAllRapidViews(){
    return function(dispatch){
        axios.get(API_SERVER+"/getRapidviews/")
        .then((response)=>{
            dispatch({type: "GET_RAPIDVIEWS_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function getAllSprints(rapidViewId){
    return function(dispatch){
        axios.get(API_SERVER+"/getSprints/"+rapidViewId)
        .then((response)=>{
            dispatch({type: "GET_ALL_SPRINTS_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function getIssuesBySprint(rapidViewId, sprintId){
    return function(dispatch){
        axios.get(API_SERVER+"/getIssuesBySprint/"+rapidViewId+"/"+sprintId)
        .then((response)=>{
            dispatch({type: "GET_ISSUES_SPRINT_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function getAllEpics(projectId){
    return function(dispatch){
        axios.get(API_SERVER+"/getAllEpics/"+projectId)
        .then((response)=>{
            dispatch({type: "GET_ALL_EPICS_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function getIssueByEpic(epicId){
    return function(dispatch){
        axios.get(API_SERVER+"/getIssuesByEpic/"+epicId)
        .then((response)=>{
            dispatch({type: "GET_ISSUES_EPIC_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}