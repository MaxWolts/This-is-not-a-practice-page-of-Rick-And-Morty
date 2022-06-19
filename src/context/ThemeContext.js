import React from 'react'

const ThemeContext = React.createContext(null);

const ThemeContextProvider = ({children}) => {
    const [themeValue, setThemeValue] = React.useState(false)
    return(
        <ThemeContext.Provider value={ { themeValue, setThemeValue } }>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }