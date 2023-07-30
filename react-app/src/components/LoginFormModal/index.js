import React, { useState,  } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault()
    dispatch(login('demo@aa.io','password'))
    .then(closeModal())
  }

  return (
    <>

    <form onSubmit={handleSubmit}>
       <div className='modalBackground'>
         <div className="modalContainer">
           <div className='titleCloseButton'>
          <button onClick={closeModal}>X</button>
          </div>
      <div className='title'>Log In</div>

        <div className='errorsBox'>
        <ul className='errors'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        </div>


        <div className='email'>

          <span>Email:   </span>
          <input className='input'
            placeholder='username or email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>

        <div className='password'>

          <span>Password: </span>
          <input className='input'
            placeholder='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>

        </div>
        <div className='footer'>
          <div><button className='LogIn'>Log In</button></div>
          <div><button className='Demo' onClick={loginDemo}>Demo User</button></div>


           {/* {disable ? (
            <button id='isDisabled' disabled={disable} >Log In</button>
            ) : (
             <button disabled={disable} >Log In</button>
             )}

          <button id='cancelButton' onClick={closeModal}>Cancel</button> */}
          </div>
        </div>

      </form>
    </>
  );
}

export default LoginFormModal;
