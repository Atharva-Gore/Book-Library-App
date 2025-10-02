let books = JSON.parse(localStorage.getItem("books")) || [];

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const status = document.getElementById("status").value;

  if (title === "" || author === "") {
    alert("Please fill all fields!");
    return;
  }

  const book = { title, author, status };
  books.push(book);
  saveBooks();
  renderBooks();

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("status").value = "unread";
}

function renderBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  books.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";

    bookDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>👤 ${book.author}</p>
      <p class="status ${book.status}">📖 ${book.status}</p>
      <div class="actions">
        <button onclick="toggleStatus(${index})">Toggle Status</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </div>
    `;

    bookList.appendChild(bookDiv);
  });
}

function toggleStatus(index) {
  books[index].status = books[index].status === "read" ? "unread" : "read";
  saveBooks();
  renderBooks();
}

function deleteBook(index) {
  if (confirm("Delete this book?")) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
  }
}

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function searchBooks() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = books.filter(book => book.title.toLowerCase().includes(query));
  renderFilteredBooks(filtered);
}

function filterBooks() {
  const filter = document.getElementById("filter").value;
  let filtered = books;
  if (filter !== "all") {
    filtered = books.filter(book => book.status === filter);
  }
  renderFilteredBooks(filtered);
}

function renderFilteredBooks(list) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  list.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";

    bookDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>👤 ${book.author}</p>
      <p class="status ${book.status}">📖 ${book.status}</p>
      <div class="actions">
        <button onclick="toggleStatus(${index})">Toggle Status</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </div>
    `;

    bookList.appendChild(bookDiv);
  });
}

window.onload = renderBooks;
