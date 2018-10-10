document.addEventListener("DOMContentLoaded", function() {
  // do something
  const search = document.getElementById("searchUser");
  const userDiv = document.getElementById("profile");
  const userRepos = document.getElementById("repos");
  const reposCount = document.getElementById("reposCount");

  search.addEventListener("keyup", function(e) {
    let username = e.target.value;
    let url = `https://api.github.com/users/${username}`;
    let reposUrl = `${url}/repos`;
    let per_page = reposCount.value;

    //User Repos
    axios
      .get(reposUrl, {
        params: {
          client_id: "20d6018514a9d74e83ce",
          client_secret: "c167f53ce4c1a8cd201af3003517db79b9c4e354",
          order: "asc",
          per_page: per_page,
          sort: "updated"
        }
      })
      .then(function(response) {
        let repos = response.data;
        document.getElementById("titleRepos").innerHTML = "Latest Repos";
        userRepos.innerHTML = "";
        for (let i = 0; i < repos.length; i++) {
          userRepos.innerHTML += `<div class="col-sm-6">
                                            <div class="card">
                                            <div class="card-block">
                                                <h4 class="card-title">${repos[
                                                  i
                                                ].name}</h4>
                                                <p class="card-text">${repos[i]
                                                  .description}</p>
                                                
                                                <div class="repoStats">
                                                <p><i class="fa fa-star" aria-hidden="true"></i> ${repos[
                                                  i
                                                ].stargazers_count}</p>
                                                <p><i class="fa fa-eye" aria-hidden="true"></i> ${repos[
                                                  i
                                                ].watchers_count}</p>
                                                <p><i class="fa fa-code-fork" aria-hidden="true"></i> ${repos[
                                                  i
                                                ].forks_count}</p>
                                                <p><span class="badge badge-pill badge-success">${repos[
                                                  i
                                                ].language}</span></p>
                                                
                                                </div>
                                                <a href="${repos[i]
                                                  .html_url}" target="_blank" class="btn btn-primary">Repo</a>
                                            </div>
                                            </div>
                                        </div>`;
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    //User Profile
    axios
      .get(url, {
        params: {
          client_id: "20d6018514a9d74e83ce",
          client_secret: "c167f53ce4c1a8cd201af3003517db79b9c4e354"
        }
      })
      .then(function(response) {
        let user = response.data;
        // Date format
        let date = new Date(user.created_at);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }

        //Div
        userDiv.innerHTML = `<div class="col-md-4 col-sm-6 col-xs-6 profilePic">
            <img class="profilePic" src="${user.avatar_url}" alt="${user.name} Profile Pic">
            <div>
                <a href="${user.html_url}" target="_blank" class="btn btn-success">Profile</a>
            </div>
            
        </div>
         <div class="col-md-8 col-sm-10 col-xs-10 profileContent">
            <div class="card">
                
            <ul class="list-group list-group-flush">
                <h3 class="list-group-item">${user.name}</h3>
                ${user.company
                  ? `<h5 class="list-group-item">Company: ${user.company}</h5>`
                  : ""}
                <li class="list-group-item">${user.bio}</li>
                <li class="list-group-item"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp${user.location}</li>
                <a  class="list-group-item" target="_blank" href="${user.blog}" >${user.blog.replace(
          /^.*:\/\//i,
          ""
        )}</a>
                <li class="list-group-item"><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp Member since &nbsp <span class="badge badge-primary">${year +
                  "-" +
                  month}</span> &nbsp- For Hire&nbsp ${user.hireable
          ? '<span class="badge badge-success">Yes</span></li>'
          : '<span class="badge badge-danger">No</span></li>'}
                <li class="list-group-item">
                <div class="repoStats">
                    <p><i class="fa fa-code-fork" aria-hidden="true"></i> Repos: ${user.public_repos}</p>
                    <p><i class="fa fa-sticky-note-o" aria-hidden="true"></i> Gists: ${user.public_gists}</p>
                    <p><i class="fa fa-users" aria-hidden="true"></i> Followers: ${user.followers}</p>
                    <p><i class="fa fa-users" aria-hidden="true"></i> Following: ${user.following}</p>            
                </div>
                </li>
            </ul>
            </div>
            
        </div>`;
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});
