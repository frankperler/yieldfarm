import { React } from 'react'
import farmer from '../../randymarsh.png'
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container } from 'react-bootstrap'

function Navigationbar (props) {

  return (
      <Navbar bg="dark" variant="dark" expand="lg" className="pt-5 pb-5">
      <Container>
        {/* <Navbar.Brand> */}
          <img
            alt=""
            src={farmer}
            className="d-inline-block align-top"
          />{' '}
          <h1>Tegridy Token Farm</h1>
        {/* </Navbar.Brand> */}
        <Nav>
          <Nav.Link>{props.account}</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;