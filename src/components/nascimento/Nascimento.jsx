import "./Nascimento.css"
import React, { useState, useEffect } from "react"
import axios from "axios"

export default () => {
  const [estados, setEstados] = useState([])
  const [estados2, setEstados2] = useState([])
  const [estados3, setEstados3] = useState([])
  const [estados4, setEstados4] = useState([])
  const [cidades, setCidades] = useState([])
  const [cidades2, setCidades2] = useState([])
  const [cidades3, setCidades3] = useState([])
  const [cidades4, setCidades4] = useState([])
  const [selectedItem, setSelectedItem] = useState([])

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

  const fetchEstados4 = async () => {
    try {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      setEstados4(response.data)
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

  const handleEstadoSelect4 = async event => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    const selectedId = selectedOption.getAttribute("data-id")

    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedId}/municipios`
      )
      setCidades4(response.data)
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
        `https://registrocivilbackend-joaovitorsantossilveira.b4a.run/nascimento/inserir`,
        selectedItem
      )
      alert("Dados inseridos com sucesso.")
    } catch (error) {
      alert("Erro ao inserir os dados: " + error.response.data.message)
    }
  }

  useEffect(() => {
    fetchEstados()
    fetchEstados2()
    fetchEstados3()
    fetchEstados4()
  }, [])

  return (
    <>
      <div className="ajustePag">
        <div className="nascimento">
          <p className="registroNascimento">Registro de Nascimento</p>
          <div className="superior">
            <div className="gaveta1">
              <p className="txtDadosNasc">Dados do Registrado:</p>
              <div className="nomeNascimento">
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="input"
                  size="40"
                  name="nome"
                  placeholder="Nome"
                />
              </div>
              <div className="cpfNascimento">
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="input"
                  size="11"
                  name="CPF"
                  placeholder="CPF"
                />
              </div>
              <div className="natNascimento">
                <div className="selectEstado">
                  <select
                    name="natUf"
                    className="input"
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
                  <select
                    className="input"
                    onChange={handleInputChange}
                    name="natCidade"
                  >
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
              </div>
            </div>
            <div className="gaveta2">
              <div className="dataNascimento">
                <p className="txtDataNasc">Data de nascimento: </p>
                <div className="diaNascimento">
                  <input
                    type="date"
                    className="input"
                    size="40"
                    placeholder="Dia"
                    name="dataNascimento"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="horarioNascimento">
                <input
                  type="time"
                  className="input"
                  name="hora"
                  size="40"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="gaveta3">
              <p className="txtEndNasc">Endereço do registrado:</p>
              <div className="ruaNascimento">
                <input
                  type="text"
                  className="input"
                  size="40"
                  placeholder="Rua"
                  name="rua"
                  onChange={handleInputChange}
                />
              </div>
              <div className="numNascimento">
                <input
                  type="text"
                  name="num"
                  className="input"
                  size="40"
                  placeholder="Número"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bairroNascimento">
                <input
                  type="text"
                  className="input"
                  size="40"
                  name="bairro"
                  placeholder="Bairro"
                  onChange={handleInputChange}
                />
              </div>
              <div className="selectEstado">
                <select
                  id="estadoSelect"
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
          </div>

          <div className="interiorNascimento">
            <div className="esquerda">
              Dados da Mãe
              <div className="dadosMae">
                <div className="nomeMaeNasc">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Mãe"
                    name="nomeMae"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="nomeAvoM">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Avó Materna"
                    onChange={handleInputChange}
                    name="maeMae"
                  />
                </div>
                <div className="nomeAvoM">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Avô Materno"
                    onChange={handleInputChange}
                    name="paiMae"
                  />
                </div>
              </div>
              <div className="endMae">
                <div className="ruaMaeNasc">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Rua"
                    onChange={handleInputChange}
                    name="ruaMae"
                  />
                </div>
                <div className="numMaeNasc">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Número"
                    onChange={handleInputChange}
                    name="numMae"
                  />
                </div>
                <div className="bairroMaeNasc">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Bairro"
                    name="bairroMae"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="selectEstado">
                  <select
                    id="estadoSelect"
                    name="ufMae"
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
                <div className="selectCidade">
                  <select onChange={handleInputChange} name="cidadeMae">
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
            </div>
            <div className="direita">
              Dados do Pai
              <div className="dadosPai">
                <div className="nomePaiNasc">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Pai"
                    name="nomePai"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="nomeAvoP">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    name="maePai"
                    placeholder="Avó Paterna"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="nomeAvoP1">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    name="paiPai"
                    placeholder="Avô Paterno"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="endPai">
                <div className="ruaPaiNasc">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    name="ruaPai"
                    placeholder="Rua"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="numPaiNasc">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Número"
                    name="numPai"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="bairroPaiNasc">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    name="bairroPai"
                    placeholder="Bairro"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="selectEstado">
                  <select
                    id="estadoSelect"
                    name="ufPai"
                    onChange={e => {
                      handleInputChange(e)
                      handleEstadoSelect4(e)
                    }}
                  >
                    <option>Naturalidade: Estado</option>
                    {estados4.map(estado => (
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
                  <select onChange={handleInputChange} name="cidadePai">
                    <option>Naturalidade: cidade</option>
                    {cidades4.map(cidade => (
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
            </div>
          </div>

          <div className="enviar">
            <button onClick={handleInsert}> Enviar</button>
          </div>
        </div>
      </div>
    </>
  )
}
