var express = require("express"); 
var app = express();
request = require('request');


var options = {rejectUnauthorized: this.strictSSL, 
    uri: "https://mehran-development.atlassian.net/rest/api/2/issue/GTMP-2", 
    method: 'GET',
    auth: {'user': 'USERNAME', 
    'pass': 'PASSWORD'}
};

getIssue = function(issueNumber) {
        options.uri = "https://mehran-development.atlassian.net/rest/api/2/issue/"+issueNumber
        request(options, function(error, response, body) {
            if (error) {
                console.log(error);
                return;
            }
            if (response.statusCode === 404) {
                console.log('Invalid issue number.');
                return;
            }
            if (response.statusCode !== 200) {
                console.log(response.statusCode + ': Unable to connect to JIRA during findIssueStatus.');
                return;
            }
            if (body === undefined) {
                console.log('Response body was undefined.');
                return;
            }
                console.log(JSON.parse(body));
        });
};

getAllIssuesProject = function(projectId) {
    options.uri = "https://mehran-development.atlassian.net/rest/api/2/search?jql=project="+projectId;
    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        if (response.statusCode === 404) {
            console.log('Invalid issue number.');
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + ': Unable to connect to JIRA during findIssueStatus.');
            return;
        }
        if (body === undefined) {
            console.log('Response body was undefined.');
            return;
        }
            console.log(JSON.parse(body));
    });
};


getIssueMeta = function(issueNumber) {
    options.uri = "https://mehran-development.atlassian.net/rest/api/2/issue/"+issueNumber+"/editmeta"
    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        if (response.statusCode === 404) {
            console.log('Invalid issue number.');
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + ': Unable to connect to JIRA during findIssueStatus.');
            return;
        }
        if (body === undefined) {
            console.log('Response body was undefined.');
            return;
        }
            console.log(JSON.parse(body));
    });
};

getWorklog = function(issueNumber) {
    options.uri = "https://mehran-development.atlassian.net/rest/api/2/issue/"+issueNumber+"/worklog";
    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        if (response.statusCode === 404) {
            console.log('Invalid issue number.');
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + ': Unable to connect to JIRA during findIssueStatus.');
            return;
        }
        if (body === undefined) {
            console.log('Response body was undefined.');
            return;
        }
            console.log(JSON.parse(body));
    });
};

getProject = function(projectId) {
    options.uri = "https://mehran-development.atlassian.net//rest/api/2/project/"+projectId;
    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        if (response.statusCode === 404) {
            console.log('Invalid project number.');
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + ': Unable to connect to JIRA.');
            return;
        }
        if (body === undefined) {
            console.log('Response body was undefined.');
            return;
        }
            console.log(JSON.parse(body));
    });
};

getProjectRoles = function(projectId) {
    options.uri = "https://mehran-development.atlassian.net//rest/api/2/project/"+projectId+"/role";
    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        if (response.statusCode === 404) {
            console.log('Invalid project number.');
            return;
        }
        if (response.statusCode !== 200) {
            console.log(response.statusCode + ': Unable to connect to JIRA.');
            return;
        }
        if (body === undefined) {
            console.log('Response body was undefined.');
            return;
        }
            console.log(JSON.parse(body));
    });
};