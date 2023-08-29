import { Link, useLocation } from 'react-router-dom'
import '../components/Nav.css'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Tab, Modal, Container } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';   

import Auth from '../utils/auth';

function Nav(){
    // const currentPage = useLocation().pathname;

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">Maze Mania</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar" className='d-flex flex-row-reverse'>
                        <Nav className></Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
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
}

export default Nav;