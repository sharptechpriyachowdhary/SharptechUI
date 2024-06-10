import React, { useState } from 'react';

const Dimond = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters except for the dot
    inputValue = inputValue.replace(/[^\d.]/g, '');

    // Ensure the value always starts with '$' if it's not empty
    if (inputValue !== '' && !inputValue.startsWith('$')) {
      inputValue = '$' + inputValue;
    }

    // Update state
    setValue(inputValue);
  };

  return (
    <div>
      <div>this dimond</div>
       <h1>this is gayathri testing commit</h1>
       <h1>this is gayathri testing commit-2</h1>
       <h1>This is the thisr one</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter amount"
      />
      
    </div>
  );
};

export default Dimond;
