/**
 * Epics Reducer
 * Reducer responsible for maintaining the epics Sub-state.
 */

/**
  * The epics sub-state
*/
var store = {
    projectId:"",
    epicByTeam: {}, //Stores epics team by target completions. E.g. epicByTeam["Team A"]["Sprint 3 - Week 2"]
    TARGET_COMPLETION_FIELD: "",
    SCRUM_TEAM_FIELD: "",
    targetByTeam: {}, // Stores target completions where a teams have deliverables
    target_completions : [], // List of all the target completions
    epics: {}, // Associated array containing epics and their details. E.g. epics["GTMP-1"] holds details of GTMP-1.
    allEpics: {}, // JSON object received from "GET_ALL_EPICS_SUCCESS" action.
    fetching: false,
    fetched: true,
    error: null,
    }

/**
 * Reducer. Listens to Actions. Responds to specified Action by creating and returning a new State
 * with modified information.
 * @param {Object} state Current State
 * @param {Object} action Last Triggered Action
*/
export default function reducer(state=store, action){
    switch (action.type){
        case "DISPLAY_INDEX":{
            // When the the user goes back to the index clear all the epics
            return {
                projectId:"",
                epicByTeam: {},
                TARGET_COMPLETION_FIELD: "",
                SCRUM_TEAM_FIELD: "",
                targetByTeam: {},
                target_completions : [],
                epics: {},
                allEpics: {},
                fetching: false,
                fetched: true,
                error: null,
            }
        }

        case "CHANGE_CUSTOMFIELDS":{
            return {...state, TARGET_COMPLETION_FIELD: action.target, SCRUM_TEAM_FIELD: action.team}
        }

        case "DISPLAY_EPICS":{
            return {...state, fetching: true, fetched: false, projectId: action.projectId}
        }

        case "GET_ALL_EPICS_SUCCESS":{
            return {...state, fetching: true, fetched: false, allEpics: action.json}
        }

        case "SET_PROJECT":{
            return {...state, projectId: action.id}
        }

        case "GET_EPIC_SUCCESS":{
            if (state.fetching&&state.projectId==action.payload.data.issues[0].fields.project.key){ //Check the epic belongs to the current project
                if(!state.epics[action.meta]){
                    var team = "No Team Assigned"
                    if(action.payload.data.issues[0].fields[state.SCRUM_TEAM_FIELD]){
                        var team = action.payload.data.issues[0].fields[state.SCRUM_TEAM_FIELD].value
                    }
                    var target = "No Completion Date"
                    if(action.payload.data.issues[0].fields[state.TARGET_COMPLETION_FIELD]){
                        var target = action.payload.data.issues[0].fields[state.TARGET_COMPLETION_FIELD].value
                    }
                    if(!state.target_completions.includes(target)){
                        var target_completions = [...state.target_completions, target]
                    }else{
                        var target_completions = state.target_completions
                    }

                    target_completions.sort()
                    var list = {}
                    var epicsTarget = []
                    if (state.epicByTeam[team]){
                        var list = state.epicByTeam[team]
                        if (state.epicByTeam[team][target]){
                            var epicsTarget = state.epicByTeam[team][target]
                        }
                    }
                    var targets = []
                    if (state.targetByTeam[team]){
                        var targets = state.targetByTeam[team]
                    }
                    //console.log(team);
                    return {...state, epics: {...state.epics, [action.meta]: action.payload.data},
                                epicByTeam: {...state.epicByTeam, [team]:{...list, [target]: [...epicsTarget, action.payload.data]}}, target_completions: target_completions,
                                targetByTeam: {...state.targetByTeam, [team]:[...targets, target]}
                    }
                }
            }
            return {...state}
        }
    }
    return state;
}
