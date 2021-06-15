import { createGlobalStyle, css } from "styled-components";


const DarkTheme = css`
    body {
        background-color: #252423;
    }
`

const LightTheme = css`
    body {
        background-color: #fff;
    }
`

export default createGlobalStyle`
    ${
        props => {
            if(props.theme.theme == 'dark') return DarkTheme
            return LightTheme
        }
    }

    body {
        transition: ease-in-out 0.2s background-color;
    }

    canvas {
        cursor: grab;
    }

    .grabbing {
        cursor: grabbing;
    }

    #controls {
        position: absolute;
        top: 15px;
        right: 15px;
        width: calc(50% - 20%);
    }
`