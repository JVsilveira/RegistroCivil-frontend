import "./Obito.css"
import React, { useState, useEffect } from "react"
import axios from "axios"

export default () => {
  const [estados, setEstados] = useState([])
  const [estados2, setEstados2] = useState([])
  const [estados3, setEstados3] = useState([])
  const [cidades, setCidades] = useState([])
  const [cidades2, setCidades2] = useState([])
  const [cidades3, setCidades3] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const [showInput, setShowInput] = useState(false)

  const fetchEstados = async () => {
    try {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      setEstados(response.data)
    } catch (error) {
      console.error("Erro ao obter a lista de estados:", error)
    }
  }

  const fetchEstados2 = async () => {
    try {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      setEstados2(response.data)
    } catch (error) {
      console.error("Erro ao obter a lista de estados:", error)
    }
  }

  const fetchEstados3 = async () => {
    try {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      setEstados3(response.data)
    } catch (error) {
      console.error("Erro ao obter a lista de estados:", error)
    }
  }

  const handleEstadoSelect = async event => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    const selectedId = selectedOption.getAttribute("data-id")

    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedId}/municipios`
      )
      setCidades(response.data)
    } catch (error) {
      console.error("Erro ao obter a lista de cidades:", error)
    }
  }

  const handleEstadoSelect2 = async event => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    const selectedId = selectedOption.getAttribute("data-id")

    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedId}/municipios`
      )
      setCidades2(response.data)
    } catch (error) {
      console.error("Erro ao obter a lista de cidades:", error)
    }
  }

  const handleEstadoSelect3 = async event => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    const selectedId = selectedOption.getAttribute("data-id")

    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedId}/municipios`
      )
      setCidades3(response.data)
    } catch (error) {
      console.error("Erro ao obter a lista de cidades:", error)
    }
  }

  const handleInputChange = async event => {
    const { name, value } = event.target
    await setSelectedItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }))
  }

  const handleInsert = async () => {
    try {
      await axios.post(
        `https://registrocivilbackend-joaovitorsantossilveira.b4a.run/obito/inserir`,
        selectedItem
      )
      alert("Dados inseridos com sucesso.")
    } catch (error) {
      console.error("Erro ao inserir os dados:", error)
    }
  }

  useEffect(() => {
    fetchEstados()
    fetchEstados2()
    fetchEstados3()
  }, [])

  const handleSelectChange = event => {
    const value = event.target.value
    setShowInput(value === "true")
  }

  return (
    <>
      <div className="ajustePag">
        <div className="obito">
          <p className="registroObito"> Registro de Óbito</p>
          <div className="gavetao">
            <div className="gaveta4">
              <input
                type="text"
                className="input2"
                placeholder="Nome"
                name="nome"
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="input2"
                placeholder="Benefício"
                name="beneficio"
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="input2"
                placeholder="CPF"
                name="CPF"
                onChange={handleInputChange}
              />

              <select
                className="selectEC"
                id="selectEC"
                name="estadoCivil"
                onChange={handleInputChange}
              >
                <option value="selectEC">Estado Civil</option>
                <option value="solteiro">Solteiro</option>
                <option value="casado">Casado</option>
                <option value="separado">Separado</option>
                <option value="divorciado">Divorciado</option>
                <option value="viuvo">Viúvo</option>
              </select>
            </div>

            <div className="gaveta5">
              <input
                type="text"
                className="input2"
                placeholder="Nome do Pai"
                name="pai"
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="input2"
                placeholder="Nome da Mãe"
                name="mae"
                onChange={handleInputChange}
              />
              <select
                className="selectFilhos"
                id="selectFilhos"
                onChange={handleSelectChange}
              >
                <option value="selectFilhos">Deixou filhos?</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>

              {showInput && (
                <div className="nomeFilhos">
                  <input
                    type="text"
                    className="input"
                    size="40"
                    placeholder="Nome dos filhos"
                    name="nomeFilhos"
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            <div className="gaveta6">
              <div className="selectEstado">
                <select
                  name="natUf"
                  onChange={e => {
                    handleInputChange(e)
                    handleEstadoSelect(e)
                  }}
                >
                  <option>Naturalidade: Estado</option>
                  {estados.map(estado => (
                    <option
                      key={estado.id}
                      value={estado.nome}
                      data-id={estado.id}
                    >
                      {estado.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="selectCidade">
                <select onChange={handleInputChange} name="natCidade">
                  <option>Naturalidade: cidade</option>
                  {cidades.map(cidade => (
                    <option
                      key={cidade.id}
                      value={cidade.nome}
                      data-id={cidade.id}
                    >
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dataNascimentoObito">
                Data de nascimento
                <input
                  type="date"
                  className="input"
                  size="40"
                  name="dataNascimento"
                  onChange={handleInputChange}
                />
              </div>
              <div className="dataNascimentoObito">
                Data de falecimento
                <input
                  type="date"
                  className="input"
                  size="40"
                  name="dataObito"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="gaveta7">
            <p className="txtEndObito">Endereço do falecido </p>
            <div className="ruaObito">
              <input
                type="text"
                className="input"
                size="40"
                placeholder="Rua"
                name="rua"
                onChange={handleInputChange}
              />
            </div>
            <div className="numObito">
              <input
                type="text"
                className="input"
                size="40"
                placeholder="Número"
                name="num"
                onChange={handleInputChange}
              />
            </div>
            <div className="bairroObito">
              <input
                type="text"
                className="input"
                size="40"
                placeholder="Bairro"
                name="bairro"
                onChange={handleInputChange}
              />
            </div>
            <div className="selectEstado">
              <select
                name="uf"
                className="input"
                onChange={e => {
                  handleInputChange(e)
                  handleEstadoSelect2(e)
                }}
              >
                <option>Naturalidade: Estado</option>
                {estados2.map(estado => (
                  <option
                    key={estado.id}
                    value={estado.nome}
                    data-id={estado.id}
                  >
                    {estado.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="selectCidade">
              <select
                className="input"
                onChange={handleInputChange}
                name="cidade"
              >
                <option>Naturalidade: cidade</option>
                {cidades2.map(cidade => (
                  <option
                    key={cidade.id}
                    value={cidade.nome}
                    data-id={cidade.id}
                  >
                    {cidade.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="gaveta8">
            <p className="txtEndObitoFalecimento">Endereço do falecimento </p>
            <div className="ruaObitoFalecimento">
              <input
                type="text"
                className="input"
                size="40"
                placeholder="Rua"
                name="ruaFalecimento"
                onChange={handleInputChange}
              />
            </div>
            <div className="numObitoFalecimento">
              <input
                type="text"
                className="input"
                size="40"
                placeholder="Número"
                onChange={handleInputChange}
                name="numFalecimento"
              />
            </div>
            <div className="bairroObitoFalecimento">
              <input
                type="text"
                className="input"
                size="40"
                placeholder="Bairro"
                name="bairroFalecimento"
                onChange={handleInputChange}
              />
            </div>
            <div className="selectEstadoObitoFalecimento">
              <select
                name="ufFalecimento"
                className="input"
                onChange={e => {
                  handleInputChange(e)
                  handleEstadoSelect3(e)
                }}
              >
                <option>Naturalidade: Estado</option>
                {estados3.map(estado => (
                  <option
                    key={estado.id}
                    value={estado.nome}
                    data-id={estado.id}
                  >
                    {estado.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="selectCidadeObitoFalecimento">
              <select
                className="input"
                onChange={handleInputChange}
                name="cidadeFalecimento"
              >
                <option>Naturalidade: cidade</option>
                {cidades3.map(cidade => (
                  <option
                    key={cidade.id}
                    value={cidade.nome}
                    data-id={cidade.id}
                  >
                    {cidade.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="botaoCasamento">
            <button onClick={handleInsert}>Enviar</button>
          </div>
        </div>
      </div>
    </>
  )
}
