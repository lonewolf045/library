(function(){var firebaseConfig = {
  apiKey: "AIzaSyAY4pwMr8KLlmU_axcpOK6C84IuWpAdjDY",
  authDomain: "library-275b1.firebaseapp.com",
  databaseURL: "https://library-275b1.firebaseio.com",
  projectId: "library-275b1",
  storageBucket: "library-275b1.appspot.com",
  messagingSenderId: "1082532841039",
  appId: "1:1082532841039:web:d0af44b20c366cfd004c3a",
  measurementId: "G-81K1MYNJRK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.database();
let databaseData = "";
let myLibrary = [];

const btn = document.querySelector(".btn");
const container = document.querySelector("#container");

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
  
Book.prototype.updateRead = function(index) {
    /*let marker;
      if(read) {
        marker = 'read';
      } else {
        marker = 'not read yet';
      }*/
    let currentStateRead = this.read;
    let arrayKeys = Object.keys(databaseData);
    let key = arrayKeys[index];
    let refUpdate = db.ref().child("books/" + key);
    if(currentStateRead == 'Read')
        this.read = 'Not Read';
    else
        this.read = 'Read';  
    refUpdate.update({
      read : this.read
    });
  }

  Book.prototype.removeBook = function(index) {
    /*let i = new Number(index);
    myLibrary.splice(index,1);
    localStorage.setItem("MyLibrary", JSON.stringify(myLibrary));*/
    let arrayKeys = Object.keys(databaseData);
    let key = arrayKeys[index];
    let refRemove = db.ref().child("books/" + key);
    refRemove.remove();
  }

const addBookToLibrary = function(title,author,pages,read) {
    let newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    pushToDatabase(title,author,pages,read);
}


function pushToDatabase(title, author, pages, read) {
  let reference = db.ref().child("books");
  let newReference = reference.push();
  newReference.set({
      title : title,
      author : author,
      pages : pages,
      read : read
  });
}

function render() {
    container.innerHTML = "";
    let databaseReference = db.ref().child("books");
    databaseReference.on("value", function (snapshot) {

      // Get all the values in the database
      databaseData = snapshot.val();

      let myLibrary = Object.values(databaseData);
    for(let i = 0; i < myLibrary.length;i++) {
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");

    const bookCardTools = document.createElement("div");
    const bookRead = document.createElement("button");
    const bookTrash = document.createElement("button");
    //const bookCheckMark = document.createElement("p");
    
    bookCard.classList.add("book-card");
    bookTitle.classList.add("book-detail");
    bookAuthor.classList.add("book-detail");
    bookPages.classList.add("book-detail");
    bookCardTools.classList.add("book-card-tools");
    if(myLibrary[i].read == 'Read')
        bookRead.classList.add('read');
    else
        bookRead.classList.add('not-read');
    bookTrash.classList.add("delete");
    
    bookRead.addEventListener('click',(e) => {
        Book.prototype.updateRead(bookCardTools.id);
        render();
    });

    bookTrash.addEventListener('click',(e) => {
        Book.prototype.removeBook(bookCardTools.id);
        render();
    });

    bookTitle.innerHTML = myLibrary[i].title;
    bookAuthor.innerHTML = myLibrary[i].author;
    bookPages.innerHTML = myLibrary[i].pages + " pages";
    bookCardTools.setAttribute('id', String(i));
    bookRead.innerHTML = myLibrary[i].read;
    bookTrash.innerHTML = 'Delete';
    
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);

    bookCardTools.appendChild(bookRead);
    bookCardTools.appendChild(bookTrash);

    bookCard.appendChild(bookCardTools);

    container.appendChild(bookCard);
    }

  });
}

btn.addEventListener("click", () => {
    console.log("Clicked");
    let newTitle = document.forms["myForm"]["title"];
    let newAuthor = document.forms["myForm"]["author"];
    let newPages = document.forms["myForm"]["pages"];
    let newRead = document.forms["myForm"]["read"];

    console.log("Extracted");
    addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newRead.value);
    render();
    closeForm();

});

render();

})();

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  clearFormFields();
}

function clearFormFields() {
document.forms["myForm"].reset();
}