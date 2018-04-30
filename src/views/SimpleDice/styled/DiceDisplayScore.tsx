import * as SUI from 'semantic-ui-react'
import styled, { StyledComponentClass } from 'styled-components'

const DiceDisplayScore = styled(SUI.Header) `
	position: absolute;
	bottom: 0px;
` as StyledComponentClass<SUI.HeaderProps, {}>
export default DiceDisplayScore
