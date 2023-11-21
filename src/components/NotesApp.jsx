import React from "react";
import { getInitialData } from "../utils";
import AddNotes from "./AddNotes";
import ActiveNotes from "./ActiveNotes";
import HeaderNav from "./HeaderNav";
import ArchiveNotes from "./ArchiveNotes";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchNotes: getInitialData(),
    };

    this.onDelete = this.onDelete.bind(this);
    this.onChangeArchive = this.onChangeArchive.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onAddNote = this.onAddNote.bind(this);
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
  }

  onChangeArchive(id) {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.map((note) =>
          note.id == id ? { ...note, archived: !note.archived } : note
        ),
        searchNotes: prevState.searchNotes.map((note) =>
          note.id == id ? { ...note, archived: !note.archived } : note
        ),
      };
    });
  }

  onDelete(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    const searchNotes = this.state.searchNotes.filter((note) => note.id !== id);
    this.setState({
      notes: notes,
      searchNotes: searchNotes,
    });
  }

  onSearch(e) {
    this.setState((prevState) => {
      return {
        searchNotes: prevState.notes.filter((note) =>
          note.title.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      };
    });
  }

  addToLocalStorage({ title, body }) {
    this.onAddNote({ title, body });
  }

  onAddNote({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
          },
        ],
        searchNotes: [
          ...prevState.searchNotes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });
  }

  render() {
    return (
      <>
        <HeaderNav onSearch={this.onSearch} />
        {localStorage.setItem("NOTES_APP", JSON.stringify(this.state.notes))}
        <div className="note-app__body">
          <AddNotes addNote={this.addToLocalStorage} />
          <ActiveNotes
            notes={this.state.searchNotes}
            onDelete={this.onDelete}
            onChangeArchive={this.onChangeArchive}
          />
          <ArchiveNotes
            notes={this.state.searchNotes}
            onDelete={this.onDelete}
            onChangeArchive={this.onChangeArchive}
          />
        </div>
      </>
    );
  }
}

export default NotesApp;
