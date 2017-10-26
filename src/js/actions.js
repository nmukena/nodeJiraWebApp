import axios from 'axios';

export function getIssue(issueId){
    return function(dispatch){
        axios.get("http://localhost:3000/getIssue/"+issueId)
        .then((response)=>{
            dispatch({type: "GET_ISSUE_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "GET_ISSUE_REJECTED", error: err})
        })
    }
}

export function getAllIssues(projectId){
    return function(dispatch){
        axios.get("http://localhost:3000/getAllIssues/"+projectId)
        .then((response)=>{
            dispatch({type: "GET_ALL_ISSUES_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "GET_ALL_ISSUES_REJECTED", error: err})
        })
    }
}