import axios from 'axios';
import api_server from '../API_SERVER';

var API_SERVER = api_server();
//var API_SERVER = 'http://18.221.174.71:3000';

//Manage the API calls, and avoid multiple requests for the same information
//Remember all 

//Get Epics - http://localhost:3000/getEpic/GTMP-36
export function getEpic(epicId){
    return function(dispatch){
        dispatch({type: "GET_EPIC", id: epicId})
        axios.get(API_SERVER+"/getEpic/"+epicId)
        .then((response)=>{
            dispatch({type: "GET_EPIC_SUCCESS", id: epicId, json: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

//Get All Epics - http://localhost:3000/getAllEpics/10102
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

//Get Individual Story - http://localhost:3000/getStory/GTMP-12
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

//Get Stories by Epic http://localhost:3000/getStoriesByEpic/GTMP-19
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

export function configureCapacity(){
    return function(dispatch){
        dispatch({type: "CAPACITY_CONFIG"})
    }
}


export function setCredentials(user, pass){
    return function(dispatch){
        axios.get(API_SERVER+"/setCredentials/"+user+"/"+pass)
        .then((response)=>{
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function setURL(url, projectId, target_completion, scrum_team){
    return function(dispatch){
        axios.get(API_SERVER+"/setURL/"+url+"/"+projectId)
        .then((response)=>{
            dispatch({type:"LOAD_CAPACITY", capacity: response.data})
            axios.get(API_SERVER+"/setCustomFields/"+target_completion+"/"+scrum_team).then((response)=>{
            }).catch((err)=>{
                dispatch({type: "ERROR", error: err})
            })
            dispatch({type: "CHANGE_CUSTOMFIELDS", team: scrum_team, target: target_completion})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

export function setProject(projectId){
    return function(dispatch){
        dispatch({type: "SET_PROJECT", id: projectId})
    }
}

export function setTeamCapacities(team, target, capacity){
    return function(dispatch){
        dispatch({type:"ENTER_TEAM_CAPACITY", team: team, target: target, capacity: capacity})
    }
}

export function logDatabase(state){
    return function(dispatch){
        dispatch({type: "LOG_DATABASE"})
        axios.post(API_SERVER+"/logDatabase/", state)
        .then((response)=>{
            dispatch({type: "LOG_DATABASE_SUCCESS"})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}