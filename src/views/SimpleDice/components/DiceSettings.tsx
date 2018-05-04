import React from 'react'
import * as SUI from 'semantic-ui-react'
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
			<SUI.Modal dimmer="inverted" open={isOpen} onClose={closeSettings}>
				<SUI.Modal.Header>Settings</SUI.Modal.Header>
				<SUI.Modal.Content>
					<SUI.Form>
						<SUI.Form.Field>
							<SUI.Checkbox toggle
								checked={shakeEvents}
								onChange={this.toggleShake}
								label="Shake to Roll (mobile)"
							/>
						</SUI.Form.Field>
						<SUI.Form.Field>
							<SUI.Checkbox toggle
								checked={keyboardCommands}
								onChange={this.toggleKeyboard}
								label="Keyboard Commands (Space to Roll, - + to Change Dice)"
							/>
						</SUI.Form.Field>
						<SUI.Form.Field>
							<SUI.Checkbox toggle
								checked={animations}
								onChange={this.toggleAnimations}
								label="Animations"
							/>
						</SUI.Form.Field>
					</SUI.Form>
				</SUI.Modal.Content>
				<SUI.Modal.Actions>
					<SUI.Button primary onClick={closeSettings}>
						Cancel
					</SUI.Button>
					<SUI.Button
						positive
						icon="checkmark"
						labelPosition="right"
						content="Save Settings"
						onClick={this.saveSettings}
					/>
				</SUI.Modal.Actions>
			</SUI.Modal>
		)
	}
}
