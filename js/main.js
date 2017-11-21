//listen for form Submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);
//add event listener to run function saveBookmark and submit


//save Bookmark
function saveBookmark(e) {
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // console.log(bookmark);

  //local storage test
  // localStorage.setItem('test', 'Hello World');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));


  //test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    //init array

    var bookmarks = [];
    //add to array

    bookmarks.push(bookmark);
    // set to localStorage

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //add bookmark to array
    bookmarks.push(bookmark);


    //re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }


  //clear form
  document.getElementById('myForm').reset();

  fetchBookmarks();

  //prevent form from submitting
  e.preventDefault();
}


//delete Bookmark

function deleteBookmark(url){
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  //reset back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //refetch bookmarks
  fetchBookmarks();

}


// fetch bookmarks
function fetchBookmarks(){

  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // get output idea
  var bookmarkResults = document.getElementById('bookmarksResults');

  // build output
  bookmarkResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=  '<div class="well">' +
                                  '<h3>' + name + '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
                                  '<a onclick = "deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#"> Delete </a>'
                                    + '</h3>' + '</div>';

  }
}



//validate form
function validateForm(siteName, siteUrl){

    if(!siteName || !siteUrl) {
      alert('Please fill in the form');
      return false;
    }

    //https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
      alert('please use a valid url');
      return false;
    }

    return true;

}
