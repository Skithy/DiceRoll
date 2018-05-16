import { Container } from 'semantic-ui-react'
import styled from 'styled-components'


export const FlexContainer = styled(Container) `
	display: flex !important;
	flex-direction: column;
	position: relative;
`

export const FlexCenteredContainer = styled(FlexContainer) `
	align-items: center;
`
