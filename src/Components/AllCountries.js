
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    marginTop: 50

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

export default function AllCountries() {
  const [globalData2, setGlobalData2] = useState([{}]);

  useEffect(() => {
    async function getData() {
        const response = await fetch('https://corona.lmao.ninja/v2/countries?yesterday=&sort=');
        let data = await response.json();
        
        setGlobalData2(data);
        console.log(data);
        
    }
    getData();
  }, [])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(globalData2).map((key, ind) => {
          return (
            <Grid item xs={12} sm={4} key={ind}>
              <Paper 
                className={classes.paper} 
                elevation={3}>
                  <h3 className={classes.title}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <h3>
                    {globalData2[key]}
                  </h3>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}