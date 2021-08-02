import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import farmer from '../../../farmer-randy.png'
import './Header.css'

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    fontSize: "3rem",
    flexGrow: 1,
  },
  colorText: {
    color: "#e53935"
  }
}));

export default function Header () {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
        <h1 className={classes.appbarTitle}>Welcome to <span className={classes.colorText}>Tegridy Farm!</span></h1>
        <img className="farmer-img" src={farmer} alt=""></img>
        </Toolbar>
      </AppBar>
    </div>
  )
}