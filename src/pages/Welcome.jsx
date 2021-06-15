
import styled from 'styled-components'
import anime from 'animejs/lib/anime'
import { useEffect, useRef, useState } from 'react'
import Editor from './Editor'
import Btn from 'src/styles/Buttons/Button'
import Loader from 'src/styles/Buttons/Loader'
import pjson from '../../package.json'
import LoadScene from 'src/components/LoadScene'
import GlobalStyles from 'src/styles/index'
import LogoSvg from 'src/svgs/Logo'
import ToggableTheme from 'src/theme/ToggableTheme'


const LogoContainer = styled.div`
    width: 20rem;
    fill: ${props => props.theme.theme == 'dark'? '#707070' : '#8a8f94'};
    position: relative;
`

const Container = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Icon = styled.div`
    width: 0rem;
    height: 0rem;
    position: relative;
    background-color: #e67447;
`

const Menu = styled.div`
    width: 100vw;
    position: absolute;
    top: 30vh;
    opacity: 0;
    color: #aaaaaa;
    display: none;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`

const NewSceneButton = styled(Btn)`
    background-color: ${props => props.theme.theme == 'dark'? '#1995ca' : '#21b3f1' };
    --box-shadow-color: ${props => props.theme.theme == 'dark'? '#096a94' : '#2498ca' };

    &:hover {
        background-color: ${props => props.theme.theme == 'dark'? '#31a8db' : '#3cbdf5' };
        --box-shadow-color: ${props => props.theme.theme == 'dark'? '#0e7aa8' : '#32a7da' };
    }
`

const LoadSceneButton = styled(Btn)`
    background-color: ${props => props.theme.theme == 'dark'? '#7366b3' : '#8e7fdb' };
    --box-shadow-color: ${props => props.theme.theme == 'dark'? '#4b417a' : '#7b6bc0' };

    &:hover {
        background-color: ${props => props.theme.theme == 'dark'? '#887acf' : '#a08ff5' };
        --box-shadow-color: ${props => props.theme.theme == 'dark'? '#5f5496' : '#8c7cd6' };
    }
`

const DocsButton = styled(Btn)`
    background-color: ${props => props.theme.theme == 'dark'? '#66b377' : '#79ce8b' };
    --box-shadow-color: ${props => props.theme.theme == 'dark'? '#417a41' : '#65b365' };

    &:hover {
        background-color: ${props => props.theme.theme == 'dark'? '#7dcf7a' : '#80dd94' };
        --box-shadow-color: ${props => props.theme.theme == 'dark'? '#599654' : '#71c471' };
    }
`

const APIButton = styled(Btn)`
    background-color: ${props => props.theme.theme == 'dark'? '#abb366' : '#ccd481' };
    --box-shadow-color: ${props => props.theme.theme == 'dark'? '#747a41' : '#b7c070' };

    &:hover {
        background-color: ${props => props.theme.theme == 'dark'? '#c7cf7a' : '#d7e081' };
        --box-shadow-color: ${props => props.theme.theme == 'dark'? '#929654' : '#c4ce7b' };
    }
`

const WelcomeMessage = styled.div`
    width: 100%;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 3rem;
    color: ${props => props.theme.theme == 'dark' ? '#fff' : 'rgb(77, 78, 83)'};
`

const VersionShow = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    color: ${props => props.theme.theme == 'dark' ? '#a0a0a0' : '#8a8f94'};
    font-size: 1.1rem;
    padding: 1rem;
`


export default function Welcome() {

    const logoRef = useRef()
    const iconRef = useRef()
    const menuRef = useRef()

    // Buttons
    const loadSceneBtnRef = useRef()

    const Text_LoadScene = 'Load Scene'

    const [isVisible, setVisibility] = useState(false)
    const [loadSceneText, setLoadSceneText] = useState(Text_LoadScene)
    const [isLoadingScene, setIsLoadingScene] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            anime({
                targets: iconRef.current,
                top: -130,
                width: '10rem',
                height: '0.3rem',
                scale: 0.5,
            });
            anime({
                targets: logoRef.current,
                translateY: 240,
                scale: 0.4,
                complete: function() {
                    anime({
                        targets: menuRef.current,
                        opacity: [0, 1],
                        easing: 'easeInOutQuad',
                        begin: () => {
                            menuRef.current.style.display = 'flex'
                        }
                    });
                }
            });
        }, 2500)
    }, [])

    const handleNewScene = () => {
        anime({
            targets: menuRef.current,
            opacity: [1, 0],
            easing: 'easeInOutQuad',
            complete: () => {
                setVisibility(true)
            }
        });
    }

    const onLoadingScene = () => {
        const button = loadSceneBtnRef.current
        button.classList.add('loading')
        setIsLoadingScene(true)
        setLoadSceneText('Loading...')
    }

    const onLoadDone = () => {
        const button = loadSceneBtnRef.current
        button.classList.remove('loading')
        setIsLoadingScene(false)
        setLoadSceneText(Text_LoadScene)
        setVisibility(true)
    }

    return(
        <>
            <GlobalStyles />
            {!isVisible &&
                <>
                    <ToggableTheme></ToggableTheme>
                    <Container>
                        <Icon ref={iconRef}></Icon>
                        <Menu ref={menuRef}>
                            <WelcomeMessage>Welcome to Medusa Editor 👋</WelcomeMessage>
                            <NewSceneButton onClick={handleNewScene}>New Scene</NewSceneButton>
                            <LoadScene onLoading={onLoadingScene} onDone={onLoadDone}>
                                <LoadSceneButton ref={loadSceneBtnRef}>
                                    {loadSceneText}
                                    {isLoadingScene && <Loader></Loader>}
                                </LoadSceneButton>
                            </LoadScene>
                            <DocsButton to='/docs'>Docs</DocsButton>
                            <APIButton>API</APIButton>
                        </Menu>
                        <LogoContainer ref={logoRef}>
                            <LogoSvg />
                        </LogoContainer>
                    </Container>
                    <VersionShow>
                        v{pjson.version}
                    </VersionShow>
                </>
            }
            {isVisible && <Editor />}
        </>
    );
}