import React, { useState } from 'react';
import {
    Collapse,
    Navbar as ReactstrapNavbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <ReactstrapNavbar color="light" light expand="md" style={{ height: '4rem' }} className='p-1'>
            <NavbarBrand href="/"><img src="public\images\Lorem Ipsum.png" alt="" style={{ height: '3rem' }} /></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar className='justify-content-between'>
                <Nav  navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contact">Tutte le foto WIP</NavLink>
                    </NavItem>
                </Nav>
                <Nav navbar>
                    <NavItem >
                        <NavLink href="/a">Accedi WIP</NavLink>
                    </NavItem>
                </Nav>

            </Collapse>

        </ReactstrapNavbar>
    );
}

export default Navbar;
