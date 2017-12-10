import axios from 'axios';
import api_server from '../API_SERVER';

var API_SERVER = api_server();
//var API_SERVER = 'http://18.221.174.71:3000';

export function getEpic(epicId){
    return function(dispatch){
        dispatch({type: "GET_EPIC"})
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
        dispatch({type: "GET_ALL_EPICS"})
        axios.get(API_SERVER+"/getAllEpics/"+projectId)
        .then((response)=>{
            dispatch({type: "GET_ALL_EPICS_SUCCESS", json: response.data})
        }).catch((err)=>{
            dispatch({type: "GET_ALL_EPICS_ERROR", code: err.response.status, text: err.response.statusText})
        })
    }
}

export function getStory(storyId, epic){
    return function(dispatch){
        axios.get(API_SERVER+"/getStory/"+storyId)
        .then((response)=>{
            dispatch({type: "GET_STORY_SUCCESS", id: storyId, json: response.data, epicId: epic})
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
            dispatch({type: "GET_STORIES_EPIC_ERROR", code: err.response.status, text: err.response.statusText})
        })
    }
}

export function displayStories(epicId){
    return function(dispatch){
        dispatch({type: "DISPLAY_STORIES", epicView: epicId})
    }
}

export function displayEpics(project){
    return function(dispatch){
        dispatch({type: "DISPLAY_EPICS", projectId: project})
    }
}

export function displayIndex(){
    return function(dispatch){
        dispatch({type: "DISPLAY_INDEX"})
    }
}

export function changeCustomFields(target_completion, scrum_team){
    return function(dispatch){
        axios.get(API_SERVER+"/setCustomFields/"+target_completion+"/"+scrum_team)
        .then((response)=>{
        }).catch((err)=>{
        })
        dispatch({type: "CHANGE_CUSTOMFIELDS", team: scrum_team, target: target_completion})
    }  
}

export function setCredentials(user, pass){
    return function(dispatch){
        axios.get(API_SERVER+"/setCredentials/"+user+"/"+pass)
        .then((response)=>{
        }).catch((err)=>{
        })
    }
}

export function setURL(url){
    return function(dispatch){
        axios.get(API_SERVER+"/setURL/"+url)
        .then((response)=>{
        }).catch((err)=>{
        })
    }
}
