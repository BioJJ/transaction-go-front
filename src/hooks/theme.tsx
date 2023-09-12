import React, { createContext, useState, useContext, ReactNode } from 'react'

import dark from '../styles/themes/dark'
import light from '../styles/themes/light'

interface ContentProps {
	children: ReactNode
}
interface IThemeContext {
	toggleTheme(): void
	theme: ITheme
}

interface ITheme {
	title: string

	colors: {
		primary: string
		secondary: string
		tertiary: string

		white: string
		black: string
		gray: string

		success: string
		info: string
		warning: string
	}
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

const ThemeProvider: React.FunctionComponent<ContentProps> = ({ children }) => {
	const [theme, setTheme] = useState<ITheme>(() => {
		const themeSaved = localStorage.getItem('@energy-bill:theme')

		if (themeSaved) {
			return JSON.parse(themeSaved)
		} else {
			return dark
		}
	})

	const toggleTheme = () => {
		if (theme.title === 'dark') {
			setTheme(light)
			localStorage.setItem('@energy-bill:theme', JSON.stringify(light))
		} else {
			setTheme(dark)
			localStorage.setItem('@energy-bill:theme', JSON.stringify(dark))
		}
	}

	return (
		<ThemeContext.Provider value={{ toggleTheme, theme }}>
			{children}
		</ThemeContext.Provider>
	)
}

function useTheme(): IThemeContext {
	const context = useContext(ThemeContext)

	return context
}

export { ThemeProvider, useTheme }
