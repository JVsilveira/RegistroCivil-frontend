import "./Casamento.css"
import React, { useEffect, useState } from "react"
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
  const [showInput, setShowInput] = useState(false)
  const [showInput2, setShowInput2] = useState(false)

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
        `https://registrocivilbackend-joaovitorsantossilveira.b4a.run/casamento/inserir`,
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
    fetchEstados4()
  }, [])

  const handleSelectChange = event => {
    const value = event.target.value
    setShowInput(value === "true")
  }
  const handleSelectChange2 = event => {
    const value = event.target.value
    setShowInput2(value === "true")
  }

  console.log(selectedItem)

  return (
    <>
      <div className="ajustePag">
        <div className="casamento">
          <p className="txtCasamento"> Registro de Casamento</p>
          <div className="nubentes">
            <div className="nubente1">
              <div className="nomeCasamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  placeholder="Nome"
                  onChange={handleInputChange}
                  name="nome"
                />
              </div>
              <div className="cpf1Casamento">
                <input
                  type="text"
                  className="input2"
                  size="11"
                  placeholder="CPF"
                  onChange={handleInputChange}
                  name="CPF"
                />
              </div>
              <select
                className="selectEC"
                id="selectEC"
                onChange={e => {
                  handleInputChange(e)
                  handleSelectChange(e)
                }}
                name="estadoCivil"
              >
                <option value="selectEC">Estado Civil</option>
                <option value="solteiro">Solteiro</option>
                <option value="casado">Casado</option>
                <option value="separado">Separado</option>
                <option value="divorciado">Divorciado</option>
                <option value="viuvo">Viúvo</option>
              </select>
              <select
                className="selectTN"
                id="selectValue"
                onChange={handleSelectChange}
              >
                <option value="selectTN">Vai ter troca de nome?</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>

              {showInput && (
                <div className="novoNome1Casamento">
                  <input
                    type="text"
                    className="input2"
                    name="trocaNome"
                    size="40"
                    placeholder="Novo nome"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="natCasamento">
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
              </div>
              <p className="txtDataCas">Data de nascimento </p>
              <div className="diaNascimento">
                <input
                  type="date"
                  className="input2"
                  size="40"
                  name="dataNascimento"
                  onChange={handleInputChange}
                />
              </div>

              <p className="txtEndNasc">Endereço do nubente </p>
              <div className="ruaCasamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  name="rua"
                  placeholder="Rua"
                  onChange={handleInputChange}
                />
              </div>
              <div className="numCasamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  name="num"
                  placeholder="Número"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bairroCasamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  name="bairro"
                  placeholder="Bairro"
                  onChange={handleInputChange}
                />
              </div>
              <div className="selectEstado">
                <select
                  name="uf"
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
                <select onChange={handleInputChange} name="cidade">
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
              <p className="txtDataCas">Dados dos pais </p>
              <div className="nomeMae1Casamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  placeholder="Mãe"
                  name="nomeMae"
                  onChange={handleInputChange}
                />
              </div>
              <div className="nomePai1Casamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  placeholder="Pai"
                  name="nomePai"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="nubente2">
              <div className="nomeCasamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  placeholder="Nome"
                  name="nome1"
                  onChange={handleInputChange}
                />
              </div>
              <div className="cpf1Casamento">
                <input
                  type="text"
                  className="input2"
                  size="11"
                  name="CPF1"
                  placeholder="CPF"
                  onChange={handleInputChange}
                />
              </div>
              <select
                className="selectEC"
                id="selectEC"
                name="estadoCivil1"
                onChange={e => {
                  handleInputChange(e)
                  handleSelectChange2(e)
                }}
              >
                <option value="selectEC">Estado Civil</option>
                <option value="solteiro">Solteiro</option>
                <option value="casado">Casado</option>
                <option value="separado">Separado</option>
                <option value="divorciado">Divorciado</option>
                <option value="viuvo">Viúvo</option>
              </select>

              <select
                className="selectTN"
                id="selectValue"
                onChange={handleSelectChange2}
              >
                <option value="selectTN">Vai ter troca de nome?</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>

              {showInput2 && (
                <div className="novoNome1Casamento">
                  <input
                    type="text"
                    className="input2"
                    size="40"
                    placeholder="Novo nome"
                    name="trocaNome1"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="natCasamento">
                <div className="selectEstado">
                  <select
                    name="natUf1"
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
                  <select onChange={handleInputChange} name="natCidade1">
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
              <p className="txtDataCas">Data de nascimento </p>
              <div className="diaNascimento">
                <input
                  type="date"
                  className="input2"
                  size="40"
                  name="dataNascimento1"
                  placeholder="data"
                  onChange={handleInputChange}
                />
              </div>

              <p className="txtEndNasc">Endereço do nubente </p>
              <div className="ruaCasamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  name="rua1"
                  onChange={handleInputChange}
                  placeholder="Rua"
                />
              </div>
              <div className="numCasamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  name="num1"
                  onChange={handleInputChange}
                  placeholder="Número"
                />
              </div>
              <div className="bairroCasamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  name="bairro1"
                  onChange={handleInputChange}
                  placeholder="Bairro"
                />
              </div>
              <div className="selectEstado">
                <select
                  name="uf1"
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
                <select onChange={handleInputChange} name="cidade1">
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
              <p className="txtDataCas">Dados dos pais </p>
              <div className="nomeMae1Casamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  name="nomeMae1"
                  onChange={handleInputChange}
                  placeholder="Mãe"
                />
              </div>
              <div className="nomePai1Casamento">
                <input
                  type="text"
                  className="input2"
                  size="40"
                  name="nomePai1"
                  onChange={handleInputChange}
                  placeholder="Pai"
                />
              </div>
            </div>
          </div>
          <div className="dadosCasamento">
            <p className="txtDadosCasamento">Dados do Casamento</p>
            <div className="dataCasamento">
              <div className="diaCasamento">
                <input
                  type="date"
                  className="input"
                  size="40"
                  name="dataCasamento"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="regimeBens">
              <input
                type="text"
                className="input2"
                size="40"
                placeholder="Regime de Bens"
                name="regimeBens"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="botaoCasamento">
            <button onClick={handleInsert} className="enviar">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
