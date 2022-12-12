import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [isRegistering, setIsRegistering] = useState(false)
    const [registerInformation, setRegisterInformation] = useState({
        email : '',
        name: '',
        password : '',
        confirmPassword : ''

    })
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/main')
            }
        })
    }, [])

    const handleEmailChange = (e) => {
        setEmail(e.target.value)

    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)

    }
    const handleSignIn = async () => {
        signInWithEmailAndPassword(auth, email, password).then(() => { // using the import from the firebase library to handle signin 
            navigate('/main') // navigate if the sign in is valid
        }).catch((err) => { // asynchronous operation to catch error in code 
            alert(err.message) // if it did catch error will be sent
        })
    }

    const handleRegister = async () => {
        if(registerInformation.password !== registerInformation.confirmPassword){ // checks if the password the same as the confirmpassword
            alert('Password is not the same')
            return
        }
        createUserWithEmailAndPassword(auth,registerInformation.email,registerInformation.password).then(() =>{ /* import from the firebase library
                                                                                                       to handle creating an account for the user */
            navigate('/main')
        }).catch((err) => alert(err.message)) // again catches error and the asynchronous operation happens here 
    }

    return (
        <div className='container'>
            <div>
                {isRegistering ?
                    <>
                        <h1>Register</h1>

                        <input type="email" placeholder="Email" id='email' value={registerInformation.email} onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})} />
                        <input type="password" id="password" placeholder="Password" value={registerInformation.password} onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})}/>
                        <input type="password" id="password" placeholder="Confirm Password" value={registerInformation.confirmPassword} onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})}/>
                        <button onClick={handleRegister}>Register</button>
                        <button onClick={() => setIsRegistering(false)}>Login</button>
                        <p className="error"></p>
                    </> :
                    <>
                        <h1>Login</h1>

                        <input type="email" placeholder="Email" id='email' onChange={handleEmailChange} value={email} />
                        <input type="password" id="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                        <button onClick={handleSignIn}>SignIn</button>
                        
                        <p className="error"></p>
                        <button onClick={() => setIsRegistering(true)}>Register</button>
                    </>

                }

            </div>
        </div>
    )
}
