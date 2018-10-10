document
  .addEventListener('DOMContentLoaded', function (event) {
    //FIREBASE STARTING
    const config = {
      apiKey: "AIzaSyALwAiNZSuY6xFt84_myzJAlMYCSAbLGIU",
      authDomain: "books-4739f.firebaseapp.com",
      databaseURL: "https://books-4739f.firebaseio.com",
      storageBucket: "books-4739f.appspot.com",
      messagingSenderId: "667324102714"
    };
    firebase.initializeApp(config);

    function getData() {
      let mainText = document.querySelector("#mainText");
      let counter = document.querySelector("#count");

      mainText.innerHTML = '';
      let firebaseText = firebase
        .database()
        .ref()
        .child("Books");

      let count = 0;
      counter.innerHTML = "   (" + count + ")";
      //THis is like a for loop
      firebaseText.on('child_added', function (data) {

        let database_author = data
          .child("Author")
          .val();
        let database_title = data
          .child("Name")
          .val();
        count++;
        console.log(data.child("Author").val() + "|" + data.child("Name").val());
        mainText.innerHTML += `<div class="ui checkbox">
                            <input type="checkbox" data-title="${database_title}" name="${database_title}'">
                            <label for="${database_title}">${database_title} | ${database_author} <!--<a class="delete" href=""><i class="remove circle outline icon"></i></a>
                            --></label>
                             
                              
                            
                          </div>
                          <br>`;
        counter.innerHTML = "   (" + count + ")";

        getBoxes();
        //Solution to async. Will fix later
      });

    }

    function restoreDefaults() {
      console.log("Defaults Restores 🔥");

      //Remove All
      firebase
        .database()
        .ref()
        .child('Books')
        .remove();

      //Default Values
      const restoreItems = [
        {
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
        }
      ];

      //Insert Default Values
      let database = firebase
        .database()
        .ref()
        .child('Books');
      for (let i = 0; i < restoreItems.length; i++) {
        database
          .push()
          .set({Author: restoreItems[i].Author, Name: restoreItems[i].Name});
      }

      getData();

    }

    function setData() {

      let author = document.querySelector("#author");
      let title = document.querySelector("#title");
      let negative = document.querySelector(".negative");

      if (!(author.value.trim() == "") && !(title.value.trim() == "")) {
        negative
          .classList
          .remove('show');
        firebase
          .database()
          .ref('Books/')
          .push()
          .set({
            Author: author
              .value
              .trim(),
            Name: title
              .value
              .trim()
          });
      } else {
        negative
          .classList
          .add('show');
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
      let title = this.dataset.title;
      let firebaseText = firebase
        .database()
        .ref()
        .child("Books");
      /* //Giving me errors when the same value was entered
  firebaseText.on('child_added', function (data) {
    if(data.child("Name").val() == title){
      data.ref.remove();
      getData();
    }
  });
  */
      firebaseText
        .orderByChild('Name')
        .equalTo(title)
        .once('value')
        .then(function (snapshot) {
          snapshot
            .forEach(function (childSnapshot) {
              //remove each child
              firebaseText
                .child(childSnapshot.key)
                .remove();
              getData();
            });
        });

    }

    /*To keep tickboxes selected*/
    function getBoxes() {
      if (document.querySelectorAll('input[type="checkbox"]').length >= 1) {
        let tickBoxes = Array
          .prototype
          .slice
          .call(document.querySelectorAll('input[type="checkbox"]'));

        tickBoxes.forEach(tick => tick.addEventListener("click", removeData));
      }

    }

    //Initial Fetch
    getData();
    getBoxes();

    //VARIABLES
    const submitButton = document.querySelector("#submitButton");
    submitButton.addEventListener("click", setData);
    const clearButton = document.querySelector("#clearButton");
    clearButton.addEventListener("click", clearInputFields);
    const restoreButton = document.querySelector("#restoreButton");
    restoreButton.addEventListener("click", restoreDefaults);

    document.addEventListener('keypress', function (e) {
      if (e.key == "Enter") {
        setData();
      }
    });

  });