import React, { useState } from "react"
import axios from "axios"
import "./Login.css"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../main/AuthContext"

export default () => {
  const [selectedItem, setSelectedItem] = useState({})
  const [error, setError] = useState(false)
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const cadastrar = async () => {
    navigate("/cadastrar")
  }

  const handleInsert = async () => {
    try {
      const response = await axios.post(
        "https://registro-civil-backend.vercel.app/signin",
        selectedItem
      )

      const newToken = response.data.token
      setToken(newToken)
      navigate("/Home")
    } catch {
      setError(true)
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setSelectedItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }))
  }

  return (
    <div className="Login">
      <div className="menuLogin">
        Usuário
        <br />
        <input
          type="text"
          className="inputLogin"
          size="40"
          name="nome"
          onChange={handleInputChange}
        />
        <br />
        Senha
        <br />
        <input
          type="password"
          className="inputLogin"
          size="40"
          name="password"
          onChange={handleInputChange}
        />
        <br />
        <div>
          <button onClick={cadastrar}>Cadastrar</button>

          <button onClick={handleInsert}>Acessar</button>
        </div>
        <br />
        {error && <p className="error-message">Usuário ou senha inválidos</p>}
      </div>
    </div>
  )
}
