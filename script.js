let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes(filtered = notes) {
  let container = document.getElementById("notes");
  container.innerHTML = "";

  filtered.forEach((note, index) => {
    container.innerHTML += `
      <div class="card">
        <h4>${note.subject}</h4>
        <h3>${note.title}</h3>
        <a href="${note.file}" target="_blank">View</a><br>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
  });
}

function addNote() {
  let subject = document.getElementById("subject").value;
  let title = document.getElementById("title").value;
  let file = document.getElementById("file").files[0];

  if (!subject || !title || !file) {
    alert("Fill all fields");
    return;
  }

  let reader = new FileReader();

  reader.onload = function(e) {
    notes.push({
      subject: subject,
      title: title,
      file: e.target.result
    });

    saveNotes();
    renderNotes();
  };

  reader.readAsDataURL(file);
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function searchNotes(query) {
  let filtered = notes.filter(n =>
    n.title.toLowerCase().includes(query.toLowerCase()) ||
    n.subject.toLowerCase().includes(query.toLowerCase())
  );

  renderNotes(filtered);
}

renderNotes();
function toggleMode() {
    document.body.classList.toggle("dark");
}