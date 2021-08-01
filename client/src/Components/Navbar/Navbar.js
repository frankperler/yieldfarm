import { React } from 'react'
import farmer from '../../randymarsh.png'
import './Navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "1rem"
  },
  barColor: {
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    flexGrow: 1,
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
        <Toolbar>
          <img
            alt=""
            src={farmer}
            className={classes.logo}
          />
          <Typography variant="h2" className={classes.title}>
            Tegridy Token Farm
          </Typography>
          <Typography variant="h6">
            Account: {props.account}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );

}

export default Navigationbar;