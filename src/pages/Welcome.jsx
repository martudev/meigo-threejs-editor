
import styled from 'styled-components'
import anime from 'animejs/lib/anime'
import { useEffect, useRef, useState } from 'react'
import Editor from './Editor'
import Btn from 'src/styles/Buttons/Button'
import Loader from 'src/styles/Buttons/Loader'
import { useEventListener } from 'src/hooks/Listeners';
import Project from 'src/models/Project'
import { useDispatch } from 'react-redux'


const Title = styled.h1`
    font-family: GilRoy-Bold;
    font-size: 7rem;
    color: #a0a0a0;
    margin: 0rem;
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
    --box-shadow-color: #096a94;
    background-color: #1995ca;

    &:hover {
        background-color: #31a8db;
        --box-shadow-color: #0e7aa8;
    }
`

const LoadSceneButton = styled(Btn)`
    --box-shadow-color: #4b417a;
    background-color: #7366b3;

    &:hover {
        background-color: #887acf;
        --box-shadow-color: #5f5496;
    }
`

const DocsButton = styled(Btn)`
    --box-shadow-color: #417a41;
    background-color: #66b377;

    &:hover {
        background-color: #7dcf7a;
        --box-shadow-color: #599654;
    }
`

const APIButton = styled(Btn)`
    --box-shadow-color: #747a41;
    background-color: #abb366;

    &:hover {
        background-color: #c7cf7a;
        --box-shadow-color: #929654;
    }
`

const WelcomeMessage = styled.div`
    width: 100%;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 3rem;
    color: #fff;
`

const LoadingContainer = styled.div`
    width: 30vw;
    position: absolute;
    top: 28vh;
    opacity: 0;
    display: none;
    flex-wrap: wrap;
`

const ItemLoader = styled.div`
    width: 18px;
    height: 18px;
    background-color: #ad6587;
    margin: 2px;
`

const VersionShow = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    color: #a0a0a0;
    font-size: 1.1rem;
    padding: 1rem;
`


export default function Welcome() {

    const dispatch = useDispatch()

    const titleRef = useRef()
    const subTitleRef = useRef()
    const iconRef = useRef()
    const menuRef = useRef()
    const inputLoadSceneRef = useRef()

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
                top: -170,
                width: '10rem',
                height: '0.3rem',
                scale: 0.5,
            });
            anime({
                targets: titleRef.current,
                translateY: 240,
                scale: 0.5
            });
            anime({
                targets: subTitleRef.current,
                translateY: 180,
                scale: 0.5,
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
                anime({
                    targets: '.loading-container',
                    opacity: [0, 1],
                    easing: 'easeInOutQuad',
                    begin: () => {
                        document.querySelector('.loading-container').style.display = 'flex'
                    }
                });
                anime({
                    targets: '.loading-container div',
                    scale: [
                      {value: .1, easing: 'easeOutSine', duration: 500},
                      {value: 1, easing: 'easeInOutQuad', duration: 1200}
                    ],
                    delay: anime.stagger(200, {grid: [14, 5], from: 'center'}),
                    complete: () => {
                        setVisibility(true)
                    }
                });
            }
        });
    }

    const items = () => {
        const array = []
        for (var i=0; i < 162 ;i++) {
            array.push(<ItemLoader key={i}></ItemLoader>)
        }
        return array
    }

    const onLoadSceneDone = () => {
        const button = loadSceneBtnRef.current
        button.value = '' // IMPORTANT cleaning the input type file
        button.classList.remove('loading')
        setIsLoadingScene(false)
        setLoadSceneText(Text_LoadScene)
        setVisibility(true)
    }

    const onInputObjChange = (ev) => {
        const fileList = ev.target.files;
        Project.ReadFileAndLoadScene(onLoadSceneDone, fileList[0], dispatch)

        const button = loadSceneBtnRef.current
        button.classList.add('loading')
        setIsLoadingScene(true)
        setLoadSceneText('Loading...')
    }

    useEventListener('change', onInputObjChange, inputLoadSceneRef)

    const handleClickLoadScene = (ev) => {
        inputLoadSceneRef.current.click()
    }

    return(
        <>
            {!isVisible &&
                <>
                    <input type="file" accept="*" style={{ display: 'none' }} ref={inputLoadSceneRef}></input>
                    <Container>
                        <Icon ref={iconRef}></Icon>
                        <Menu ref={menuRef}>
                            <WelcomeMessage>Welcome to Medusa Editor 👋</WelcomeMessage>
                            <NewSceneButton onClick={handleNewScene}>New Scene</NewSceneButton>
                            <LoadSceneButton onClick={handleClickLoadScene} ref={loadSceneBtnRef}>
                                {loadSceneText}
                                {isLoadingScene && <Loader></Loader>}
                            </LoadSceneButton>
                            <DocsButton>Docs</DocsButton>
                            <APIButton>API</APIButton>
                        </Menu>
                        <LoadingContainer className='loading-container'>
                            {items()}
                        </LoadingContainer>
                        <Title ref={titleRef}>Medusa</Title>
                        <SubTitle ref={subTitleRef}>EDITOR</SubTitle>
                    </Container>
                    <VersionShow>
                        v1.0.0
                    </VersionShow>
                </>
            }
            {isVisible && <Editor />}
        </>
    );
}