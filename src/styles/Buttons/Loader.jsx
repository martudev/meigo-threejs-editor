import styled from 'styled-components'


const LoaderStyle = styled.div`
    border: 3px solid rgba(243, 243, 243, 0.2);
    border-top: 3px solid rgba(243, 243, 243, 1);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1.5s linear infinite;
    display: inline-block;
    position: relative;
    margin-left: 0.6rem;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`


export default function Loader(props) {
    return(
        <LoaderStyle {...props}></LoaderStyle>
    )
}