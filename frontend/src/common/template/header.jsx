import React from 'react'

export default props => (
    <header className='main-header'>
        <a href='/#/' className='logo'>
            <span className='logo-mini'><b>Dashboard</b></span>
            <span className='logo-lg'>
                <i className='fa fa-phone-square'></i>
                <b> MyDashboard</b>
            </span>
        </a>
        <nav className='navbar navbar-static-top' role='navigation'>
            <a href='#' className='sidebar-toggle' data-toggle='offcanvas'>
            </a>
        </nav>
    </header>
)