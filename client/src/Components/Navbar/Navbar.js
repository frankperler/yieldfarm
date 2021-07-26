import { React } from 'react'
import farmer from '../../randymarsh.png'
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container } from 'react-bootstrap'

function Navigationbar (props) {

  return (
      <Navbar bg="dark" variant="dark" expand="lg" className="pt-5 pb-5">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={farmer}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Tegridy Token Farm
        </Navbar.Brand>
        <Nav>
          <Nav.Link>{props.account}</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;