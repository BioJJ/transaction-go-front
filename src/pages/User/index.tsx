import React from 'react'

import ContentHeader from '../../components/ContentHeader'
import Layout from '../../components/Layout'

import { Container } from './style'

export interface SelectedFile {
	name: string
	size: number
	type: string
}

const List: React.FC = () => {
	const pageData = {
		title: 'User',
		lineColor: '#4E41F0'
	}

	return (
		<Layout>
			<Container>
				<ContentHeader
					title={pageData.title}
					lineColor={pageData.lineColor}
				></ContentHeader>
			</Container>
		</Layout>
	)
}

export default List
