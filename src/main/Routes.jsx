import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./AuthContext" // Importe o AuthProvider
import Login from "../components/login/Login"
import Home from "../components/home/Home"
import Main from "../components/templates/Main"
import Nascimento from "../components/nascimento/Nascimento"
import Cadastro from "../components/cadastro/Cadastro"
import Casamento from "../components/casamento/Casamento"
import Obito from "../components/obito/Obito"
import Busca from "../components/busca/Busca"
import { PrivateRoute } from "./PrivateRoute"

export default () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/Home"
          element={
            <Main>
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            </Main>
          }
        />

        <Route
          path="/Nascimento"
          element={
            <Main>
              <PrivateRoute>
                <Nascimento />
              </PrivateRoute>
            </Main>
          }
        />

        <Route
          path="/Casamento"
          element={
            <Main>
              <PrivateRoute>
                <Casamento />
              </PrivateRoute>
            </Main>
          }
        />

        <Route
          path="/Obito"
          element={
            <Main>
              <PrivateRoute>
                <Obito />
              </PrivateRoute>
            </Main>
          }
        />

        <Route
          path="/Busca"
          element={
            <Main>
              <PrivateRoute>
                <Busca />
              </PrivateRoute>
            </Main>
          }
        />

        <Route
          path="/Cadastro"
          element={
            <Main>
              <PrivateRoute>
                <Cadastro />
              </PrivateRoute>
            </Main>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
