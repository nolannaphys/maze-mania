import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import '../components/Nav.css'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Tab, Modal, Container } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';   

import Auth from '../utils/auth';

const AppNavbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);

    return(
        //NOTE - From Andrew, From Book Search engine
        <>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>
              Google Books Search
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
              <Nav className='ml-auto d-flex'>
                <Nav.Link as={Link} to='/'>
                  Search For Books
                </Nav.Link>
                {/* if user is logged in show saved books and logout */}
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to='/saved'>
                      See Your Books
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* set modal data up */}
        <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='signup-modal'>
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey='login'>
            <Modal.Header closeButton>
              <Modal.Title id='signup-modal'>
                <Nav variant='pills'>
                  <Nav.Item>
                    <Nav.Link eventKey='login'>Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey='login'>
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey='signup'>
                  <SignUpForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </>
      //NOTE - From Andrew
        // <>
        //     <Navbar bg="light" expand="lg">
        //         <Container fluid>
        //             <Navbar.Brand as={Link} to="/">Maze Mania</Navbar.Brand>
        //             <Navbar.Toggle aria-controls="navbar" />
        //             <Navbar.Collapse id="navbar" className='d-flex flex-row-reverse'>
        //                 <Nav className></Nav>
        //             </Navbar.Collapse>
        //         </Container>
        //     </Navbar>
        // </>
        //NOTE - Only God knows why this is here
    //     <>
    //     <div className='bar'>
    //     <ul className="nav nav-pills justify-content-space-between flex-column flex-md-row">
    //     <header className="title">Maze Mania</header>
    //         <li className="nav-item">
    //             <Link
    //                 to='/about'
    //                 className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
    //             >
    //                 About me
    //             </Link>
    //         </li>
    //         <li className="nav-item">
    //             <Link
    //                 to='/project'
    //                 className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
    //             >
    //                 Projects
    //             </Link>
    //         </li>
    //         <li className="nav-item">
    //             <Link
    //                 to='/resume'
    //                 className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
    //             >
    //                 Resume
    //             </Link>
    //         </li>
    //         <li className="nav-item">
    //             <Link
    //                 to='/contact'
    //                 className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
    //             >
    //                 Contact
    //             </Link>
    //         </li>
    //     </ul>
    //     </div>
    //     </>
    );
};

export default Nav;