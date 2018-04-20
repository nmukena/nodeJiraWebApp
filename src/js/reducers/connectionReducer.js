var store = {
    fetching: false,
    fetched: true,
    unauthorized: false,
    unavailable: false,
    bad_request: false,
}

export default function reducer(state=store, action){
    switch (action.type){

        case "DISPLAY_INDEX":{
            return {
                fetching: false,
                fetched: true,
                unauthorized: false,
                unavailable: false,
                bad_request: false,
            }
        }

        case "DISPLAY_EPICS":{
            return {...state, unauthorized: false, unavailable: false, bad_request: false }
        }

        case "GET_ALL_EPICS":{
            return {...state, fetching: true, fetched: false}
        }

        case "GET_ALL_EPICS_SUCCESS":{
            return {...state, fetched: true, unauthorized: false, fetching: false, unavailable: false}
        }

        case "GET_ALL_EPICS_ERROR":{
            switch (action.code){

                case 401: {
                    return {...state, fetched: false, fetching: false, unauthorized: true }
                }

                case 404: {
                    return {...state, fetched: false, fetching: false, unavailable: true }
                }

                case 400: {
                    return {...state, fetched: false, fetching: false, bad_request: true }
                }

            }
            return {...state, fetched: false }
        }
        
    }
    return state;
}