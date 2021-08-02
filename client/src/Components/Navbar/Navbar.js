import { React } from 'react'
import './Navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import farmer from '../../assets/randymarsh.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: "1rem",
    margin: "0 auto"
  },
  barColor: {
    backgroundColor: theme.palette.primary.main,
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  iconGroup: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    fontWeight: 400
  },
  account: {
    float: "right",
  },
  logo: {
    maxWidth: 140,
  }
}));

function Navigationbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barColor}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.iconGroup}>
            <img
              alt=""
              src={farmer}
              className={classes.logo}
            />
            <Typography variant="h2" color="secondary" className={classes.title}>
              Tegridy Farm
            </Typography>
          </div>
          <Typography variant="h6" className={classes.account}>
            Account: {props.account}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );

}

export default Navigationbar;