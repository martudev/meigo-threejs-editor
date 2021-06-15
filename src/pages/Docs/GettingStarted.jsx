import styled from "styled-components"



const Title = styled.h1`
    color: ${props => props.theme.theme == 'dark' ? '#9789f3' : '#303136'};
    height: calc(3rem + 80px);
    margin: 0;
    display: flex;
    align-items: center;
`

export default function GettingStarted() {
    return(
        <>
            <Title>Getting Started</Title>
        </>
    )
}