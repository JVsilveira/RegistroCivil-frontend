import React, { useEffect } from "react"
import { Route, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

export function PrivateRoute({ children }) {
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || token.length === 0) {
      navigate("/")
    }
  }, [token, navigate])

  return token ? children : null
}
