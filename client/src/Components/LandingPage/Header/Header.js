import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "none",
    flexGrow: 1,
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
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
        <h1>Welcome to <span className={classes.colorText}>Tegridy Farm!</span></h1>
        </Toolbar>
      </AppBar>
    </div>
  )
}