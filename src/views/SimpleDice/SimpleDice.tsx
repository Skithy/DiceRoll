import React from 'react'
import Shake from 'shake.js'
import DiceCounter from './components/DiceCounter'
import DiceDisplay from './components/DiceDisplay'
import DiceSettings from './components/DiceSettings'
import RollButton from './components/RollButton'
import { MAXDICE } from './constants'
import { newDiceSet, rollDiceSet } from './functions'
import SimpleDiceContainer from './styled/SimpleDiceContainer'

export interface ISettings {
	keyboardCommands: boolean
	shakeEvents: boolean
	animations: boolean
}

interface ISimpleDiceState {
	diceSet: number[]
	hasRolled: boolean
	isRolling: boolean
	settingsOpen: boolean
	settings: ISettings
}
// TODO:
// https://www.critdice.com/how-to-roll-dice/
// Save dice combos

export default class SimpleDice extends React.PureComponent<{}, ISimpleDiceState> {
	ref: any
	shakeEvent = new Shake({
		threshold: 15,
		timeout: 1000,
	})

	state = {
		diceSet: [1],
		hasRolled: false,
		isRolling: false,
		settings: {
			animations: true,
			keyboardCommands: true,
			shakeEvents: true,
		},
		settingsOpen: false,
	}

	componentDidMount() {
		this.shakeEvent.start()
		window.addEventListener('shake', this.handleShake)
		window.addEventListener('keypress', this.handleKeyPress)
	}

	componentWillUnmount() {
		this.shakeEvent.stop()
		window.removeEventListener('shake', this.handleShake)
		window.removeEventListener('keypress', this.handleKeyPress)
	}

	changeValue = (n: number): void => {
		if (n >= 1 && n <= MAXDICE) {
			this.setState({ diceSet: newDiceSet(n), hasRolled: false })
		}
	}

	handleKeyPress = (e: KeyboardEvent): void => {
		if (this.state.settings.keyboardCommands) {
			switch (e.key) {
				case ' ':
					return this.startRoll()
				case '-':
					return this.changeValue(this.state.diceSet.length - 1)
				case '=':
					return this.changeValue(this.state.diceSet.length + 1)
			}
		}
	}

	handleShake = (): void => {
		if (this.state.settings.shakeEvents) {
			this.startRoll()
		}
	}

	startRoll = (): void => {
		if (this.state.settingsOpen || this.state.isRolling) {
			return
		}
		
		this.setState({ diceSet: rollDiceSet(this.state.diceSet, 6), hasRolled: true })
		if (this.state.settings.animations) {
			this.setState({ isRolling: true, }, () => {
				setTimeout(() => this.setState({ isRolling: false }), 600)
			})
		}
	}

	openSettings = () => this.setState({ settingsOpen: true })
	closeSettings = () => this.setState({ settingsOpen: false })
	saveSettings = (settings: ISettings) => this.setState({ settingsOpen: false, settings })

	render() {
		const { diceSet, settingsOpen, hasRolled, isRolling, settings } = this.state
		return (
			<SimpleDiceContainer>
				<DiceCounter
					value={diceSet.length}
					isRolling={isRolling}
					changeValue={this.changeValue}
				/>
				<DiceDisplay
					diceSet={diceSet}
					hasRolled={hasRolled}
					isRolling={isRolling}
				/>
				<RollButton
					onRollClick={this.startRoll}
					onSettingClick={this.openSettings}
					rollDisabled={isRolling}
				/>
				<DiceSettings
					isOpen={settingsOpen}
					settings={settings}
					closeSettings={this.closeSettings}
					saveSettings={this.saveSettings}
				/>
			</SimpleDiceContainer>
		)
	}
}
