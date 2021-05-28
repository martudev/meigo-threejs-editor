
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

const H1 = styled.h1`
    color: ${props => props.theme.main};
`

export default function Welcome() {

    return(
        <>
            <ThemeProvider theme={{ main: 'green'}}>
                <H1>Hello World</H1>
            </ThemeProvider>
        </>
    );
}