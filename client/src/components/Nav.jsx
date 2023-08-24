import { Link, useLocation } from 'react-router-dom'
import '../components/Nav.css'

import { Link, useLocation } from 'react-router-dom'
import '../components/Nav.css'

function Nav(){
    const currentPage = useLocation().pathname;

    return(
        <>
        <div className='bar'>
        <ul className="nav nav-pills justify-content-space-between flex-column flex-md-row">
        <header className="title">Maze Mania</header>
            <li className="nav-item">
                <Link
                    to='/about'
                    className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                    About me
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to='/project'
                    className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                    Projects
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to='/resume'
                    className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                    Resume
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to='/contact'
                    className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                    Contact
                </Link>
            </li>
        </ul>
        </div>
        </>
    );
}

export default Nav;