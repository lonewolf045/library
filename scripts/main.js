let myLibrary = [];

function Book (title, author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    /*this.info = function() {
      let marker;
      if(read) {
        marker = 'read';
      } else {
        marker = 'not read yet';
      }
      return `${title} by ${author}, ${pages} pages, ${marker}`;
    }*/
  }
  
  Book.prototype.updateRead = function() {
    /*let marker;
      if(read) {
        marker = 'read';
      } else {
        marker = 'not read yet';
      }*/
    let currentStateRead = this.read;
    if(currentStateRead == 'Read')
        this.read = 'Not Read';
    else
        this.read = 'Read';  
  }

  const addBookToLibrary = function() {
}
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
  //const abook = new Book ("Great Expectations","Charles Dickens",400,true);
  //console.log(abook.info());
  //var newObj = new Object();