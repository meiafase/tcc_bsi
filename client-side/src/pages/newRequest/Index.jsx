import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import SendIcon from '@mui/icons-material/Send';
import Header from "../components/header/Index";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import BackDrop from "../components/backdrop/Index";
import SnackbarError from "../components/snackBarError/Index";
import SnackbarSuccess from "../components/snackBarSuccess/Index";

export default function NewRequest() {

  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const [areaList, setAreaList] = useState([])
  const [assunto, setAssunto] = useState('');
  const [assuntoList, setAssuntoList] = useState([])
  const [categoria, setCategoria] = useState('');
  const [categoriaList, setCategoriaList] = useState([])
  const [subcategoria, setSubcategoria] = useState('');
  const [subcategoriaList, setSubcategoriaList] = useState([])
  const [descricao, setDescricao] = useState("");
  const [descricaoAtual, setDescricaoAtual] = useState("");
  const [upload, setUpload] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  const [mensagemSnackBarError, setMensagemSnackBarError] = useState("");
  const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false)
  const [mensagemSnackBarSuccess, setMensagemSnackBarSuccess] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    const getInfos = async () => {
      await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/area/`, config).then(res => {
        setAreaList(res.data.dados);
      }).catch(err => {});

      await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/area/${area}/assuntoAtivo`, config).then(res => {
        setAssuntoList(res.data.dados);
      }).catch(err => {});

      await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/assunto/${assunto}/categoriasAtivas`, config).then(res => {
        setCategoriaList(res.data.dados);
        res.data.dados.map(categorias => (
          categorias.id === categoria ? setDescricao(categorias.descricao) : ""
        ))

        res.data.dados.map(categorias => (
          categorias.id === categoria ? setSubcategoriaList(categorias.sub_categorias) : "nada"
        ))

        res.data.dados.map(categorias => (
          categorias.id === categoria ? setDescricao(categorias.sub_categorias[0].descricao) : ""
        ))
      }).catch(err => {});
    }
    
    getInfos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAssuntoList, assunto, setCategoria, categoria, area])

  const handleChangeSetor = (event) => {
    setArea(event.target.value);
  };
  const handleChangeAssunto = (event) => {
    setAssunto(event.target.value);
  };
  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };
  const handleChangeSubcategoria = (event) => {
    setSubcategoria(event.target.value);
  };

  const handleSaveInfos = async () => {
    setOpenBackdrop(true)
    let formData = new FormData();
    formData.append("area_id", area);
    formData.append("assunto_id", assunto);
    formData.append("categoria_id", categoria);
    formData.append("sub_categoria_id", subcategoria);
    formData.append("mensagem", descricaoAtual);
    formData.append("anexo[0]", upload[0]);

    //console.log(area, assunto, categoria, subcategoria, descricaoAtual, upload)

    await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido`, formData, config, { headers: { "Content-Type": "multipart/form-data" } } ).then(res => {
      if(res.data.status) {
        setArea("");
        setAssunto("");
        setCategoria("");
        setSubcategoria("");
        setDescricaoAtual("");
        setDescricao("");
        setUpload(false);
        setMensagemSnackBarSuccess('Pedido cadastrado com sucesso!');
        setOpenSnackBarSuccess(true)
        setOpenBackdrop(false)
      }
    }).catch(err => {console.log(err)})

  }

  const handleValidateInputs = () => {
    if(area) {
      if(assunto) {
        if(categoria) {
          if(descricaoAtual) {
            if(upload) {
              handleSaveInfos()
            } else {
              setMensagemSnackBarError("Upload é necessário!");
              setOpenSnackBarError(true)
            }
          } else {
            setMensagemSnackBarError("Preencha a descrição antes de prosseguir!");
            setOpenSnackBarError(true)
          }
        } else { 
          setMensagemSnackBarError("Preencha a categoria antes de prosseguir!");
          setOpenSnackBarError(true)
        }
      } else {
        setMensagemSnackBarError("Preencha o assunto antes de prosseguir!");
        setOpenSnackBarError(true)
      }
    } else{
      setMensagemSnackBarError("Preencha a área antes de prosseguir!");
      setOpenSnackBarError(true)
    }
  }

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
          <div style={{ marginLeft: "50px", padding: "10px" }}>
            <h2>Nova Solicitação</h2>
          </div>
          <Divider />
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }} >
            <div style={{ width: "90%", height: "fit-content", display: 'flex', justifyContent: 'space-between' }} >
              <div style={{width: '40%'}}>
                <FormControl style={{marginBottom: '30px'}} fullWidth>
                  <InputLabel>Área</InputLabel>
                  <Select
                    value={area}
                    label="Área"
                    onChange={handleChangeSetor}
                  >
                    {areaList.map(set => (
                      <MenuItem value={set.id}>{set.titulo}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{marginBottom: '30px', display: area === '' ? 'none' : 'flex'}} fullWidth>
                  <InputLabel>Assunto</InputLabel>
                  <Select
                    value={assunto}
                    label="Assunto"
                    onChange={handleChangeAssunto}
                  >
                    {assuntoList.map(set => (
                      <MenuItem value={set.id}>{set.titulo}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{marginBottom: '30px', display: assunto === '' ? 'none' : 'flex'}} fullWidth>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={categoria}
                    label="Categoria"
                    onChange={handleChangeCategoria}
                  >
                    {categoriaList.length > 0 ? (
                      categoriaList.map(set => (
                        <MenuItem value={set.id}>{set.titulo}</MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled >Sem categorias ativas</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <FormControl style={{marginBottom: '30px', display: subcategoriaList.length > 0 ? 'flex' : 'none'}} fullWidth>
                  <InputLabel>Subcategoria</InputLabel>
                  <Select
                    value={subcategoria}
                    label="Subcategoria"
                    onChange={handleChangeSubcategoria}
                  >
                    {subcategoriaList.length > 0 ? (
                      subcategoriaList.map(set => (
                        <MenuItem value={set.id}>{set.titulo}</MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled >Sem subcategorias ativas</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <Paper sx={{width: '100%', height: 'fit-content', display: descricao ? "flex" : "none"}} elevation={3}>
                  <p style={{padding: '20px', fontWeight: 'bold'}}>{descricao}</p>
                </Paper>
              </div>
              <div style={{width: '58%'}}>
              <TextField
                fullWidth
                label="Descrição"
                value={descricaoAtual}
                onChange={e => setDescricaoAtual(e.target.value)}
                multiline
                rows={12}
              />
              <Paper elevation={3} style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', backgroundColor: '#87d3f8'}}>
                <div style={{padding: '30px'}}>
                  <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                    <Button component="label" variant="contained" color={upload ? "success" : "error"} startIcon={<CloudUploadIcon />}>
                      {upload ? "Arquivo selecionado" : "Enviar arquivo"}
                      <input hidden type="file" onChange={e => setUpload(e.target.files)} aria-label="Selecionar arquivo para envio"/>
                    </Button>
                  </div>
                  <h3 aria-label="Instrução: Envie preferencialmente os arquivos em formato .zip">Envie preferencialmente os arquivos em .zip</h3>
                </div>
              </Paper>
              </div>
            </div>
          </div>
          <Divider />
          <div style={{width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
          <Button color="error" variant="outlined" onClick={() => navigate('../MeusAtendimentos')} startIcon={<CloseIcon />} aria-label="Cancelar">
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleValidateInputs} endIcon={<SendIcon />} aria-label="Enviar">
            Enviar
          </Button>
          </div>
        </div>
      </div>
      <BackDrop openBackdrop={openBackdrop} />
      <SnackbarError openSnackBarError={openSnackBarError} setOpenSnackBarError={setOpenSnackBarError} mensagemSnackBarError={mensagemSnackBarError} />
      <SnackbarSuccess openSnackBarSuccess={openSnackBarSuccess} setOpenSnackBarSuccess={setOpenSnackBarSuccess} mensagemSnackBarSuccess={mensagemSnackBarSuccess} />
    </>
  );
}
