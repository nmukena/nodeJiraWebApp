/**------------------------------------------------------------------------------------------
This file is the main backend server.
    Express:
        1) Receives and processes front-end requests
        2) Responds with messages, json objects or error status
    Request:
        1) Sends http requests with JQL queries to Jira
        2) Receives responses from Jira
    Mongoose:
        1) Check if Team Capacities and Priority Planning are stored on DB
        2) Load Json Objets from the DB
        3) Update the DB
    BodyParser:
        1) Displays data that has been POSTed in req.body
------------------------------------------------------------------------------------------*/
var express = require("express");
var app = express();
request = require('request');
var path = require('path');
var mongoose = require('mongoose');
var Account = require('./models/account');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
require('ssl-root-cas').inject()

/**------------------------------------------------------------------------------------------
 * Connection to the DB
------------------------------------------------------------------------------------------*/
DB = mongoose.connect('mongodb://localhost/test', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

/**------------------------------------------------------------------------------------------
 * Connection to Jira
 *  URL -> Jira URL. Set through the /setURL GET request from the front end.
 *  PROJECT -> Jira Project. Set through the /setURL GET request from the front end.
 *  options -> Authentication Information to Jira.
 *      uri -> URL
 *      auth.user -> Jira Username
 *      auth.pass -> Jira Password
 *  CUSTOM_FIELDS: Fields necessary to organize Epics and Stories by teams and target completions
 ------------------------------------------------------------------------------------------*/
var URL = ""
var PROJECT = ""
var options = {rejectUnauthorized: false,
    uri: "",
    method: 'GET',
    auth: {'user': '',
    'pass': ''}
};
var TARGET_COMPLETION_FIELD = "customfield_10501"
var SCRUM_TEAM_FIELD = "customfield_10500"
var STORY_POINT_FIELD = "customfield_10200"

/**------------------------------------------------------------------------------------------
 * Routing
 ------------------------------------------------------------------------------------------*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.js'));
});
app.get('/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/bundle.js'));
});

/**------------------------------------------------------------------------------------------
 * Setup Requests
 *  The following requests set the correct Jira Information for successful Jira API requests
 ------------------------------------------------------------------------------------------*/
app.get("/setURL/:url/:projectId",function(req, res){
    /**
     * 1) Sets the URL and PROJECT variables.
     * 2) Checks if existing team capacities exist for the Project in DB.
     */
    URL = new Buffer(req.params.url, 'hex').toString();
    PROJECT = new Buffer(req.params.projectId, 'hex').toString();
    console.log('URL is:', URL)
    Account.findOne({url: URL, project: PROJECT}, function(error, exist) {
        if(exist && !error){
            console.log("Capacity is configured and loaded!");
            res.json(exist.state)
        } else {
            console.log("Capacity is not configured yet...");
            Account.update({url: URL, project: PROJECT}, {$set: { state: {
                TARGET_COMPLETION_FIELD: "customfield_10501",
                SCRUM_TEAM_FIELD: "customfield_10500",
                fetching: false,
                fetched: true,
                configured: false,
                unauthorized: false,
                unavailable: false,
                bad_request: false,
                sprint_number: 1,
                target_completions: [],
                teams: [],
                teams_capacities : {},
                projectId : PROJECT
            }}}, {upsert: true}, function (err) {
                if (!err){
                    console.log("Capacity is ready to be configured.")
                    Account.findOne({url: URL, project: PROJECT}, function(err, doc){
                        res.json(doc.state)
                    })
                } else {
                    console.log("Error occurred while preparing the capacity to be configured: "+err)
                    res.send(err)
                }
            });
        }
    });
    console.log("URL and Project Id set!")
})

app.get("/loadCapacity",function(req, res){
    /**
     * Fetches the team capacities for the current project from DB.
     */
    Account.findOne({url: URL, project: PROJECT}, function(error, exist) {
        if(exist && !error){
            console.log("Capacity is loaded!");
            res.json(exist.state)
        } else {
            console.log("Capacity is not configured yet...");
            res.send(error)
        }
    });
    console.log("URL and Project Id set!")
})

app.get("/setCredentials/:user/:password",function(req, res){
    /**
     * Sets the username and password for the Jira Account.
     */
    options.auth.user = new Buffer(req.params.user, 'hex').toString();
    options.auth.pass = new Buffer(req.params.password, 'hex').toString();
    console.log("Credentials set!")
    res.send("Done")
})


app.get("/setCustomFields/:target/:team",function(req, res){
    /**
     * Sets the custom fields.
     */
    TARGET_COMPLETION_FIELD = req.params.target
    SCRUM_TEAM_FIELD = req.params.team
    console.log("Customfields set!")
    res.send("Done")
    return;
});

/**------------------------------------------------------------------------------------------
 * Jira Requests
 ------------------------------------------------------------------------------------------*/
app.get("/getAllEpics/:projectId/", function(req, res)  {
    /**
     * Get the list of all Epics in the current Project with the following info:
     *  Name and Key
     */
    PROJECT = req.params.projectId
    options.uri = URL+"/rest/api/2/search?jql=project%3D%22"+PROJECT+"%22%20AND%20issuetype%3D%22Epic%22&"+
    "fields=summary,key";
    request(options, function(error, response, body) {
        if (error) {
            res.status(404).send(error)
            console.log("Error: "+error)
            return;
        }
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send(error)
            console.log("Status: "+response.statusCode+error)
            return;
         }
        res.json(JSON.parse(body));
        return;
    });
});

app.get("/getStoriesByEpic/:epicId/", function(req, res)  {
    /**
     * Get the list of all Stories in the Epic with ID epicId with the following info:
     *  All info.
     */
    options.uri = URL+"/rest/api/2/search?jql=%22Epic%20Link%22%3D"+req.params.epicId;
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send(error)
            return;
         }
         res.json(JSON.parse(body));
        return;
    });
});

app.get("/getEpic/:issueNumber", function(req, res)  {
        /**
         * Queries Jira for a specific Epic and the following info:
         *   Name, Project ID, Scrum Team, Target Completion Date
         */
        options.uri = URL+"/rest/api/2/search?jql=issue%3D%22"+req.params.issueNumber
        +"%22&fields=summary,project,"+SCRUM_TEAM_FIELD+","+TARGET_COMPLETION_FIELD;
        request(options, function(error, response, body) {
            if (error) {
                res.send(error)
                return;
            }
            if (response.statusCode !== 200) {
                res.status(response.statusCode).send(error)
                return;
             }
            res.json(JSON.parse(body));
            return;
        });
});

app.get("/getStory/:issueNumber", function(req, res)  {
    /**
     * Queries Jira for a specific Story and the following info:
     *  Name, Status, Project, Story Point, Scrum Team, Target Completion
     */
    options.uri = URL+"/rest/api/2/search?jql=issue%3D%22"+req.params.issueNumber
    +"%22&fields=summary,status,project,"+STORY_POINT_FIELD+","+SCRUM_TEAM_FIELD+","+TARGET_COMPLETION_FIELD;
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send(error)
            return;
         }
        res.json(JSON.parse(body));
        return;
    });
});

/**------------------------------------------------------------------------------------------
 * Database Requests
 -------------------------------------------------------------------------------------------*/
app.post("/logDatabase/",function(req, res){
    /**
     * Log the team capacities of the current project in the DB.
     */
    Account.update({url: URL, project: PROJECT}, {$set: { state: req.body }}, function (err) {
        if (err){
            console.log(err);
            res.send(err)
        }
    });
    res.send("Database Updated!")
    console.log("Database Updated!")
})


/**------------------------------------------------------------------------------------------
 * Some unused Jira requests that can serve in the future...
 ------------------------------------------------------------------------------------------*/
app.get("/getAllIssues/:projectId", function(req, res)  {
    options.uri = URL+"/rest/api/2/search?jql=project="+req.params.projectId;
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            console.log(error)
            return;
        }
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send(error)
            console.log(response.statusCode+error)
            return;
         }
        res.json(JSON.parse(body));
        return;
    });
});

app.get("/getRapidviews/", function(req, res)  {
    options.uri = URL+"/rest/greenhopper/latest/rapidviews/list";
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send(error)
            return;
         }
         res.json(JSON.parse(body));
        return;
    });
});

app.get("/getSprints/:rapidViewId", function(req, res)  {
    options.uri = URL+"/rest/greenhopper/latest/sprintquery/"+req.params.rapidViewId
    +"?includeHistoricSprints=true&includeFutureSprints=true";
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send(error)
            return;
         }
         res.json(JSON.parse(body));
        return;
    });
});

app.get("/getIssuesBySprint/:rapidViewId/:sprintId", function(req, res)  {
    options.uri = URL+"/rest/greenhopper/latest/rapid/charts/sprintreport?rapidViewId="+
    req.params.rapidViewId+"&sprintId="+req.params.sprintId;
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send(error)
            return;
         }
         res.json(JSON.parse(body));
        return;
    });
});

/**------------------------------------------------------------------------------------------
 * Server Endpoint
 ------------------------------------------------------------------------------------------*/
app.listen(5000, function() {
    console.log("Request Server is running on port 5000");
});
