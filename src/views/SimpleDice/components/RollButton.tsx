import React from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

interface IRollButtonProps {
	onRollClick: () => void
	onSettingClick: () => void
	rollDisabled: boolean
}

const RollButton: React.SFC<IRollButtonProps> = props => (
	<RollButtonContainer>
		<Button
			size="massive"
			primary
			onClick={props.onRollClick}
			disabled={props.rollDisabled}>
			Roll
		</Button>
		<Button
			style={{ marginLeft: 10 }}
			circular
			icon="setting"
			onClick={props.onSettingClick}
		/>
	</RollButtonContainer>
)
export default RollButton

const RollButtonContainer = styled.div`
	margin-top: 10px;
	display: flex;
	align-content: center;
	justify-content: center;
`
