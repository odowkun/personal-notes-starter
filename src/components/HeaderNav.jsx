import React from "react";

const HeaderNav = ({ onSearch }) => {
  return (
    <div className="note-app__header">
      <h1>Notes</h1>
      <div className="note-search">
        <input type="text" placeholder="Search" onChange={(e) => onSearch(e)} />
      </div>
    </div>
  );
};

export default HeaderNav;
