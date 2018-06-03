import React from 'react'
import { get, set } from 'scripts/store'
import Shake from 'shake.js'
import { FlexContainer } from '../common/FlexContainer'
import SettingsButton from '../common/SettingsButton'
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
		diceSet: get('simpledice_diceSet') || [1],
		hasRolled: get('simpledice_hasRolled') || false,
		isRolling: false,
		settings: get('simpledice_settings') || {
			animations: true,
			keyboardCommands: true,
			shakeEvents: true,
		},
		settingsOpen: false,
	} as ISimpleDiceState

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

	componentDidUpdate() {
		set('simpledice_diceSet', this.state.diceSet)
		set('simpledice_hasRolled', this.state.hasRolled)
		set('simpledice_settings', this.state.settings)
	}

	changeValue = (n: number): void => {
		if (n >= 1 && n <= MAXDICE && !this.state.isRolling) {
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
		
		this.setState({
			diceSet: rollDiceSet(this.state.diceSet, 6),
			hasRolled: true,
			isRolling: this.state.settings.animations,
		})
	}
	onAnimationEnd = () => this.setState({ isRolling: false })

	openSettings = () => this.setState({ settingsOpen: true })
	closeSettings = () => this.setState({ settingsOpen: false })
	saveSettings = (settings: ISettings) => {
		this.setState({ settingsOpen: false, settings })
	}

	render() {
		const { diceSet, settingsOpen, isRolling, settings, hasRolled } = this.state
		return (
			<FlexContainer>
				<SettingsButton onClick={this.openSettings} />
				<DiceDisplay
					animationDuration={600}
					diceSet={diceSet}
					isRolling={isRolling}
					onAnimationEnd={this.onAnimationEnd}
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
			</FlexContainer>
		)
	}
}
