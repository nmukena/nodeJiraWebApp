import axios from 'axios';
import api_server from '../API_SERVER';

var API_SERVER = api_server();
//var API_SERVER = 'http://18.221.174.71:3000';

//Manage the API calls, and avoid multiple requests for the same information
//Remember all 

/**--------------------------------------------------------------------------------------------------------
 * SETUP ACTIONS
----------------------------------------------------------------------------------------------------------*/
/**
 * Requests server to set/update the current Jira instance credentials (Username and Password).
 * @param {*} user Jira instance Username
 * @param {*} pass Jira instance Password
 */
export function setCredentials(user, pass){
    return function(dispatch){
        axios.get(API_SERVER+"/setCredentials/"+user+"/"+pass)
        .then((response)=>{
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

/**
 * Requests server to set/update the current Jira instance URL, The current Project,
 * and the current Scrum Team and Target Completion Date custom fields.
 * Receives back the saved Team Capacities record saved in the DB.
 * Triggers "LOAD_CAPACITY" action along with received Team Capacities record that notifies
 * reducers to store the record OR Triggers action that notifies reducers of the error.
 * Triggers "CHANGE_CUSTOMFIELDS" action along with current Scrum Team and Target Completion
 * Date custom fields that notifies reducers to set/update that current custom field values.
 * 
 * This function really should not do so much. Need to shorten it later.
 * 
 * @param {*} url The current Jira instance URL.
 * @param {*} projectId The current Project ID.
 * @param {*} target_completion The current Scrum Team custom field.
 * @param {*} scrum_team The current Target Completion Date custom field.
 */
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

/**
 * Triggers an action that notifies reducers to update the current Project.
 * @param {string} projectId The ID of the current Project.
 */
export function setProject(projectId){
    return function(dispatch){
        dispatch({type: "SET_PROJECT", id: projectId})
    }
}

/**
 * Triggers an action that notifies reducers to store a Capacity entry for a specific Team 
 * during a specific Target Completion Date.
 * @param {string} team The specific Team name.
 * @param {string} target The Specific Target Completion Date.
 * @param {string} capacity The Capacity entry.
 */
export function setTeamCapacities(team, target, capacity){
    return function(dispatch){
        dispatch({type:"ENTER_TEAM_CAPACITY", team: team, target: target, capacity: capacity})
    }
}

/**--------------------------------------------------------------------------------------------------------
 * REQUEST ACTIONS
----------------------------------------------------------------------------------------------------------*/

/**
 * Requests details of one specific Epic. 
 * Triggers an action containing the response.
 * @param {string} epicId The ID of the requested Epic.
 */
export function getEpic(epicId){
    //Get Epics - http://localhost:3000/getEpic/GTMP-36
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

/**
 * Requests the list of all Epics in one specific Project.
 * Triggers an action containing the response.
 * @param {string} projectId The ID of the specific Project.
 */
export function getAllEpics(projectId){
    //Get All Epics - http://localhost:3000/getAllEpics/10102
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

/**
 * Requests one specific Story within one specified Epic.
 * Triggers an action containing the response.
 * @param {string} storyId The ID of the requested Story.
 * @param {string} epic The ID of the specified Epic.
 */
export function getStory(storyId, epic){
    //Get Individual Story - http://localhost:3000/getStory/GTMP-12
    return function(dispatch){
        dispatch({type: "GET_STORY", id: storyId})
        axios.get(API_SERVER+"/getStory/"+storyId)
        .then((response)=>{
            dispatch({type: "GET_STORY_SUCCESS", id: storyId, json: response.data, epicId: epic})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

/**
 * Requests all the stories in one specific Epic.
 * @param {string} epicId The ID of the specific Epic.
 */
export function getStoriesByEpic(epicId){
    //Get Stories by Epic http://localhost:3000/getStoriesByEpic/GTMP-19
    return function(dispatch){
        dispatch({type: "GET_STORIES_EPIC", id: epicId})
        axios.get(API_SERVER+"/getStoriesByEpic/"+epicId)
        .then((response)=>{
            dispatch({type: "GET_STORIES_EPIC_SUCCESS", id: epicId, json: response.data})
        }).catch((err)=>{
            dispatch({type: "GET_STORIES_EPIC_ERROR", code: err.response.status, text: err.response.statusText})
        })
    }
}

/**--------------------------------------------------------------------------------------------------------
 * VIEW CHANGE ACTIONS
----------------------------------------------------------------------------------------------------------*/

/**
 * Triggers action that notifies reducers to display Stories of a specific Epic
 * @param {string} epicId The ID of the specific Epic.
 */
export function displayStories(epicId){
    return function(dispatch){
        dispatch({type: "DISPLAY_STORIES", epicView: epicId})
    }
}

/**
 * Triggers action that notifies reducers to display all Epics of a specific Project
 * @param {string} project The ID of the specific Project.
 */
export function displayEpics(project){
    return function(dispatch){
        dispatch({type: "DISPLAY_EPICS", projectId: project})
    }
}

/**
 * Triggers action that notifies reducers to display the Index.
 */
export function displayIndex(){
    return function(dispatch){
        dispatch({type: "DISPLAY_INDEX"})
    }
}

/**
 * Triggers action that notifies reducers to display team capacities configuration page.
 */
export function configureCapacity(){
    return function(dispatch){
        dispatch({type: "CAPACITY_CONFIG"})
    }
}


/**--------------------------------------------------------------------------------------------------------
 * DATABASE ACTIONS
----------------------------------------------------------------------------------------------------------*/

/**
 * Loads team capacities associated to a specific Project from the database.
 * Triggers action with the JSON object from the response or the error message.
 * @param {string} url The Jira instance URL.
 * @param {string} projectId The ID of the specific Project.
 */
export function loadCapacity(url, projectId){
    return function(dispatch){
        axios.get(API_SERVER+"/loadCapacity/"+url+"/"+projectId)
        .then((response)=>{
            dispatch({type:"LOAD_CAPACITY", capacity: response.data})
        }).catch((err)=>{
            dispatch({type: "ERROR", error: err})
        })
    }
}

/**
 * Saves the Team Capacities in the database.
 * @param {Object} state The state containing the Team Capacity record.
 */
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