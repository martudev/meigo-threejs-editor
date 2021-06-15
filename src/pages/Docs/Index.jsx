
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from '../../styles/index'
import LogoSvg from 'src/svgs/Logo'
import ToggableTheme from 'src/theme/ToggableTheme'


const GlobalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`

const Container = styled.div`
    width: 20rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: ${props => props.theme.theme == 'dark'? '#313131' : '#e6e6e622'};
    transition: ease-in-out 0.2s background-color;
`

const ContentContainer = styled.div`
    width: calc(100vw - 20rem);
    padding-left: 3rem;
    padding-right: 3rem;
`

const logoDimensions = '80px'

const LogoContainer = styled.div`
    margin-top: 1.5rem;
    width: ${logoDimensions};
    height: ${logoDimensions};
    position: relative;
    fill: ${props => props.theme.theme == 'dark'? '#707070' : '#9789f3'};
    transition: ease-in-out 0.2s fill;
`

const Version = styled.div`
    margin-top: 1.5rem;
    position: relative;
    align-self: center;
    padding-left: 15px;
    color: ${props => props.theme.theme == 'dark' ? '#707070' : '#9789f3'};
    transition: ease-in-out 0.2s color;
`

const LeftNavigator = styled.div`
    overflow-y: auto;
    position: fixed;
    margin-top: 1.5rem;
    width: 100%;
    height: calc(100vh - 1.5rem - 1.5rem - ${logoDimensions});
    padding-left: 2rem;
    padding-right: 2rem;
    position: relative;

    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-track {
        background: ${props => props.theme.theme == 'dark'? '#424242' : '#f1f1f1'};
        transition: ease-in-out 0.2s background;
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;

        &:hover {
            background-color: #646464;
        }
    }
`

const Ul = styled.ul`
    list-style-type: none;
    padding: 0 0 2rem 0;
    margin: 0;
`

const Li = styled.li`
    margin-top: 2rem;
`

const SubLi = styled.li`
    margin: 0;
`

const Button = styled(Link)`
    text-decoration: none;
    display: block;
    color: ${props => props.theme.theme == 'dark' ? '#f1f2f3' : '#55565e'};
    transition: ease-in-out 0.2s color;
    font-weight: 600;
    font-size: 1.2rem;
    border-radius: 6px;
    padding: 0.6rem 1.5rem;

    &.active {
        background-color: ${props => props.theme.theme == 'dark' ? '#414141' : '#f1f2f3'};
        transition: ease-in-out 0.2s background-color;
    }

    &:hover {
        background-color: ${props => props.theme.theme == 'dark' ? '#414141' : '#f1f2f3'};
        transition: ease-in-out 0.2s background-color;
    }
`

const SubButton = styled(Button)`
    text-decoration: none;
    color: rgba(85, 86, 94, 0.7);
    font-weight: 500;
    font-size: 1rem;
    margin-top: 3px;

    &:hover {
        color: #55565e;
    }
`

const ToggableThemeContainer = styled.div`
    margin-top: 1.5rem;
`


export default function Index({ children }) {
    return(
        <>
            <GlobalStyles />
            <GlobalContainer>
                <Container>
                    <LogoContainer>
                        <LogoSvg></LogoSvg>
                    </LogoContainer>
                    <Version>v1.0.0</Version>
                    <LeftNavigator>
                        <Menu>
                            <MenuSection name='Getting Started' className='active' to='/docs/getting-started'>
                            </MenuSection>
                            <MenuSection name='Tutorial' to='/docs/tutorial'>
                            </MenuSection>
                            <MenuSection name='FAQ' to='/docs/faq'>
                            </MenuSection>
                            <MenuSection name='Need Help?' to='/docs/need-help'>
                            </MenuSection>
                            <MenuSection name='Something' to='/'>
                                <MenuSubButton>Hello</MenuSubButton>
                            </MenuSection>
                            <MenuSection name='Need Help?' to='/docs/need-help'>
                            </MenuSection>
                            <MenuSection name='Need Help?' to='/docs/need-help'>
                            </MenuSection>
                            <MenuSection name='Need Help?' to='/docs/need-help'>
                            </MenuSection>
                            <MenuSection name='Need Help?' to='/docs/need-help'>
                            </MenuSection>
                            <MenuSection name='Need Help?' to='/docs/need-help'>
                            </MenuSection>
                            <MenuSection name='Need Help?' to='/docs/need-help'>
                            </MenuSection>
                        </Menu>
                    </LeftNavigator>
                </Container>
                <ContentContainer>
                    <ToggableThemeContainer>
                        <ToggableTheme></ToggableTheme>
                    </ToggableThemeContainer>
                    {children}
                </ContentContainer>
            </GlobalContainer>
        </>
    )
}


function Menu({ children }) {
    return(
        <>
            <Ul>
                {children}
            </Ul>
        </>
    )
}

function MenuSection(props) {

    const {children, name, to = '', ...rest} = props

    return(
        <>
            <Li>
                <Button to={to} {...rest}>{name}</Button>
            </Li>
            {children}
        </>
    )
}

function MenuSubButton(props) {

    const {children, to = '', ...rest} = props

    return(
        <>
            <SubLi>
                <SubButton to={to}>{children}</SubButton>
            </SubLi>
        </>
    )
}