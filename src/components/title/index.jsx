import React from 'react';
import styled from 'styled-components';

const StyledTitleContainer = styled.div`
    padding: 1.2em 3em;
    background-color: black;
    max-width: 650px;
    margin-top: 10em;

    h1 {
        font-size: 50px;
        color: white;
        font-family: Roboto;
        gony-weight: 500;
        margin: 0;
    }
`




const Title = () => {
    return (
        <StyledTitleContainer>
            <h1>La galerie d'Olivier</h1>
        </StyledTitleContainer>
    );
}

export default Title;