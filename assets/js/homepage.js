var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user){
  // format the github api url
  var apiUrl = "http://api.github.com/users/"+user +"/repos";
    // make a request to the url
fetch(apiUrl)
  .then(function(response){
    if(response.ok){
      response.json().then(function(data){
        displayRepos(data, user);
       })
    }else{
      alert("Error:GitHub user Not Found");
    }
   // console.log("inside",response)
  })
  .catch(function(error){
    alert("Unable to conect to GitHub");
  })
}
  getUserRepos("kiwiYXK")// 异步函数 asynchronously  
  // 先调用了这个。第二调用getuserrepos 函数  这叫异步函数


  var formSubmitHandler = function(event){
    event.preventDefault(); // 什么情况下使用它？？？？
    //get value from input element 
    var username = nameInputEl.value.trim();

    if(username){
      getUserRepos(username);
      nameInputEl.value = "";
    }else{
      alert("Please enter a GitHub username");
    }
    console.log(event);
  }
  userFormEl.addEventListener("submit",formSubmitHandler);

  var displayRepos = function(repos, searchTerm){
    if(repos.length ===0){
      repoContainerEl.textContent = "No repositories found";
      return; 
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    console.log(repos);
    console.log(searchTerm);
    for(var i =0; i <repos.length; i++){
      //format repo name 
      var repoName = repos[i].owner.login + "/"+ repos[i].name;
      var repoEl = document.createElement("div");
      repoEl.classList = "list-item flex-row justify-space-between align-center";
      var titleEl = document.createElement("span");
      titleEl.textContent = repoName;

      repoEl.appendChild(titleEl);

      var statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";
      if(repos[i].open_issues_count>0){
        statusEl.innerHTML =
        `<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        `
      }else{
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
repoEl.appendChild(statusEl);
      repoContainerEl.appendChild(repoEl);
    }
  }
