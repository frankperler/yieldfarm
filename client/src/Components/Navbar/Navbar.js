import { React } from 'react'
import farmer from '../../randymarsh.png'
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignContent:"center"
  },
  logo: {
    maxWidth: 140,
  }
}));

function Navigationbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <img
            alt=""
            src={farmer}
            className={classes.logo}
          />
          <Typography variant="h3" className={classes.title}>
            Tegridy Token Farm
          </Typography>
          <Typography variant="h6">
            {props.account}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );

}

export default Navigationbar;