import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'



const getMergedTheme = (reduxTheme) => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme != null) return localTheme
    return reduxTheme
}

export default function ThemeContext({ children }) {

    const themeRedux = useSelector(store => store.theme.value)
    const theme = getMergedTheme(themeRedux)

    return(
        <ThemeProvider theme={{ theme: theme }}>
            {children}
        </ThemeProvider>
    )
}