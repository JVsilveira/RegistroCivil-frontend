import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./Busca.css"
import axios from "axios"
import { deburr } from "lodash"
import moment from "moment"

export default () => {
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("selecioneBusca")
  const [data, setData] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemDelete, setSelectedItemDelete] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [nome, setNome] = useState("")
  const [nomeDelete, setNomeDelete] = useState(null)

  const nomeDeleteCerto = deburr(nomeDelete)
  const buscaCerta = deburr(busca)
  const nomeCerto = deburr(nome)

  const pegaTexto = e => {
    setBusca(e.target.value)
  }

  const pegaSelect = e => {
    setTipo(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (tipo === "selecioneBusca") {
      toast.warning("Selecione o que deseja buscar.")
      return
    }
    axios
      .get(
        `https://registrocivilbackend-joaovitorsantossilveira.b4a.run/${tipo}/nome/${buscaCerta}`
      )
      .then(res => {
        const data = res.data
        setData(data)
      })
      .catch(error => {
        console.error("Erro ao obter os dados do backend:", error)
      })
  }

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://registrocivilbackend-joaovitorsantossilveira.b4a.run/atualizar/${nomeCerto}`,
        selectedItem
      )
      console.log("Dados atualizados com sucesso.")
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error)
    }
  }

  const handleOpenModal = user => {
    setSelectedItem(user)
    setNome(user.nome)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
    setShowModal(false)
  }

  const confirmDelete = user => {
    setNomeDelete(user.nome)
    setSelectedItemDelete(user)
    setShowModalDelete(true)
  }

  const confirmedDelete = async () => {
    try {
      await axios.delete(
        `https://registrocivilbackend-joaovitorsantossilveira.b4a.run/${tipo}/deletar/${nomeDeleteCerto}`,
        selectedItemDelete
      )
      setTimeout(() => {
        alert("Pessoa excluída com sucesso!")
      }, 10)
      setShowModalDelete(false)
      setNomeDelete(null)
      setSelectedItemDelete(null)
    } catch (error) {
      console.error("Erro ao deletar:", error)
    }
  }

  const canceledDelete = () => {
    setNomeDelete(null)
    setSelectedItemDelete(null)
    setShowModalDelete(false)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setSelectedItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }))
  }

  const handlePrint = () => {
    window.print()
    handleCloseModal()
  }

  return (
    <>
      <ToastContainer />
      <div className="ajustePag">
        <form onSubmit={handleSubmit}>
          <div className="busca">
            <p className="txtBusca">Busca de Registro</p>
            <div className="pesquisa">
              <div>
                <select
                  className="selectBusca"
                  id="selectBusca"
                  value={tipo}
                  onChange={pegaSelect}
                >
                  <option value="selecioneBusca">O que deseja buscar?</option>
                  <option value="nascimento">Nascimento</option>
                  <option value="casamento">Casamento</option>
                  <option value="obito">Óbito</option>
                </select>

                <input
                  type="text"
                  className="inputLogin"
                  value={busca}
                  placeholder="Digite o nome para realizar a busca"
                  onChange={pegaTexto}
                />

                <button type="submit" className="botaoBusca">
                  Buscar
                </button>
              </div>
            </div>
            <div className="tabelaBusca">
              <table>
                <thead>
                  {tipo === "casamento" && (
                    <tr>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th></th>
                      <th></th>
                    </tr>
                  )}

                  {tipo === "nascimento" && (
                    <tr>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th></th>
                      <th></th>
                    </tr>
                  )}
                  {tipo === "obito" && (
                    <tr>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th></th>
                      <th></th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {tipo === "nascimento" &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nome}</td>
                        <td>{item.CPF}</td>
                        <td>
                          <button onClick={() => handleOpenModal(item)}>
                            Detalhes
                          </button>
                        </td>
                        <td>
                          <button onClick={() => confirmDelete(item)}>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}

                  {tipo === "casamento" &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nome}</td>
                        <td>{item.CPF}</td>
                        <td>{item.nome1}</td>
                        <td>{item.CPF1}</td>
                        <td>
                          <button onClick={() => handleOpenModal(item)}>
                            Detalhes
                          </button>
                        </td>
                        <td>
                          <button onClick={() => confirmDelete(item)}>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  {tipo === "obito" &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nome}</td>
                        <td>{item.CPF}</td>
                        <td>
                          <button onClick={() => handleOpenModal(item)}>
                            Detalhes
                          </button>
                        </td>
                        <td>
                          <button onClick={() => confirmDelete(item)}>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {showModalDelete && (
                <div className="modal">
                  <div className="ajusteModalDelete">
                    <h2>Tem certeza que deseja excluir?</h2>
                    <br />
                    <div>
                      <button onClick={confirmedDelete}>Confirmar</button>
                      <button onClick={canceledDelete}>Cancelar</button>
                    </div>
                  </div>
                </div>
              )}
              {tipo === "obito" && showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>
                      &times;
                    </span>

                    <form>
                      <div className="ajusteModal">
                        <h2>CERTIDÃO DE ÓBITO</h2>
                        <div className="modelEspaco"></div>
                        <div className="modalNome">
                          <div>
                            <label>Nome:</label>
                            <input
                              type="text"
                              name="nome"
                              value={selectedItem.nome}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label>CPF:</label>
                            <input
                              type="text"
                              name="CPF"
                              value={selectedItem.CPF}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="modalNaturalidade">
                          <div className="ajusteNaturalidade">
                            <label>Naturalidade:</label>

                            <div>
                              <input
                                type="text"
                                name="natCidade"
                                value={selectedItem.natCidade}
                                onChange={handleInputChange}
                              />

                              <input
                                type="text"
                                name="natUf"
                                value={selectedItem.natUf}
                                on
                                Change={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="ajusteBeneficio">
                            <label>Benefício:</label>
                            <input
                              type="text"
                              name="beneficio"
                              value={selectedItem.beneficio}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="modalData">
                          <div>
                            <label>
                              Data de nascimento:
                              <input
                                type="date"
                                name="dataNascimento"
                                value={moment(
                                  selectedItem.dataNascimento
                                ).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                              />
                            </label>
                          </div>
                          <div>
                            <label>
                              Data de óbito:
                              <input
                                type="date"
                                name="dataObito"
                                value={moment(selectedItem.dataObito).format(
                                  "YYYY-MM-DD"
                                )}
                                onChange={handleInputChange}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="modelEspaco"></div>
                        <label className="modalEnderecoObito"> Endereço</label>
                        <div className="modelEndereco">
                          <div>
                            <div>
                              <label>
                                Rua:
                                <input
                                  type="text"
                                  name="rua"
                                  value={selectedItem.rua}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Número:
                                <input
                                  type="text"
                                  name="num"
                                  value={selectedItem.num}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Bairro:
                                <input
                                  type="text"
                                  name="bairro"
                                  value={selectedItem.bairro}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <label>
                                Cidade:
                                <input
                                  type="text"
                                  name="cidade"
                                  value={selectedItem.cidade}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                UF:
                                <input
                                  type="text"
                                  name="uf"
                                  value={selectedItem.uf}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="modelEspaco"></div>
                        <label className="modalEnderecoObito">
                          Endereço de óbito
                        </label>
                        <div className="modelEndereco">
                          <div>
                            <div>
                              <label>
                                Rua:
                                <input
                                  type="text"
                                  name="ruaFalecimento"
                                  value={selectedItem.ruaFalecimento}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Número:
                                <input
                                  type="text"
                                  name="numFalecimento"
                                  value={selectedItem.numFalecimento}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Bairro:
                                <input
                                  type="text"
                                  name="bairroFalecimento"
                                  value={selectedItem.bairroFalecimento}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <label>
                                Cidade:
                                <input
                                  type="text"
                                  name="cidadeFalecimento"
                                  value={selectedItem.cidadeFalecimento}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                UF:
                                <input
                                  type="text"
                                  name="ufFalecimento"
                                  value={selectedItem.ufFalecimento}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="modelEspaco"></div>
                        <div className="modalMaePai">
                          <label>
                            Nome da Mãe:
                            <input
                              type="text"
                              name="nomeMae"
                              value={selectedItem.mae}
                              onChange={handleInputChange}
                            />
                          </label>
                          <label>
                            Nome do Pai:
                            <input
                              type="text"
                              name="nomePai"
                              value={selectedItem.pai}
                              onChange={handleInputChange}
                            />
                          </label>
                          <label>
                            Estado civil:
                            <input
                              type="text"
                              name="estadoCivil"
                              value={selectedItem.estadoCivil}
                              onChange={handleInputChange}
                            />
                          </label>
                          <label>
                            Nome dos filhos: (se tiver)
                            <input
                              type="text"
                              name="nomeFilhos"
                              value={selectedItem.nomeFilhos}
                              onChange={handleInputChange}
                              placeholder="Ex: Fulano, Beltrano..."
                            />
                          </label>
                        </div>
                        <div className="modelEspaco"></div>
                      </div>
                      <div className="modelBotoes">
                        <button onClick={handlePrint}>Imprimir</button>
                        <button onClick={handleUpdate}>Atualizar</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {tipo === "casamento" && showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>
                      &times;
                    </span>

                    <form>
                      <div className="ajusteModal">
                        <h2>CERTIDÃO DE CASAMENTO</h2>
                        <div className="modelEspaco"></div>

                        <div className="modalNome">
                          <div>
                            <label>Nome:</label>
                            <input
                              type="text"
                              name="nome"
                              value={selectedItem.nome}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label>Novo nome:</label>
                            <input
                              type="text"
                              name="trocaNome"
                              value={selectedItem.trocaNome}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="modalNaturalidade">
                          <label>
                            Naturalidade
                            <input
                              type="text"
                              name="natCidade"
                              value={selectedItem.natCidade}
                              onChange={handleInputChange}
                            />
                          </label>

                          <input
                            type="text"
                            name="natUf"
                            value={selectedItem.natUf}
                            onChange={handleInputChange}
                          />
                          <label>
                            CPF:
                            <input
                              type="text"
                              name="CPF"
                              value={selectedItem.CPF}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        <div className="modalData">
                          <div>
                            <label>
                              Data de nascimento:
                              <input
                                type="date"
                                name="dataNascimento"
                                value={moment(
                                  selectedItem.dataNascimento
                                ).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                              />
                            </label>

                            <select
                              className="s"
                              value={selectedItem.estadoCivil}
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
                        </div>

                        <div className="modelEspaco"></div>
                        <div className="modelEndereco">
                          <div>
                            <div>
                              <label>
                                Rua:
                                <input
                                  type="text"
                                  name="rua"
                                  value={selectedItem.rua}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Número:
                                <input
                                  type="text"
                                  name="num"
                                  value={selectedItem.num}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Bairro:
                                <input
                                  type="text"
                                  name="bairro"
                                  value={selectedItem.bairro}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <label>
                                Cidade:
                                <input
                                  type="text"
                                  name="cidade"
                                  value={selectedItem.cidade}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                UF:
                                <input
                                  type="text"
                                  name="uf"
                                  value={selectedItem.uf}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="modelEspaco"></div>
                        <div className="modalNome">
                          <div>
                            <label>Nome:</label>
                            <input
                              type="text"
                              name="nome1"
                              value={selectedItem.nome1}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label>Novo nome:</label>
                            <input
                              type="text"
                              name="trocaNome1"
                              value={selectedItem.trocaNome1}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="modalNaturalidade">
                          <label>
                            Naturalidade
                            <input
                              type="text"
                              name="natCidade1"
                              value={selectedItem.natCidade1}
                              onChange={handleInputChange}
                            />
                          </label>

                          <input
                            type="text"
                            name="natUf1"
                            value={selectedItem.natUf1}
                            onChange={handleInputChange}
                          />
                          <label>
                            CPF:
                            <input
                              type="text"
                              name="CPF1"
                              value={selectedItem.CPF1}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        <div className="modalData">
                          <div>
                            <label>
                              Data de nascimento:
                              <input
                                type="date"
                                name="dataNascimento1"
                                value={moment(
                                  selectedItem.dataNascimento1
                                ).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                              />
                            </label>

                            <select
                              value={selectedItem.estadoCivil1}
                              name="estadoCivil1"
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
                        </div>

                        <div className="modelEspaco"></div>
                        <div className="modelEndereco">
                          <div>
                            <div>
                              <label>
                                Rua:
                                <input
                                  type="text"
                                  name="rua1"
                                  value={selectedItem.rua1}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Número:
                                <input
                                  type="text"
                                  name="num1"
                                  value={selectedItem.num1}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Bairro:
                                <input
                                  type="text"
                                  name="bairro1"
                                  value={selectedItem.bairro1}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <label>
                                Cidade:
                                <input
                                  type="text"
                                  name="cidade1"
                                  value={selectedItem.cidade1}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                UF:
                                <input
                                  type="text"
                                  name="uf1"
                                  value={selectedItem.uf1}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="modelEspaco"></div>
                        <div className="modalCasamento">
                          <div>
                            <label>
                              Data do casamento:
                              <input
                                type="date"
                                name="dataCasamento"
                                value={moment(
                                  selectedItem.dataCasamento
                                ).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                              />
                            </label>
                          </div>
                          <div>
                            <label>
                              Regime de bens:
                              <input
                                type="text"
                                name="regimeBens"
                                value={selectedItem.regimeBens}
                                onChange={handleInputChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="modelBotoes">
                        <button onClick={handlePrint}>Imprimir</button>
                        <button onClick={handleUpdate}>Atualizar</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {tipo === "nascimento" && showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>
                      &times;
                    </span>

                    <form>
                      <div className="ajusteModal">
                        <h2>CERTIDÃO DE NASCIMENTO</h2>
                        <div className="modelEspaco"></div>

                        <div className="modalNome">
                          <div>
                            <label>Nome:</label>
                            <input
                              type="text"
                              name="nome"
                              value={selectedItem.nome}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label>CPF:</label>
                            <input
                              type="text"
                              name="CPF"
                              value={selectedItem.CPF}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="modalNaturalidade">
                          <label>
                            Naturalidade
                            <input
                              type="text"
                              name="natCidade"
                              value={selectedItem.natCidade}
                              onChange={handleInputChange}
                            />
                          </label>

                          <input
                            type="text"
                            name="natUf"
                            value={selectedItem.natUf}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="modalData">
                          <div>
                            <label>
                              Data de nascimento:
                              <input
                                type="date"
                                name="dia"
                                value={moment(
                                  selectedItem.dataNascimento
                                ).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                              />
                            </label>
                          </div>
                          <label>
                            Hora:
                            <input
                              type="time"
                              name="hora"
                              value={selectedItem.hora}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>

                        <div className="modelEspaco"></div>
                        <div className="modelEndereco">
                          <div>
                            <div>
                              <label>
                                Rua:
                                <input
                                  type="text"
                                  name="rua"
                                  value={selectedItem.rua}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Número:
                                <input
                                  type="text"
                                  name="num"
                                  value={selectedItem.num}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Bairro:
                                <input
                                  type="text"
                                  name="bairro"
                                  value={selectedItem.bairro}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <label>
                                Cidade:
                                <input
                                  type="text"
                                  name="cidade"
                                  value={selectedItem.cidade}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                UF:
                                <input
                                  type="text"
                                  name="uf"
                                  value={selectedItem.uf}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="modelEspaco"></div>
                        <div className="modalMaePai">
                          <label>
                            Nome da Mãe:
                            <input
                              type="text"
                              name="nomeMae"
                              value={selectedItem.nomeMae}
                              onChange={handleInputChange}
                            />
                          </label>
                          <label>
                            Avó materna:
                            <input
                              type="text"
                              name="maeMae"
                              value={selectedItem.maeMae}
                              onChange={handleInputChange}
                            />
                          </label>

                          <label>
                            Avô materno:
                            <input
                              type="text"
                              name="paiMae"
                              value={selectedItem.paiMae}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>

                        <div className="modelEspaco"></div>
                        <div className="modelEndereco">
                          <div>
                            <div>
                              <label>
                                Rua:
                                <input
                                  type="text"
                                  name="ruaMae"
                                  value={selectedItem.ruaMae}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Número:
                                <input
                                  type="text"
                                  name="numMae"
                                  value={selectedItem.numMae}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Bairro:
                                <input
                                  type="text"
                                  name="bairroMae"
                                  value={selectedItem.bairroMae}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <label>
                                Cidade:
                                <input
                                  type="text"
                                  name="cidadeMae"
                                  value={selectedItem.cidadeMae}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                UF:
                                <input
                                  type="text"
                                  name="ufMae"
                                  value={selectedItem.ufMae}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="modelEspaco"></div>
                        <div className="modalMaePai">
                          <label>
                            Nome do Pai:
                            <input
                              type="text"
                              name="nomePai"
                              value={selectedItem.nomePai}
                              onChange={handleInputChange}
                            />
                          </label>

                          <label>
                            Avó paterna:
                            <input
                              type="text"
                              name="maePai"
                              value={selectedItem.maePai}
                              onChange={handleInputChange}
                            />
                          </label>

                          <label>
                            Avô paterno:
                            <input
                              type="text"
                              name="paiPai"
                              value={selectedItem.paiPai}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        <div className="modelEspaco"></div>
                        <div className="modelEndereco">
                          <div>
                            <div>
                              <label>
                                Rua:
                                <input
                                  type="text"
                                  name="ruaPai"
                                  value={selectedItem.ruaPai}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Número:
                                <input
                                  type="text"
                                  name="numPai"
                                  value={selectedItem.numPai}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                Bairro:
                                <input
                                  type="text"
                                  name="bairroPai"
                                  value={selectedItem.bairroPai}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <label>
                                Cidade:
                                <input
                                  type="text"
                                  name="cidadePai"
                                  value={selectedItem.cidadePai}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                UF:
                                <input
                                  type="text"
                                  name="ufPai"
                                  value={selectedItem.ufPai}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modelBotoes">
                        <button onClick={handlePrint}>Imprimir</button>
                        <button onClick={handleUpdate}>Atualizar</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
