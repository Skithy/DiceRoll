import React from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'
import styled, { StyledComponentClass } from 'styled-components'

interface IRollButtonProps {
	minusDisabled: boolean
	addDisabled: boolean
	rollDisabled: boolean
	onMinus: () => void
	onAdd: () =>  void
	onRollClick: () => void
}

const RollButton: React.SFC<IRollButtonProps> = props => (
	<StyledContainer>
		<StyledMinusButton
			primary
			icon="minus"
			as="a"
			size="massive"
			disabled={props.minusDisabled}
			onClick={props.onMinus}
		/>
		<StyledRollButton
			size="massive"
			primary
			onClick={props.onRollClick}
			disabled={props.rollDisabled}
		>
			Roll
		</StyledRollButton>
		<StyledAddButton
			primary
			icon="plus"
			as="a"
			size="massive"
			disabled={props.addDisabled}
			onClick={props.onAdd}
		/>
	</StyledContainer>
)
export default RollButton

const StyledContainer = styled.div`
	margin-top: 10px;
	display: flex;
	align-content: center;
	justify-content: center;
`

const StyledMinusButton = styled(Button)`
	margin-right: 2em !important;
	background-color: darkred !important;
` as StyledComponentClass<ButtonProps, {}>

const StyledAddButton = styled(Button) `
	margin-left: 2em !important;
	margin-right: 0 !important;
	background-color: darkgreen !important;
` as StyledComponentClass<ButtonProps, {}>

const StyledRollButton = styled(Button) `
	width: 8em !important;
	margin-right: 0 !important;
` as StyledComponentClass<ButtonProps, {}>
