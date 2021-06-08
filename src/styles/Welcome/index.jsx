import styled, { createGlobalStyle } from "styled-components";


export default createGlobalStyle`
    body {
        background-color: #252423;
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