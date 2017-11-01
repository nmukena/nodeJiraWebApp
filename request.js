var express = require("express"); 
var app = express();
request = require('request');
var path = require('path');

var URL = "https://mehran-development.atlassian.net"


var options = {rejectUnauthorized: this.strictSSL, 
    uri: "", 
    method: 'GET',
    auth: {'user': '', 
    'pass': ''}
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.js'));
});
app.get('/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/bundle.js'));
});

app.get("/getIssue/:issueNumber", function(req, res)  {
        options.uri = URL+"/rest/api/2/issue/"+req.params.issueNumber;
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

app.get("/getAllIssues/:projectId", function(req, res)  {
    options.uri = URL+"/rest/api/2/search?jql=project="+req.params.projectId; 
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

app.get("/getAllEpics/:projectId/", function(req, res)  {
    options.uri = URL+"/rest/api/2/search?jql=project%3D%22"+req.params.projectId+"%22%20AND%20issuetype%3D%22Epic%22&"+
    "fields=summary,duedate,priority,issuetype,key,timeoriginalestimate,customfield_11000,"+
    "customfield_10100,customfield_10002,customfield_10014,assignee,components,fixVersions,"+
    "versions,resolution,customfield_10011,labels,reporter,status,customfield_10015,time%20estimate";
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


"https://mehran-development.atlassian.net/rest/api/2/search?jql=%22Epic%20Link%22%3DGTMP-33"
app.get("/getIssuesPerEpic/:epicId/", function(req, res)  {
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

app.listen(3000, function() {  
    console.log("Request Server is running on http://localhost:3000");
});