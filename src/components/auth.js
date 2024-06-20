import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log(auth)

    const signin = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error)
        }


    }
    const signinWithGoogle = async (e) => {
        e.preventDefault()
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
    }
    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => { setEmail(e.target.value) }} />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <button onClick={signin}>Sign In</button>
            <button onClick={signinWithGoogle}>Sign in with Google</button>
            <button onClick={logOut}>{!auth?.currentUser ? 'Please Sign in First' : 'Log out'}</button>
        </div>
    )
}

