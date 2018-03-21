import axios from 'axios';
import api_server from '../API_SERVER';

var API_SERVER = api_server();
//var API_SERVER = 'http://18.221.174.71:3000';

//Manage the API calls, and avoid multiple requests for the same information
//Remember all

export const GET_ALL_EPICS = "GET_ALL_EPICS";

/**--------------------------------------------------------------------------------------------------------
 * SETUP ACTIONS
----------------------------------------------------------------------------------------------------------*/

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
export function setURL(url, projectId){
  const api_url = API_SERVER+"/setURL/"+url+"/"+projectId;
  const request = axios.get(api_url);

  return{
    type: "LOAD_CAPACITY",
    payload: request
  };
}

export function changeCustomFields(target_completion, scrum_team){
  const url = API_SERVER+"/setCustomFields/"+target_completion+"/"+scrum_team;
  const request = axios.get(url);

  return{
    type: "CHANGE_CUSTOMFIELDS",
    team: scrum_team,
    target: target_completion
  };
}

/**
 * Triggers an action that notifies reducers to update the current Project.
 * @param {string} projectId The ID of the current Project.
 */
export function setProject(projectId){
  return{
    type: "SET_PROJECT",
    id: projectId
  };
}

/**
 * Triggers an action that notifies reducers to store a Capacity entry for a specific Team
 * during a specific Target Completion Date.
 * @param {string} team The specific Team name.
 * @param {string} target The Specific Target Completion Date.
 * @param {string} capacity The Capacity entry.
 */
export function setTeamCapacities(team, target, capacity){
  return{
    type: "ENTER_TEAM_CAPACITY",
     team: team,
     target: target,
     capacity: capacity
  };
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
  return{
    type: "GET_EPIC",
    id: epicId
  };
}

export function getEpicSuccess(epicId){
    //Get Epics - http://localhost:3000/getEpic/GTMP-36
    const url = API_SERVER+"/getEpic/"+epicId;
    const request = axios.get(url);

    return{
      type: "GET_EPIC_SUCCESS",
      payload: request,
      meta: epicId
    };
}

/**
 * Requests the list of all Epics in one specific Project.
 * Triggers an action containing the response.
 * @param {string} projectId The ID of the specific Project.
 */
export function getAllEpics(projectId){
    //Get All Epics - http://localhost:3000/getAllEpics/10102
    return{
      type: "GET_ALL_EPICS"
    };
}

export function getAllEpicsSuccess(data){
    //Get All Epics - http://localhost:3000/getAllEpics/10102
    return{
      type: "GET_ALL_EPICS_SUCCESS",
      json: data
    };
}

export function getAllEpicsError(data1, data2){
    //Get All Epics - http://localhost:3000/getAllEpics/10102
    return{
      type: "GET_ALL_EPICS_ERROR",
      code: data1,
      text: data2
    };

    // return function(dispatch){
    //     dispatch({type: "GET_ALL_EPICS"})
    //     axios.get(API_SERVER+"/getAllEpics/"+projectId)
    //     .then((response)=>{
    //         dispatch({type: "GET_ALL_EPICS_SUCCESS", json: response.data})
    //     }).catch((err)=>{
    //         dispatch({type: "GET_ALL_EPICS_ERROR", code: err.response.status, text: err.response.statusText})
    //     })
    // }
}

/**
 * Requests one specific Story within one specified Epic.
 * Triggers an action containing the response.
 * @param {string} storyId The ID of the requested Story.
 * @param {string} epic The ID of the specified Epic.
 */
export function getStory(storyId){
    //Get Individual Story - http://localhost:3000/getStory/GTMP-12
    return{
      type: "GET_STORY",
      id: storyId
    };
}

export function getStorySuccess(storyId, epic){
    //Get Individual Story - http://localhost:3000/getStory/GTMP-12
    const url = API_SERVER+"/getStory/"+storyId;
    const request = axios.get(url);

    return{
      type: "GET_STORY_SUCCESS",
      payload: request,
      meta: {
        id: storyId,
        epicId: epic
      }
    };
}

/**
 * Requests all the stories in one specific Epic.
 * @param {string} epicId The ID of the specific Epic.
 */
export function getStoriesByEpic(epicId){
    //Get Stories by Epic http://localhost:3000/getStoriesByEpic/GTMP-19
    return{
      type: "GET_STORIES_EPIC",
      id: epicId
    };

    // return function(dispatch){
    //     dispatch({type: "GET_STORIES_EPIC", id: epicId})
    //     axios.get(API_SERVER+"/getStoriesByEpic/"+epicId)
    //     .then((response)=>{
    //         dispatch({type: "GET_STORIES_EPIC_SUCCESS", id: epicId, json: response.data})
    //     }).catch((err)=>{
    //         dispatch({type: "GET_STORIES_EPIC_ERROR", code: err.response.status, text: err.response.statusText})
    //     })
    // }
}

export function getStoriesByEpicSuccess(epicId, data){
  return{
    type: "GET_STORIES_EPIC_SUCCESS",
    id: epicId,
    json: data
  };
}

export function getStoriesByEpicError(data1,data2){
  return{
    type: "GET_STORIES_EPIC_ERROR",
    code: data1,
    text: data2
  };
}

/**--------------------------------------------------------------------------------------------------------
 * VIEW CHANGE ACTIONS
----------------------------------------------------------------------------------------------------------*/

/**
 * Triggers action that notifies reducers to display Stories of a specific Epic
 * @param {string} epicId The ID of the specific Epic.
 */
export function displayStories(epicId){
  return{
    type: "DISPLAY_STORIES",
    epicView: epicId
  };
}

/**
 * Triggers action that notifies reducers to display all Epics of a specific Project
 * @param {string} project The ID of the specific Project.
 */
export function displayEpics(project){
  return{
    type: "DISPLAY_EPICS",
    projectId: project
  };
}

/**
 * Triggers action that notifies reducers to display the Index.
 */
export function displayIndex(){
  return{
    type: "DISPLAY_INDEX"
  };
}

/**
 * Triggers action that notifies reducers to display team capacities configuration page.
 */
export function configureCapacity(){
  return{
    type: "CAPACITY_CONFIG"
  };
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
  const api_url = API_SERVER+"/loadCapacity/"+url+"/"+projectId;
  const request = axios.get(api_url);

  return{
    type:"LOAD_CAPACITY",
    payload: request
  };
}

/**
 * Saves the Team Capacities in the database.
 * @param {Object} state The state containing the Team Capacity record.
 */
export function logDatabase(state){
  return{
    type: "LOG_DATABASE"
  };
}

export function logDatabaseSuccess(state){
  const api_url = API_SERVER+"/logDatabase/";
  const request = axios.post(api_url, state);

  return{
    type: "LOG_DATABASE_SUCCESS"
  };
}
