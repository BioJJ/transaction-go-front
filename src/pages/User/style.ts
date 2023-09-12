import styled from 'styled-components'

export const Container = styled.div``

export const Content = styled.main``

export const FileUploadContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	margin-bottom: 40px;
`

export const UploadInput = styled.input`
	display: none;
`

export const Label = styled.label`
	background-color: ${(props) => props.theme.colors.gray};
	color: ${(props) => props.theme.colors.secondary};
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
`

export const ButtonFile = styled.button`
	background-color: ${(props) => props.theme.colors.gray};
	color: ${(props) => props.theme.colors.secondary};
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
`

export const ButtonFileCancel = styled.button`
	background-color: ${(props) => props.theme.colors.warning};
	color: ${(props) => props.theme.colors.secondary};
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
`

export const SelectedFileName = styled.p`
	margin-top: 10px;
	margin-bottom: 10px;
`

export const FileUploadButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: start;
	margin-bottom: 40px;
	gap: 20px;
`
