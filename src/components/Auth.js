import { useEffect, useState, createContext } from 'react'
import { auth } from '../firebase.config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser }}>{children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
