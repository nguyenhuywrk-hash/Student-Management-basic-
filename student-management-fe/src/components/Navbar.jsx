import React from 'react';
import { NavLink } from 'react-router-dom';

function MyNavbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-black p-2 ">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand text-white fw-bolder"><i className="fa-solid fa-users me-2"></i>Student Management</NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link text-white active fw-semibold' : 'nav-link text-white  fw-semibold'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/management" className={({ isActive }) => isActive ? 'nav-link text-white active fw-semibold' : 'nav-link text-white fw-semibold'}>Management</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link text-white active fw-semibold' : 'nav-link text-white fw-semibold'}>About</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MyNavbar;
