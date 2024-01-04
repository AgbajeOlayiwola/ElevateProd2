import * as React from "react";
const IconDelete = ( { handleDelete } ) => (
  <svg
    width={ 36 }
    onClick={ handleDelete }
    height={ 36 }
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={ { cursor: 'pointer' } }

  >
    <rect width={ 36 } height={ 36 } rx={ 18 } fill="#FF0000" fillOpacity={ 0.15 } />
    <path
      d="M21.3337 15.5V23.8333H14.667V15.5H21.3337ZM20.0837 10.5H15.917L15.0837 11.3333H12.167V13H23.8337V11.3333H20.917L20.0837 10.5ZM23.0003 13.8333H13.0003V23.8333C13.0003 24.75 13.7503 25.5 14.667 25.5H21.3337C22.2503 25.5 23.0003 24.75 23.0003 23.8333V13.8333Z"
      fill="#FF0000"
    />
  </svg>
);
export default IconDelete;
