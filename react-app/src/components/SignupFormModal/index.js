import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>

		<form onSubmit={handleSubmit}>
		  <div id='modal-background'>
             <div className="modalContainer2">

             <div className='titleCloseButton2'>
               <button id='titleCloseButton2' onClick={closeModal}>X</button>
             </div>

			  <div className='title2'>Sign Up</div>

			  <div className='errors2'>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				</div>

				<div className='email'>
					Email:
					<input
						placeholder='type your email'
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className='username'>
					Username:
					<input
						placeholder='create your username'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>

				<div className='password'>
					Password:
					<input
						placeholder='create your password'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<div className='ConPass'>
					Confirm Password:
					<input
						placeholder='confrim your password'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>

				<div className='button'>
				<button className='buttonDesign' type="submit">Sign Up</button>
				</div>
			 </div>
			 </div>
			</form>
		</>
	);
}

export default SignupFormModal;
