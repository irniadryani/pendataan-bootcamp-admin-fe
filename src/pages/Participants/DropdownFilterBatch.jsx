import React, { useState } from 'react'

export default function DropdownFilterBatch() {
    const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');

  const toggleShow = () => {
    setShow(!show);
  };

  const filterFunction = (event) => {
    setSearch(event.target.value);
  };

  const links = ['About', 'Base', 'Blog', 'Contact', 'Custom', 'Support', 'Tools'];

  return (
   <div className="dropdown">
      <button onClick={toggleShow} className="dropbtn">Dropdown</button>
      {show && (
        <div id="myDropdown" className="dropdown-content">
          <input type="text" placeholder="Search.." id="myInput" value={search} onChange={filterFunction} />
          {links.filter(link => link.toLowerCase().includes(search.toLowerCase())).map((link, index) => (
            <a key={index} href={`#${link.toLowerCase()}`}>{link}</a>
          ))}
        </div>
      )}
    </div>
  );
};
