import React from 'react'
import { Button, Checkbox, Form, Modal } from 'semantic-ui-react'
import { ISettings } from '../SimpleDice'

interface IDiceSettingsProps {
	isOpen: boolean
	settings: ISettings
	closeSettings: () => void
	saveSettings: (settings: ISettings) => void
}

export default class DiceSettings extends React.PureComponent<IDiceSettingsProps, ISettings> {
	constructor(props: IDiceSettingsProps) {
		super(props)
		this.state = {...props.settings}
	}

	saveSettings = (): void => this.props.saveSettings(this.state)
	toggleShake = (): void => this.setState({ shakeEvents: !this.state.shakeEvents })
	toggleKeyboard = (): void => this.setState({ keyboardCommands: !this.state.keyboardCommands })
	toggleAnimations = (): void => this.setState({ animations: !this.state.animations })

	render() {
		const { isOpen, closeSettings, } = this.props
		const { shakeEvents, keyboardCommands, animations } = this.state
		return (
			<Modal dimmer="inverted" open={isOpen} onClose={closeSettings}>
				<Modal.Header>Settings</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<Checkbox toggle
								checked={shakeEvents}
								onChange={this.toggleShake}
								label="Shake to Roll (mobile)"
							/>
						</Form.Field>
						<Form.Field>
							<Checkbox toggle
								checked={keyboardCommands}
								onChange={this.toggleKeyboard}
								label="Keyboard Commands (Space to Roll, - + to Change Dice)"
							/>
						</Form.Field>
						<Form.Field>
							<Checkbox toggle
								checked={animations}
								onChange={this.toggleAnimations}
								label="Animations"
							/>
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button primary onClick={closeSettings}>
						Cancel
					</Button>
					<Button
						positive
						icon="checkmark"
						labelPosition="right"
						content="Save Settings"
						onClick={this.saveSettings}
					/>
				</Modal.Actions>
			</Modal>
		)
	}
}
