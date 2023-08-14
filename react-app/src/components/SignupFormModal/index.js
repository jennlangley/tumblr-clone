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
		  <div id='modalBackground'>
             <div className="modalContainer editpost">
				<div className='titleCloseButton'>
				<button id='titleCloseButton' onClick={closeModal}>X</button>
				</div>
			  <div className='title'>Sign Up</div>
				<div className='errors'>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				</div>
			<div className="loginInputs">
				<div className='email'>
					<span>Email:</span>
					<input
						className="input"
						placeholder='Enter your email'
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className='username'>
					<span>Username:</span>
					<input
						className="input"
						placeholder='Enter your username'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>

				<div className='password'>
					<span>Password:</span>
					<input
						className="input"
						placeholder='Create a password'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<div className='ConPass'>
					<span>Confirm Password:</span>
					<input
						className="input"
						placeholder='Confirm your password'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
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
