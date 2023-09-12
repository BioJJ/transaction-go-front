import React, { ReactNode } from 'react'
import { Container } from './style'

interface ContentProps {
	children: ReactNode
}

const Content: React.FunctionComponent<ContentProps> = ({ children }) => (
	<Container>{children}</Container>
)

export default Content
