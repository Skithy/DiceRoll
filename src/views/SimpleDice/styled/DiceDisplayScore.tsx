import { Header, HeaderProps } from 'semantic-ui-react'
import styled, { StyledComponentClass } from 'styled-components'

const DiceDisplayScore = styled(Header) `
	position: absolute;
	bottom: 0px;
` as StyledComponentClass<HeaderProps, {}>
export default DiceDisplayScore
