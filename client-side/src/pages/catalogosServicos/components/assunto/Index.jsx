import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircleIcon from "@mui/icons-material/Circle";

export default function Assunto(props) {
  const [nomeAssunto, setNomeAssunto] = useState("*semNome*");
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    const getAssunto = async () => {
      await Axios.get(`/api/assunto`, config)
        .then((res) => {
          setNomeAssunto(res.data.dados.titulo);
        })
        .catch((err) => {});
    };

    getAssunto();
  }, []);

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "19px" }}>
          <b>Assunto</b> {nomeAssunto}
        </p>
        <div style={{ marginTop: "10px" }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Ativar"
          />
          <Button variant="contained" startIcon={<AddIcon />}>
            Adicionar Categoria
          </Button>
        </div>
      </div>
      <Divider />
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                <div>
                  
                  <FormControlLabel control={<Switch defaultChecked />} />
                </div>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <CircleIcon sx={{ color: "red" }} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}` }/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
