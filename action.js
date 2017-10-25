import request from 'superagent';

const GET_ALL_ISSUES = 'GET_ALL_ISSUES'; 
const GET_ALL_ISSUES_SUCCESS = 'GET_ALL_ISSUES_SUCCESS'; 
const GET_ALL_ISSUES_FAILED = 'GET_ALL_ISSUES_FAILED'; 

store.dispatch({ type: GET_ALL_ISSUES }); 
request.get('/questions') 
  .end((err, res)=> { 
    	if (err) {
        	store.dispatch({ 
            	type: GET_ALL_ISSUES_FAILED, 
                error: err
            });
        } else { 
      store.dispatch({
            	type: GET_ALL_ISSUES_SUCCESS, 
                issues: res.response 
            });
        } 
    });