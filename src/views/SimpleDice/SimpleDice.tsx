import React from 'react'
import { Button, ButtonProps, Container } from 'semantic-ui-react'
import Shake from 'shake.js'
import styled, { StyledComponentClass } from 'styled-components'
import DiceDisplay from './components/DiceDisplay'
import DiceSettings from './components/DiceSettings'
import DiceSumDisplay from './components/DiceSumDisplay'
import RollButtonRow from './components/RollButtonRow'
import { MAXDICE } from './constants'
import { newDiceSet, rollDiceSet } from './functions'

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
	addValue = (): void => this.changeValue(this.state.diceSet.length + 1)
	minusValue = (): void => this.changeValue(this.state.diceSet.length - 1)

	handleKeyPress = (e: KeyboardEvent): void => {
		if (this.state.settings.keyboardCommands) {
			switch (e.key) {
				case ' ':
					return this.startRoll()
				case '-':
					return this.minusValue()
				case '=':
					return this.addValue()
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
		const { diceSet, settingsOpen, isRolling, settings, hasRolled } = this.state
		return (
			<StyledSimpleDiceContainer>
				<StyledSettingsButton
					circular
					icon="setting"
					primary
					onClick={this.openSettings}
				/>
				<DiceDisplay
					diceSet={diceSet}
					isRolling={isRolling}
				/>
				<DiceSumDisplay
					sum={diceSet.reduce((total, val) => total + val)}
					show={hasRolled && !isRolling}
				/>
				<RollButtonRow
					minusDisabled={isRolling || diceSet.length <= 1}
					addDisabled={isRolling || diceSet.length >= MAXDICE}
					rollDisabled={isRolling}
					onAdd={this.addValue}
					onMinus={this.minusValue}
					onRollClick={this.startRoll}
				/>
				<DiceSettings
					isOpen={settingsOpen}
					settings={settings}
					closeSettings={this.closeSettings}
					saveSettings={this.saveSettings}
				/>
			</StyledSimpleDiceContainer>
		)
	}
}

const StyledSimpleDiceContainer = styled(Container) `
	display: flex;
	flex-direction: column;
	position: relative;
`

const StyledSettingsButton = styled(Button)`
	position: absolute;
	right: 0;
	z-index: 1;
` as StyledComponentClass<ButtonProps, {}>
