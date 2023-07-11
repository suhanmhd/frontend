import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Error.css'

function Error() {

  const navigate = useNavigate()

  function handleBackButtonClick() {
    navigate(-1);
}
  return (
    <div>
      <img className='imgg' src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" alt='error'/>
      <h1 className="error-text">Whoops, We can't seem to find the resource you're looking for.</h1>
      <p className="text">Please check that the Web site address is spelled correctly.Or,</p>
        <button className="error button" onClick={handleBackButtonClick}>
          Click here to go back
        </button>
    </div>
  )
}

export default Error
