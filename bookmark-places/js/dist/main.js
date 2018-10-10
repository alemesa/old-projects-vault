"use strict";

document.addEventListener("DOMContentLoaded", function (event) {

    function fetchBookmarks() {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        console.table(bookmarks);
        var places = document.getElementById("placesToGo");
        places.innerHTML = '';

        var quantity = document.querySelector('.title .tag');
        quantity.innerHTML = bookmarks.length;

        for (var i = 0; i < bookmarks.length; i++) {
            var storedPlace = bookmarks[i].place;
            var storedCountry = bookmarks[i].country;
            places.innerHTML += "<article class=\"media\">\n                                <div class=\"media-content\">\n                                    <div class=\"content\">\n                                    <p>\n                                        <strong>" + storedPlace + "</strong>\n                                        <br>\n                                        " + storedCountry + "\n                                        </p>\n                                    </div>\n                                    \n                                </div>\n                                <div class=\"media-right\">\n                                    <a data-place=\"" + storedPlace + "\" class=\"delete\"></a>\n                                </div>\n                            </article>";
        }
    }

    function saveBookmark() {
        var valuePlace = document.getElementById('inputPlace').value.trim();
        var valueCountry = document.getElementById('inputCountry').value.trim();
        //let valueImage = document.getElementById('inputImage').value;

        if (valuePlace == "" || valueCountry == "") {
            warning.classList.remove('hide');
            warning.classList.add('show');
            return false;
        } else {
            warning.classList.add('hide');
            warning.classList.remove('show');

            var bookmark = {
                place: valuePlace,
                country: valueCountry
            };

            if (localStorage.getItem('bookmarks') === null) {
                //JSON Stringify will turn an object into string
                var bookmarks = [];
                bookmarks.push(bookmark);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            } else {
                //JSON Parse will turn an object into a string
                var _bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                _bookmarks.push(bookmark);
                localStorage.setItem('bookmarks', JSON.stringify(_bookmarks));
            }

            document.getElementById('inputPlace').value = "";
            document.getElementById('inputCountry').value = "";

            fetchBookmarks();
            getButtons();
        }
    }

    function deleteBookmark() {
        var place = this.dataset.place;
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        for (var i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].place == place) {
                bookmarks.splice(i, 1);
            }
        }
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        fetchBookmarks();
        getButtons();
    }

    //Initial Fetch
    if (localStorage.getItem('bookmarks') === null) {
        //Do nothing wait for the user to enter info
    } else {
        fetchBookmarks();
        getButtons();
    }

    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener('click', saveBookmark);
    var warning = document.getElementById('errorNotification');
    warning.classList.add('hide');

    document.addEventListener('keypress', function (e) {
        if (e.key == "Enter") {
            saveBookmark();
        }
    });

    /*To keep Buttons Selections depending on */
    function getButtons() {
        var deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(function (button) {
            return button.addEventListener("click", deleteBookmark);
        });
    }
});