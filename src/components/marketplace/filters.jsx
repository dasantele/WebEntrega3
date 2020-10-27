import { Divider, IconButton, InputBase, MenuItem, Paper, TextField, Typography, useTheme } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({

  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  outline: {
    color: `white !important`,
  },

  outlineBorder: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.secondary.main} !important`,
    }
  },

  field: {
    
  },

  labelFocused: {
    color: "#ffffff",
  },

  cssFocused: {},

  inputBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.secondary.main} !important`
  },

  divider: {
    height: 28,
    margin: 4,
  },
  
  iconButton: {
    padding: 10,
  },
  
}));

const Filters = ({ filters, setFilters }) => {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("");
  const [searchAction, setSearchAction] = useState(false);
  const [platformAction, setPlatformAction] = useState(false);
  const theme = useTheme();
  const styles = useStyles(theme);
  useEffect(() => {
    if(searchAction) {
      setSearchAction(false);
      let filter = filters;
      delete filter.search;
      setFilters({ ...filter, search });
    }
    if(platformAction) {
      setPlatformAction(false);
      let filter = filters;
      delete filter.platform;
      setFilters({ ...filter, platform});
    }
  }, [searchAction, platformAction]);

  const handleSearchButtonPress = () => {
    setSearchAction(true);
  }

  const handlePlatformSearchButtonPress = () => {
    setPlatformAction(true);
  }

  return (
    <>
      <Typography>Filtros de Búsqueda:</Typography>
      <br />
      <Paper component="form" className={styles.root}>
        <InputBase
          theme={theme}
          id='outlined-basic'
          variant='outlined'
          className={styles.input}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Título del juego"
        />
        <Divider className={styles.divider} orientation="vertical" />
        <IconButton className={styles.iconButton} aria-label="directions" onClick={handleSearchButtonPress}>
        <SendIcon />
      </IconButton>
      </Paper>
      <br></br>
      <Typography>Plataforma:</Typography><br />
      <Paper component="form" className={styles.root}>        
        <TextField
          theme={theme}
          id='outlined-basic'
          select
          className={styles.input}
          onChange={(event) => setPlatform(event.target.value)}
          placeholder="Plataforma"
        >
          <MenuItem>
            Todas
          </MenuItem>
          <MenuItem value="Nintendo">
            Nintendo Switch
          </MenuItem>
          <MenuItem value="Play Station">
            Play Station
          </MenuItem>
          <MenuItem value="Xbox">
            Xbox
          </MenuItem>
        </TextField>
        <Divider className={styles.divider} orientation="vertical" />
        <IconButton className={styles.iconButton} aria-label="directions" onClick={handlePlatformSearchButtonPress}>
        <SendIcon />
      </IconButton>
      </Paper>
    </>
  );
};

export default Filters;
