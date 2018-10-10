"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // do something
    var search = document.getElementById("searchUser");
    var userDiv = document.getElementById("profile");
    var userRepos = document.getElementById("repos");
    var reposCount = document.getElementById("reposCount");

    search.addEventListener("keyup", function (e) {
        var username = e.target.value;
        var url = "https://api.github.com/users/" + username;
        var reposUrl = url + "/repos";
        var per_page = reposCount.value;

        //User Repos
        axios.get(reposUrl, {
            params: {
                client_id: '20d6018514a9d74e83ce',
                client_secret: 'c167f53ce4c1a8cd201af3003517db79b9c4e354',
                order: 'asc',
                per_page: per_page,
                sort: 'updated'
            }
        }).then(function (response) {
            var repos = response.data;
            document.getElementById("titleRepos").innerHTML = "Latest Repos";
            userRepos.innerHTML = '';
            for (var i = 0; i < repos.length; i++) {
                userRepos.innerHTML += "<div class=\"col-sm-6\">\n                                            <div class=\"card\">\n                                            <div class=\"card-block\">\n                                                <h4 class=\"card-title\">" + repos[i].name + "</h4>\n                                                <p class=\"card-text\">" + repos[i].description + "</p>\n                                                \n                                                <div class=\"repoStats\">\n                                                <p><i class=\"fa fa-star\" aria-hidden=\"true\"></i> " + repos[i].stargazers_count + "</p>\n                                                <p><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> " + repos[i].watchers_count + "</p>\n                                                <p><i class=\"fa fa-code-fork\" aria-hidden=\"true\"></i> " + repos[i].forks_count + "</p>\n                                                <p><span class=\"badge badge-pill badge-success\">" + repos[i].language + "</span></p>\n                                                \n                                                </div>\n                                                <a href=\"" + repos[i].html_url + "\" target=\"_blank\" class=\"btn btn-primary\">Repo</a>\n                                            </div>\n                                            </div>\n                                        </div>";
            }
        }).catch(function (error) {
            console.log(error);
        });

        //User Profile
        axios.get(url, {
            params: {
                client_id: '20d6018514a9d74e83ce',
                client_secret: 'c167f53ce4c1a8cd201af3003517db79b9c4e354'
            }
        }).then(function (response) {
            var user = response.data;
            // Date format
            var date = new Date(user.created_at);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;

            if (month < 10) {
                month = '0' + month;
            }

            //Div
            userDiv.innerHTML = "<div class=\"col-md-4 col-sm-6 col-xs-6 profilePic\">\n            <img class=\"profilePic\" src=\"" + user.avatar_url + "\" alt=\"" + user.name + " Profile Pic\">\n            <div>\n                <a href=\"" + user.html_url + "\" target=\"_blank\" class=\"btn btn-success\">Profile</a>\n            </div>\n            \n        </div>\n         <div class=\"col-md-8 col-sm-10 col-xs-10 profileContent\">\n            <div class=\"card\">\n                \n            <ul class=\"list-group list-group-flush\">\n                <h3 class=\"list-group-item\">" + user.name + "</h3>\n                " + (user.company ? "<h5 class=\"list-group-item\">Company: " + user.company + "</h5>" : '') + "\n                <li class=\"list-group-item\">" + user.bio + "</li>\n                <li class=\"list-group-item\"><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i>&nbsp" + user.location + "</li>\n                <a  class=\"list-group-item\" target=\"_blank\" href=\"" + user.blog + "\" >" + user.blog.replace(/^.*:\/\//i, '') + "</a>\n                <li class=\"list-group-item\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>&nbsp Member since &nbsp <span class=\"badge badge-primary\">" + (year + '-' + month) + "</span> &nbsp- For Hire&nbsp " + (user.hireable ? '<span class="badge badge-success">Yes</span></li>' : '<span class="badge badge-danger">No</span></li>') + "\n                <li class=\"list-group-item\">\n                <div class=\"repoStats\">\n                    <p><i class=\"fa fa-code-fork\" aria-hidden=\"true\"></i> Repos: " + user.public_repos + "</p>\n                    <p><i class=\"fa fa-sticky-note-o\" aria-hidden=\"true\"></i> Gists: " + user.public_gists + "</p>\n                    <p><i class=\"fa fa-users\" aria-hidden=\"true\"></i> Followers: " + user.followers + "</p>\n                    <p><i class=\"fa fa-users\" aria-hidden=\"true\"></i> Following: " + user.following + "</p>            \n                </div>\n                </li>\n            </ul>\n            </div>\n            \n        </div>";
        }).catch(function (error) {
            console.log(error);
        });
    });
});