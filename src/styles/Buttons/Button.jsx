import { Link } from 'react-router-dom';
import styled from 'styled-components'


const Btn = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    padding: 1rem 2rem;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    margin-right: 2rem;
    color: #fff;
    --box-shadow-color: #096a94;
    box-shadow: 0 4px 0 0 var(--box-shadow-color);
    cursor: pointer;
    top: 0;
    background-color:#1995ca;
    transition: background-color 150ms ease-in-out, box-shadow 100ms ease-in-out, top 100ms ease-in-out;
    &:hover {
        background-color: #31a8db;
        --box-shadow-color: 0 4px 0 0 #0e7aa8;
    }
    &:active {
        top: 4px;
        box-shadow: none;
    }
    user-select: none;

    &.inactive {
        color: rgb(200, 200, 200);
        background-color: rgb(160, 160, 160);
        --box-shadow-color: rgb(100, 100, 100);
        transition: none;
        
        &:hover {
            color: rgb(200, 200, 200);
            background-color: rgb(160, 160, 160);
            --box-shadow-color: rgb(100, 100, 100);
        }

        &:active {
            top: 0;
            box-shadow: 0 4px 0 0 var(--box-shadow-color);
        }
    }

    &.loading {
        padding-right: 1rem;
    }

`


function Button(props) {

    const {forwardedRef, to, ...rest} = props;

    let toUrl = ''
    if (to != null) {
        toUrl = to
    }

    return(
        <Btn {...rest} to={toUrl} ref={forwardedRef}>
            {rest.children}
        </Btn>
    )
}


function wrapped(Component) {
    return React.forwardRef((props, ref) => {
        return(
            <Component {...props} forwardedRef={ref} />
        )
    })
}


export default wrapped(Button)