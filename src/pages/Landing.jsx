
import styled from 'styled-components'

const Title = styled.h1`
    font-family: GilRoy-Bold;
    font-size: 7rem;
    color: #a0a0a0;
    margin-bottom: 0rem;
`

const SubTitle = styled.h2`
    font-family: GilRoy-Light;
    font-size: 2rem;
    color: #a0a0a0;
    letter-spacing: 2rem;
`

const Container = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export default function Landing() {

    return(
        <>
            <Container>
                <Title>Medusa</Title>
                <SubTitle>EDITOR</SubTitle>
            </Container>
        </>
    );
}