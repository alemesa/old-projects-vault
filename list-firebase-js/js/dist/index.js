"use strict";

document.addEventListener('DOMContentLoaded', function (event) {
  //FIREBASE STARTING
  var config = {
    apiKey: "AIzaSyALwAiNZSuY6xFt84_myzJAlMYCSAbLGIU",
    authDomain: "books-4739f.firebaseapp.com",
    databaseURL: "https://books-4739f.firebaseio.com",
    storageBucket: "books-4739f.appspot.com",
    messagingSenderId: "667324102714"
  };
  firebase.initializeApp(config);

  function getData() {
    var mainText = document.querySelector("#mainText");
    var counter = document.querySelector("#count");

    mainText.innerHTML = '';
    var firebaseText = firebase.database().ref().child("Books");

    var count = 0;
    counter.innerHTML = "   (" + count + ")";
    //THis is like a for loop
    firebaseText.on('child_added', function (data) {

      var database_author = data.child("Author").val();
      var database_title = data.child("Name").val();
      count++;
      console.log(data.child("Author").val() + "|" + data.child("Name").val());
      mainText.innerHTML += "<div class=\"ui checkbox\">\n                            <input type=\"checkbox\" data-title=\"" + database_title + "\" name=\"" + database_title + "'\">\n                            <label for=\"" + database_title + "\">" + database_title + " | " + database_author + " <!--<a class=\"delete\" href=\"\"><i class=\"remove circle outline icon\"></i></a>\n                            --></label>\n                             \n                              \n                            \n                          </div>\n                          <br>";
      counter.innerHTML = "   (" + count + ")";

      getBoxes();
      //Solution to async. Will fix later
    });
  }

  function restoreDefaults() {
    console.log("Defaults Restores 🔥");

    //Remove All
    firebase.database().ref().child('Books').remove();

    //Default Values
    var restoreItems = [{
      Author: "J.K.Rowling",
      Name: "Harry Potter"
    }, {
      Author: "J.R.R Tolkien",
      Name: "The Lord of the Rings"
    }, {
      Author: "Dan Brown",
      Name: "Da Vinci's Code"
    }, {
      Author: "George R.R Martin",
      Name: "Game of Thrones"
    }, {
      Author: "Laura Hillenbrand",
      Name: "Unbroken"
    }, {
      Author: "Dan Brown",
      Name: "Angels & Demons"
    }];

    //Insert Default Values
    var database = firebase.database().ref().child('Books');
    for (var i = 0; i < restoreItems.length; i++) {
      database.push().set({ Author: restoreItems[i].Author, Name: restoreItems[i].Name });
    }

    getData();
  }

  function setData() {

    var author = document.querySelector("#author");
    var title = document.querySelector("#title");
    var negative = document.querySelector(".negative");

    if (!(author.value.trim() == "") && !(title.value.trim() == "")) {
      negative.classList.remove('show');
      firebase.database().ref('Books/').push().set({
        Author: author.value.trim(),
        Name: title.value.trim()
      });
    } else {
      negative.classList.add('show');
      return;
    }
    getData();
    clearInputFields();
  }

  function clearInputFields() {
    author.value = "";
    title.value = "";
  }

  function removeData() {
    /*Change to strikethrough*/
    var title = this.dataset.title;
    var firebaseText = firebase.database().ref().child("Books");
    /* //Giving me errors when the same value was entered
    firebaseText.on('child_added', function (data) {
    if(data.child("Name").val() == title){
    data.ref.remove();
    getData();
    }
    });
    */
    firebaseText.orderByChild('Name').equalTo(title).once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        //remove each child
        firebaseText.child(childSnapshot.key).remove();
        getData();
      });
    });
  }

  /*To keep tickboxes selected*/
  function getBoxes() {
    if (document.querySelectorAll('input[type="checkbox"]').length >= 1) {
      var tickBoxes = Array.prototype.slice.call(document.querySelectorAll('input[type="checkbox"]'));

      tickBoxes.forEach(function (tick) {
        return tick.addEventListener("click", removeData);
      });
    }
  }

  //Initial Fetch
  getData();
  getBoxes();

  //VARIABLES
  var submitButton = document.querySelector("#submitButton");
  submitButton.addEventListener("click", setData);
  var clearButton = document.querySelector("#clearButton");
  clearButton.addEventListener("click", clearInputFields);
  var restoreButton = document.querySelector("#restoreButton");
  restoreButton.addEventListener("click", restoreDefaults);

  document.addEventListener('keypress', function (e) {
    if (e.key == "Enter") {
      setData();
    }
  });
});