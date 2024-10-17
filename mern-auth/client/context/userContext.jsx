import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/profile')
        setUser(data)
      } catch (error) {
        console.log('Error fetching user profile:', error)
      }
    }

    if (!user) {
      fetchUserProfile()
    }
  }, [user]) // Fetch user profile whenever user state changes

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
