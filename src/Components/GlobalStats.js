import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: '0 auto',
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    color: '#3f51b5',
    textTransform: 'uppercase'
  }
}));

export default function GlobalStats() {
  const [globalData, setGlobalData] = useState({});
  
  useEffect( () => {
      async function getData() {
        const response = await fetch('https://corona.lmao.ninja/v2/all?yesterday');
        let data = await response.json();
        delete data.source;
        setGlobalData(data);
        console.log(data);
      }
      getData();
  },[])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {(Object.keys(globalData).slice(1, 11)).map((key, ind) => {
          return (
            <Grid item xs={12} sm={4} key ={ind}>
              <Paper 
                className={classes.paper} 
                elevation={3}>
                  <h3 className={classes.title}>{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <h3><NumberFormat value={globalData[key]} className="foo" displayType={'text'} thousandSeparator={true}/></h3>
              </Paper>
            </Grid>
          )
        })}
        
      </Grid>
    </div>
  );
}
