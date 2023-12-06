import React from "react";

import Divider from "@mui/material/Divider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import StarIcon from "@mui/icons-material/Star";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import PercentIcon from "@mui/icons-material/Percent";
import Header from "../components/header/Index";

export default function Report() {
  return (
    <>
      <Header drawer={true} />
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "98%", height: "fit-content" }}>
          <h2>{"Relatórios"}</h2>
          <Divider />
          <div style={{ width: "100%", height: "100vh", display: "flex" }}>
            <div style={{ width: "30%", height: "100vh" }}>
              <div
                style={{
                  width: "97%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker sx={{ width: "20px" }} label="Período" />
                  </DemoContainer>
                </LocalizationProvider>
                <p style={{ marginTop: "20px" }}>a</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker sx={{ width: "20px" }} label="Período" />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div style={{ width: "97%", marginTop: "30px" }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select label="Status">
                    <MenuItem value={10}>OK</MenuItem>
                    <MenuItem value={20}>OK!</MenuItem>
                    <MenuItem value={30}>OK!!</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div
                style={{
                  width: "97%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <FormControl sx={{ width: "45%" }}>
                  <InputLabel>Prioridade</InputLabel>
                  <Select label="Prioridade">
                    <MenuItem value={10}>OK</MenuItem>
                    <MenuItem value={20}>OK!</MenuItem>
                    <MenuItem value={30}>OK!!</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "45%" }}>
                  <InputLabel>UF</InputLabel>
                  <Select label="UF">
                    <MenuItem value={10}>OK</MenuItem>
                    <MenuItem value={20}>OK!</MenuItem>
                    <MenuItem value={30}>OK!!</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: "97%", marginTop: "30px" }}>
                <FormControl fullWidth>
                  <InputLabel>Atendente</InputLabel>
                  <Select label="Atendente">
                    <MenuItem value={10}>OK</MenuItem>
                    <MenuItem value={20}>OK!</MenuItem>
                    <MenuItem value={30}>OK!!</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: "97%", marginTop: "30px" }}>
                <FormControl fullWidth>
                  <InputLabel>Assunto</InputLabel>
                  <Select label="Assunto">
                    <MenuItem value={10}>OK</MenuItem>
                    <MenuItem value={20}>OK!</MenuItem>
                    <MenuItem value={30}>OK!!</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: "97%", marginTop: "30px" }}>
                <FormControl fullWidth>
                  <InputLabel>Categoria</InputLabel>
                  <Select label="Categoria">
                    <MenuItem value={10}>OK</MenuItem>
                    <MenuItem value={20}>OK!</MenuItem>
                    <MenuItem value={30}>OK!!</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: "97%", marginTop: "30px" }}>
                <FormControl fullWidth>
                  <InputLabel>Área Solicitante</InputLabel>
                  <Select label="Área Solicitante">
                    <MenuItem value={10}>OK</MenuItem>
                    <MenuItem value={20}>OK!</MenuItem>
                    <MenuItem value={30}>OK!!</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div
                style={{
                  width: "97%",
                  marginTop: "30px",
                  border: "solid 1px",
                  padding: "5px",
                  borderRadius: "10px",
                  backgroundColor: "#D7EDFF",
                  borderColor: "#D7EDFF",
                }}
              >
                <h2>Incluir no Relatório</h2>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Listagem Analítica"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Dados Sintéticos"
                />
              </div>
              <div style={{ width: "97%", marginTop: "30px" }}>
                <Button variant="contained" fullWidth size="large" aria-label="Gerar relatório">
                  Gerar relatório
                </Button>
              </div>
            </div>

            <div
              style={{
                width: "70%",
                height: "100vh",
                borderLeft: "solid 1px",
              }}
            >
              <div style={{ width: "100%", paddingLeft: "20px" }}>
                <h2>Visão Geral</h2>
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "fit-content",
                  paddingLeft: "20px",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "49%",
                    height: "fit-content",
                    padding: "10px",
                    backgroundColor: "#b0b6e3",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <p style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                      Solicitações abertas por Status
                    </p>
                  </div>
                  <Divider />
                  <div
                    style={{
                      width: "100%",
                      height: "fit-content",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "24%",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "70px",
                          height: "100px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <h1 style={{ color: "#191970" }}>17</h1>
                          Novo
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "24%",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "150px",
                          height: "100px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <h1 style={{ color: "#191970" }}>7</h1>
                          Em Atendimento
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "24%",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#c4c4c4",
                        borderRadius: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "150px",
                          height: "100px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <h1 style={{ color: "#191970" }}>24</h1>
                          Total em Aberto
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "24%",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          height: "100px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <h1 style={{ color: "#191970" }}>28</h1>
                          Aguardando Avaliação
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "49%",
                    height: "fit-content",
                    padding: "10px",
                    backgroundColor: "#b0b6e3",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <p style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                      Solicitações abertas por Status
                    </p>
                  </div>
                  <Divider />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "13%",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fa7f72",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          height: "100px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <h1 style={{ color: "red" }}>22</h1>
                          Prazo Expirado
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "35%",
                        height: "150px",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          height: "fit-content",
                        }}
                      >
                        <ul style={{ lineHeight: 0.2, listStyle: "none" }}>
                          <li>
                            <div
                              style={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "red" }}>Muito Alta</p>
                              <p>0</p>
                            </div>
                          </li>
                          <li>
                            <div
                              style={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "orange" }}>Alta</p>
                              <p>4</p>
                            </div>
                          </li>
                          <li>
                            <div
                              style={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "#ffd700" }}>Normal</p>
                              <p>11</p>
                            </div>
                          </li>
                          <li>
                            <div
                              style={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "blue" }}>Baixa</p>
                              <p>7</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "13%",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fff8dd",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          height: "100px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <h1 style={{ color: "#ffd700" }}>22</h1>
                          Expira 30 min
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "35%",
                        height: "150px",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          height: "fit-content",
                        }}
                      >
                        <ul style={{ lineHeight: 0.2, listStyle: "none" }}>
                          <li>
                            <div
                              style={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "red" }}>Muito Alta</p>
                              <p>0</p>
                            </div>
                          </li>
                          <li>
                            <div
                              style={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "orange" }}>Alta</p>
                              <p>0</p>
                            </div>
                          </li>
                          <li>
                            <div
                              style={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "#ffd700" }}>Normal</p>
                              <p>0</p>
                            </div>
                          </li>
                          <li>
                            <div
                              style={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "blue" }}>Baixa</p>
                              <p>0</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "20px",
                  marginTop: "30px",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    height: "fit-content",
                    backgroundColor: "#deebd6",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingLeft: "20px",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>
                      Indicadores do Último Mês Abril/2023
                    </p>
                    <Chip icon={<FileDownloadIcon />} label="Exportar" />
                  </div>
                  <Divider />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "23%",
                        height: "200px",
                        backgroundColor: "#9cc487",
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          marginTop: "30px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <Rating name="no-value" value={null} />
                          <Chip
                            icon={<StarIcon color="error" />}
                            label={
                              <p style={{ color: "white", fontSize: "20px" }}>
                                0
                              </p>
                            }
                          />
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            Nota Média do Mês
                          </p>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "23%",
                        height: "200px",
                        backgroundColor: "#9cc487",
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          marginTop: "30px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <Chip
                            icon={<PercentIcon color="success" />}
                            label={
                              <p style={{ color: "white", fontSize: "20px" }}>
                                100
                              </p>
                            }
                          />
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            Finalizadas no Prazo
                          </p>
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "23%",
                        height: "200px",
                        backgroundColor: "#9cc487",
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "190px",
                          marginTop: "10px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <Chip
                            icon={<CallReceivedIcon />}
                            label={
                              <p style={{ color: "white", fontSize: "20px" }}>
                                4
                              </p>
                            }
                          />
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            Solicitações Recebidas
                          </p>
                          <Chip
                            icon={<PresentToAllIcon />}
                            label={
                              <p style={{ color: "white", fontSize: "20px" }}>
                                1
                              </p>
                            }
                          />
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            Solicitações Finalizadas
                          </p>
                        </p>
                      </div>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div
                      style={{
                        width: "23%",
                        height: "200px",
                        backgroundColor: "#9cc487",
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "250px",
                          marginTop: "10px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <Chip
                            icon={<CallReceivedIcon />}
                            label={
                              <p style={{ color: "white" }}>
                                25% / Assunto Mais Procurado
                              </p>
                            }
                          />
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            EDUCACIONAL / CURSOS
                          </p>
                          <Chip
                            icon={<PresentToAllIcon />}
                            label={
                              <p style={{ color: "white" }}>
                                100% / Setor mais Recorrente
                              </p>
                            }
                          />
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            DESENVOLVIMENTO
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "29%",
                    height: "fit-content",
                    backgroundColor: "#ffd5c2",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      height: "fit-content",
                      marginBottom: "20px",
                    }}
                  >
                    <h2>Indicadores do Setor</h2>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "49%",
                        height: "200px",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          marginTop: "30px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <Rating name="no-value" value={null} />
                          <Chip
                            icon={<StarIcon color="error" />}
                            label={
                              <p style={{ color: "white", fontSize: "20px" }}>
                                0
                              </p>
                            }
                          />
                          <p style={{ color: "red", fontWeight: "bold" }}>
                            Nota Média do Mês
                          </p>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "49%",
                        height: "200px",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "170px",
                          marginTop: "30px",
                          wordBreak: "breal-all",
                          textAlign: "center",
                        }}
                      >
                        <p>
                          <Chip
                            icon={<PercentIcon color="success" />}
                            label={
                              <p style={{ color: "green", fontSize: "30px" }}>
                                74
                              </p>
                            }
                          />
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            Finalizadas no Prazo
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
