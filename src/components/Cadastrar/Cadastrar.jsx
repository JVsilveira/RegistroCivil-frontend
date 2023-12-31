import axios from "axios"
import "./Cadastrar.css"
import React, { useState } from "react"

export default () => {
  const [selectedItem, setSelectedItem] = useState([])

  const handleInsert = async () => {
    try {
      await axios.post(
        "https://registrocivilbackend-joaovitorsantossilveira.b4a.run/signup",
        selectedItem
      )
      alert("Dados inseridos com sucesso")
    } catch (error) {
      alert("Erro ao inserir os dados: " + error.response.data.message)
    }
  }

  const handleInputChange = async event => {
    const { name, value } = event.target
    await setSelectedItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }))
  }

  return (
    <div className="Cadastrar">
      <div className="menuCadastrar">
        <input
          type="text"
          className="inputLogin"
          size="40"
          placeholder="Usuário"
          name="nome"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          type="text"
          className="inputLogin"
          size="11"
          placeholder="CPF"
          name="CPF"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          type="text"
          className="inputLogin"
          size="40"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          type="password"
          className="inputLogin"
          size="11"
          placeholder="Senha"
          name="password"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          type="password"
          className="inputLogin"
          size="40"
          placeholder="Repita a senha"
          name="confirmPassword"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <select
          className="selectAdmin"
          id="selectAdmin"
          name="admin"
          onChange={handleInputChange}
        >
          <option value="selectAdmin">O usuário é administrador?</option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </select>
        <br />
        <br />
        <button onClick={handleInsert} className="botaoCadastro">
          Cadastrar
        </button>
      </div>
    </div>
  )
}
