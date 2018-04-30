import React from 'react'
import * as SUI from 'semantic-ui-react'
import styled from 'styled-components'

interface IRollButtonProps {
	onRollClick: () => void
	onSettingClick: () => void
}

const RollButton: React.SFC<IRollButtonProps> = props => (
	<RollButtonContainer>
		<SUI.Button
			size="massive"
			primary
			onClick={props.onRollClick}>
			Roll
		</SUI.Button>
		<SUI.Button
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
