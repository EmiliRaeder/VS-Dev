document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s"){
        e.preventDefault();
   
    }
});

const Container = document.getElementById("container");
let selectedText = "",
rangeAt = "";

let noteData = JSON.parse(localStorage.getItem("noteData")) || [];

readNoteData();
function readNoteData() {
    console.log(noteData);
}

function createNote() {
    let div = document.createElement("div");
    div.classList.add("note-row");
    let newNoteHTML = `
        <div class="note-editor" contenteditable="true" onmouseup="getSelectedText()" id="note-editor"></div>
        <div class="note-controls">
            <div onclick="getSelectedStyle('capitalize')" class="capitalize">Aa</div>
            <div onclick="getSelectedStyle('bold')" class="bold">B</div>
            <div onclick="getSelectedStyle('italic')" class="italic">I</div>
            <div onclick="getSelectedStyle('underline')" class="underline">U</div>
            <div onclick="getSelectedStyle('lineThrough')" class="lineThrough">ab</div>
            <hr />
            <img src="delete.png" onclick="deleteNote(this)"/>
        </div>
    `;

    div.innerHTML = newNoteHTML;
    Container.appendChild(div);
    saveNotes();
}

function getSelectedText() {
    selectedText = window.getSelection().toString();
    rangeAt = window.getSelection().getRangeAt(0);
}

function getSelectedStyle(e) {
    if (selectedText) {
        let div = document.createElement("span");
        div.classList.add(e);
        div.innerHTML = selectedText;
        rangeAt.deleteContents();
        rangeAt.insertNode(div);
    }
}

function deleteNote(e) {
    let conform = confirm("Are you sure you want to delete this note?");
    if (conform) {
        e.parentElement.parentElement.remove();
    }
    saveNotes();
}





// Make the function available globally
window.createNote = createNote;
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-editor').forEach(note => {
        notes.push(note.innerHTML);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach(content => {
        let div = document.createElement("div");
        div.classList.add("note-row");
        div.innerHTML = `
            <div class="note-editor" contenteditable="true" onmouseup="getSelectedText()" id="note-editor"></div>
        <div class="note-controls">
            <div onclick="getSelectedStyle('capitalize')" class="capitalize">Aa</div>
            <div onclick="getSelectedStyle('bold')" class="bold">B</div>
            <div onclick="getSelectedStyle('italic')" class="italic">I</div>
            <div onclick="getSelectedStyle('underline')" class="underline">U</div>
            <div onclick="getSelectedStyle('lineThrough')" class="lineThrough">ab</div>
            <hr />
            <img src="delete.png" onclick="deleteNote(this)"/>
        </div>
        `;
        div.querySelector('.note-editor').innerHTML = content; // Set saved content
        Container.appendChild(div);
    });
}
// Save when typing in any note
Container.addEventListener('input', function(e) {
    if (e.target.classList.contains('note-editor')) {
        saveNotes();
    }
});
loadNotes();