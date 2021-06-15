import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setTheme } from "src/redux/Theme/actions"
import styled from "styled-components"




const Container = styled.div`
    position: relative;
    width: 60px;
    height: 30px;
`

const Button = styled.label`
    position: absolute;
    width: 60px;
    height: 30px;
`

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #5c5c5c;
    transition: .4s;
    border-radius: 34px;

    & .button {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 4px;
        bottom: 3px;
        background-color: #d8d8d8;
        transition: .4s;
        border-radius: 50%;
    }

    & .sun {
        color: #ffa600;
        position: absolute;
        right: 5px;
        font-size: 1.6rem;
    }

    & .night {
        position: absolute;
        left: 4px;
        top: 3px;
        font-size: 1.1rem;
    }
`

const Checkbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${Slider} .button {
        transform: translateX(27px);
    }
`

const getDefaultTheme = () => {
    const theme = localStorage.getItem('theme')
    return (theme == 'dark' ? true : false)
}


export default function ToggableTheme() {

    const dispatch = useDispatch()
    
    const [isDarkTheme, setIsDarkTheme] = useState(getDefaultTheme())

    useEffect(() => {
        if (isDarkTheme) {
            dispatch(setTheme('dark'))
            localStorage.setItem('theme', 'dark')
        } else {
            dispatch(setTheme('light'))
            localStorage.setItem('theme', 'light')
        }
    }, [isDarkTheme])

    const handleClickCheckbox = (ev) => {
        const isDark = ev.target.checked
        setIsDarkTheme(isDark)
    }

    
    return(
        <>
            <Container>
                <Button>
                    <Checkbox type='checkbox' onClick={handleClickCheckbox} defaultChecked={isDarkTheme}></Checkbox>
                    <Slider>
                        <span className='sun'>☀</span>
                        <span className='night'>🌙</span>
                        <span className='button'></span>
                    </Slider>
                </Button>
            </Container>
        </>
    )
}