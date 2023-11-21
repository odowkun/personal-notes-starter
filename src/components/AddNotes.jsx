import React from "react";

class AddNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: { title: "", body: "" },
      titleLimit: { inputTitle: "", limit: 50, char: 50 },
    };

    this.onTitleChangeEvent = this.onTitleChangeEvent.bind(this);
    this.onBodyChangeEvent = this.onBodyChangeEvent.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
  }

  onBodyChangeEvent(event) {
    this.setState((prevState) => {
      return {
        ...prevState,
        note: {
          ...prevState.note,
          body: event.target.value,
        },
      };
    });
  }

  onTitleChangeEvent(event) {
    if (event.target.value.length <= 50) {
      this.setState((prevState) => {
        return {
          titleLimit: {
            ...prevState.titleLimit,
            inputTitle: event.target.value,
            char: prevState.titleLimit.limit - event.target.value.length,
          },
          note: {
            ...prevState.note,
            title: event.target.value,
          },
        };
      });
    }
  }

  onSubmitEvent(event) {
    event.preventDefault();
    this.props.addNote(this.state.note);
    this.setState((prevState) => {
      return {
        note: {
          title: "",
          body: "",
        },
        titleLimit: {
          ...prevState.titleLimit,
          inputTitle: "",
          char: 50,
        },
      };
    });
  }

  render() {
    return (
      <div className="note-input">
        <h2>Tambah Note</h2>
        <form onSubmit={this.onSubmitEvent}>
          <p
            className={`note-input__title__char-limit ${
              this.state.titleLimit.char === 0 ? "zero" : ""
            }`}
          >
            Sisa karakter : {this.state.titleLimit.char}
          </p>
          <input
            className="note-input__title"
            type="text"
            value={this.state.note.title}
            onChange={this.onTitleChangeEvent}
            placeholder="Title"
            required
          />
          <textarea
            className="note-input__body"
            type="text"
            value={this.state.note.body}
            onChange={this.onBodyChangeEvent}
            placeholder="Type your note here"
            required
          />
          <button type="submit">Buat Catatan</button>
        </form>
      </div>
    );
  }
}

export default AddNotes;
