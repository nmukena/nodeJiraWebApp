import axios from 'axios';

var API_SERVER = "http://localhost:3000";

export function reRender(){
    return function(dispatch){
        dispatch({type: "RE-RENDER"})
    }
}

export function getEpic(epicId){
    return function(dispatch){
        axios.get(API_SERVER+"/getEpic/"+epicId)
        .then((response)=>{
            dispatch({type: "GET_EPIC_SUCCESS", id: epicId, json: response.data})
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

export function getStory(storyId){
    return function(dispatch){
        axios.get(API_SERVER+"/getStory/"+storyId)
        .then((response)=>{
            dispatch({type: "GET_STORY_SUCCESS", id: storyId, json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function getStoriesByEpic(epicId){
    return function(dispatch){
        axios.get(API_SERVER+"/getStoriesByEpic/"+epicId)
        .then((response)=>{
            dispatch({type: "GET_STORIES_EPIC_SUCCESS", id: epicId, json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function displayStories(epicId){
    return function(dispatch){
        dispatch({type: "DISPLAY_STORIES", epicView: epicId})
    }
}

export function displayEpics(){
    return function(dispatch){
        dispatch({type: "DISPLAY_EPICS"})
    }
}

/*export function getAllRapidViews(){
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
}*/