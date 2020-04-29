import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faWrench } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from "react-router-dom";



const Container = styled.div`
    width: 60px;
    height: 100%;
    position absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1em;
    border-right-color: #a4b0be;
`

const SideNavBar = ({ location }) => {
    console.log('Sidebar location', location)
    return !/gallery/.test(location.pathname) ? (
        <Container>
            <Link to='/'>
                <FontAwesomeIcon icon={faHome} size="2x" color="#747d8c" style={{cursor: 'pointer', marginBottom: '1.5em'}}/> 
            </Link>
            {/* <Link to="/edit">
                <FontAwesomeIcon icon={faWrench} size="2x" color="#747d8c" style={{cursor: 'pointer'}}/>
            </Link> */}
        </Container>
    ) : null;
}

export default withRouter(SideNavBar);