var siteNameInput = document.getElementById("bookMarkName")
var siteUrlInput = document.getElementById("bookMarkUrl")
var bookImgInput = document.getElementById('bookImg')
var bookDescriptionInput = document.getElementById("bookDescription")
var submitBtn = document.getElementById("submitBtn")
var updateBtn = document.getElementById("updateBtn")
var bookSearchInput = document.getElementById("bookSearch")

var temp
var books = []

var regex= {
    bookMarkName: {
      value: /^[a-z0-9 ]{5,30}$/,
      isValid : false,},

    bookMarkUrl: {
      value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
      isValid: false,},

    bookDescription: {
      value: /^(?=.*[a-zA-Z])[a-zA-Z0-9.,!?\s]{5,25}$/,
      isValid: false,},

    // bookImg: { 
    //       value: /^[a-zA-Z0-9_\s().-]{1,30}\.(jpg|jpeg|png|webp)$/i,
    //       isValid: false}
}

if (localStorage.getItem("booksList") !== null) {
    books = JSON.parse(localStorage.getItem("booksList"))
    displayBooks(books)
    
}

function addBooks() {
    var booksVal = {
        id : books.length,
        name: siteNameInput.value,
        link: siteUrlInput.value,
        description : bookDescriptionInput.value,
        image: bookImgInput.files[0]?.name,
      }
        books.push(booksVal)
        displayBooks(books)   
        localStorage.setItem("booksList", JSON.stringify(books)) 
        
        clearForm()              
}

function displayBooks(list) {

    var cartona = ''
    for (var i = 0; i < list.length; i++){

      if(list[i] == null){
        continue
      }
      
    if (bookSearchInput.value == ""){
      list[i].newBook == null
    }

        cartona += `
        <tr>
      <th scope="row">${i+1}</th>

      <td> ${list[i].newBook ? list[i].newBook  : list[i].name  } </td>

       <td>
      <img src="img/${list[i].image ? list[i].image : "not-found.webp" }" style="width: 50px;" alt="books images">
      </td>

      <td>
        <button class="btn btn-success btn-web" onclick="visit(${i})">
            <i class="fa-solid fa-eye"></i>
            Visit
        </button>
      </td>

      <td>
        <button onclick="deleteBook(${list[i].id})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
            delete
        </button>
      </td>

      <td>
       <button onclick="fillUpdate(${i})" class="btn btn-warning">
          <i class="fa-solid fa-file-pen"></i>
            update
        </button>
      </td>
    </tr>

        `}

        document.getElementById("booksTable").innerHTML = cartona

}

function deleteBook(id){
books[id] = null
displayBooks(books)
localStorage.setItem("booksList", JSON.stringify(books))
}

function visit(index){
    var link = books[index].link
open(link, "_blank")
}

function clearForm(){
  siteNameInput.value= ""
  siteUrlInput.value= ""
  bookImgInput.value= ""
  bookDescriptionInput.value = ""

  siteNameInput.classList.remove("is-valid")
  siteUrlInput.classList.remove("is-valid")
  bookImgInput.classList.remove("is-valid")
  bookDescriptionInput.classList.remove("is-valid")
}

function fillUpdate(index) {
  temp = index
  siteNameInput.value = books[index]?.name
  siteUrlInput.value = books[index]?.link
  bookDescriptionInput.value = books[index]?.description

  submitBtn.classList.add("d-none")
  updateBtn.classList.replace("d-none" , "d-block")
}

function updateBook(){
  books[temp].name = siteNameInput.value
  books[temp].link = siteUrlInput.value
  books[temp].description = bookDescriptionInput.value
  books[temp].image = bookImgInput.files[0]?.name

  displayBooks(books)
localStorage.setItem("booksList", JSON.stringify(books))

 submitBtn.classList.replace("d-none" , "d-block")
  updateBtn.classList.replace("d-block" , "d-none")
  clearForm()
}

function bookSearch(term){
if(term == ""){
  displayBooks(books)
  return
}

var searchItem = []   
for (var i = 0; i < books.length; i++){
  if (books[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
    books[i].newBook = books[i]?.name.replace(term, `<span class="text-danger">${term}</span>`)

    searchItem.push(books[i])
  }

}

displayBooks(searchItem)
}


function validatebookInput(element){

if (regex[element.id].value.test(element.value)){
  element.classList.add("is-valid")
  element.classList.remove("is-invalid")
  regex[element.id].isValid= true
  element.nextElementSibling.classList.replace("d-block" , "d-none")
} else  {
   element.classList.add("is-invalid")
    element.classList.remove("is-valid")
    regex[element.id].isValid= false
    element.nextElementSibling.classList.replace("d-none" , "d-block")

}

if(element.value == ""){
  element.classList.remove("is-invalid")
}

toggleAddBtn()

}

function toggleAddBtn(){
  if (regex.bookMarkName.isValid == true 
    && regex.bookMarkUrl.isValid == true
    && regex.bookDescription.isValid == true
    // && regex.bookImg.isValid == true
  ){
    submitBtn.disabled = false
  }else {
    submitBtn.disabled = true
  }
}