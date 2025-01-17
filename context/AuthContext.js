"use client"
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsub();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isLoading: user === undefined,
        }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider
export const useAuth = () => useContext(AuthContext);


// React Context is a feature used to share values between components without having to pass props 
// through every level of the component tree.
// It is particularly useful for managing global states like authentication, themes, or settings.

// This code defines an authentication context in a React/Next.js app using Firebase Authentication. It uses React's `createContext` to create a global state
//  for managing the user's authentication status. The `AuthContextProvider` component listens to authentication changes via Firebase's `onAuthStateChanged` and updates the `user` state,
//   which holds the logged-in user's details, `null` for logged-out users, or `undefined` during loading. The context provides `user` and `isLoading` to all wrapped components, 
// enabling easy access to authentication data through the custom `useAuth` hook, simplifying app-wide state management for authentication.