import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { getToken } from "shared/api"
export const MainPage = () => {
  const [isLogged, setIsLogged] = useState<string>('')
  useEffect(() => {
    const initCheck = async () => setIsLogged(await getToken() ? '/books' : '/auth')
    initCheck()
  },[])
  return (
    <Navigate to={isLogged} replace/>
  )
}
