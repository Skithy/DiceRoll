import React from 'react'
import * as SUI from 'semantic-ui-react'

interface IDiceSettingsProps {
	isOpen: boolean
	closeSettings: () => void
	saveSettings: (settings: any) => void
}

const DiceSettings: React.SFC<IDiceSettingsProps> = props => (
	<SUI.Modal dimmer="inverted" open={props.isOpen} onClose={props.closeSettings}>
		<SUI.Modal.Header>Settings</SUI.Modal.Header>
		<SUI.Modal.Content>
			<SUI.Modal.Description>
				<SUI.Header>Default Profile Image</SUI.Header>
				<p>Shake to Roll?</p>
				<p>Keyboard commands?</p>
				<p>Animations?</p>
			</SUI.Modal.Description>
		</SUI.Modal.Content>
		<SUI.Modal.Actions>
			<SUI.Button primary onClick={props.closeSettings}>
				Cancel
			</SUI.Button>
			<SUI.Button positive icon="checkmark" labelPosition="right" content="Save settings" onClick={props.saveSettings} />
		</SUI.Modal.Actions>
	</SUI.Modal>
)
export default DiceSettings
