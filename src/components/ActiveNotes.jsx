import React from "react";
import { showFormattedDate } from "../utils";

const ActiveNotes = ({ notes, onDelete, onChangeArchive }) => {
  const activeNotes = !notes.length
    ? []
    : notes.filter((note) => note.archived === false);

  return (
    <>
      <h2>Buat Catatan</h2>
      {activeNotes.length === 0 ? (
        <p className="notes-list__empty-message">Catatan Kosong</p>
      ) : (
        <div className="notes-list">
          {activeNotes.map((note, idx) => {
            return (
              <div className="note-item" key={idx}>
                <div className="note-item__content">
                  <h3 className="note-item__title">{note.title}</h3>
                  <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
                  <p className="note-item__body">{note.body}</p>
                </div>
                <div className="note-item__action">
                  <button
                    className="note-item__delete-button"
                    onClick={() => onDelete(note.id)}
                  >
                    Hapus
                  </button>
                  <button
                    className="note-item__archive-button"
                    onClick={() => onChangeArchive(note.id)}
                  >
                    {!note.archived ? "Arsip" : "Pindahkan"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ActiveNotes;
