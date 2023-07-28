import "./Nav.css"
import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../main/AuthContext"

export default () => {
  const { token } = useAuth()

  return (
    <div className="nav">
      <nav className="menu">
        {token && (
          <>
            <Link to="/Home">
              <i className="inicio"></i>Início
            </Link>

            <Link to="/Nascimento">
              <i className="navNascimento"></i>Registrar Nascimento
            </Link>
            <Link to="/Casamento">
              <i className="navCasamento"></i>Registrar Casamento
            </Link>
            <Link to="/Obito">
              <i className="navObito"></i>Registrar Óbito
            </Link>

            <Link to="/Cadastro">
              <i className="navCadastro"></i>Cadastro de Usuário
            </Link>
            <Link to="/Busca">
              <i className="navBusca"></i>Buscar Registro
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}
