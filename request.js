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
                console.log(response.statusCode + "/n"+ error);
                res.status(response.statusCode).send(error)
                return;
             }
            res.json(JSON.parse(body));
            return;
        });
});

//Attempt to use express.
app.get("/getAllIssues/:projectId", function(req, res)  {
    options.uri = URL+"/rest/api/2/search?jql=project="+req.params.projectId; 
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + "/n"+ error);
            res.status(response.statusCode).send(error)
            return;
         }
         res.json(JSON.parse(body));
        return;
    });
});

app.get("/getIssueMeta/:issueNumber", function(req, res)  {
    options.uri = URL+"/rest/api/2/issue/"+req.params.issueNumber+"/editmeta"
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + "/n"+ error);
            res.status(response.statusCode).send(error)
            return;
         }
        res.json(JSON.parse(body));
        return;
    });
});

app.get("/getIssueWorklog/:issueNumber", function(req, res)  {
    options.uri = URL+"/rest/api/2/issue/"+req.params.issueNumber+"/worklog";
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + "/n"+ error);
            res.status(response.statusCode).send(error)
            return;
         }
        res.json(JSON.parse(body));
        return;
    });
});

app.get("/getProject/:projectId", function(req, res)  {
    options.uri = URL+"/rest/api/2/project/"+req.params.projectId;
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + "/n"+ error);
            res.status(response.statusCode).send(error)
            return;
         }
        res.json(JSON.parse(body));
        return;
    });
});

app.get("/getProjectRole/:projectId", function(req, res)  {
    options.uri = URL+"/rest/api/2/project/"+req.params.projectId+"/role";
    request(options, function(error, response, body) {
        if (error) {
            res.send(error)
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + "/n"+ error);
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