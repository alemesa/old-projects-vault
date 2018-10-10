document.addEventListener("DOMContentLoaded", function(event) {
   
   
function fetchBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.table(bookmarks);
    const places = document.getElementById("placesToGo");
    places.innerHTML = '';

    
    const quantity = document.querySelector('.title .tag');
    quantity.innerHTML = bookmarks.length;
    
    for(var i = 0; i < bookmarks.length; i++){
        let storedPlace = bookmarks[i].place;
        let storedCountry = bookmarks[i].country;
        places.innerHTML += `<article class="media">
                                <div class="media-content">
                                    <div class="content">
                                    <p>
                                        <strong>${storedPlace}</strong>
                                        <br>
                                        ${storedCountry}
                                        </p>
                                    </div>
                                    
                                </div>
                                <div class="media-right">
                                    <a data-place="${storedPlace}" class="delete"></a>
                                </div>
                            </article>`;
    }
    
  

}

function saveBookmark(){
    let valuePlace = document.getElementById('inputPlace').value.trim();
    let valueCountry = document.getElementById('inputCountry').value.trim();
    //let valueImage = document.getElementById('inputImage').value;
    
    if(valuePlace == "" || valueCountry == ""){
        warning.classList.remove('hide');
        warning.classList.add('show');
        return false;
    }else{
        warning.classList.add('hide');
        warning.classList.remove('show');

        let bookmark = {
        place: valuePlace,
        country: valueCountry,
        //imageUrl: valueImage
        }
        
        if(localStorage.getItem('bookmarks')=== null){
            //JSON Stringify will turn an object into string
            let bookmarks = [];
            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
        else{
            //JSON Parse will turn an object into a string
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }

        document.getElementById('inputPlace').value = "";
        document.getElementById('inputCountry').value = "";
        
        fetchBookmarks();
        getButtons();

    }

    
   
}

function deleteBookmark(){
    var place = this.dataset.place;
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].place == place){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    getButtons();
}

//Initial Fetch
if(localStorage.getItem('bookmarks') === null){
   //Do nothing wait for the user to enter info
} else {
    fetchBookmarks();
    getButtons();
}



const submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click',saveBookmark);
const warning = document.getElementById('errorNotification');
warning.classList.add('hide');


document.addEventListener('keypress',function(e){
    if(e.key == "Enter"){
        saveBookmark();
    }
});


/*To keep Buttons Selections depending on */
function getButtons(){
    let deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => button.addEventListener("click",deleteBookmark));
}





});
















