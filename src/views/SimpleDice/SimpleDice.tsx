import React from 'react'
import DiceCounter from './components/DiceCounter'
import DiceDisplay from './components/DiceDisplay'
import DiceSettings from './components/DiceSettings'
import RollButton from './components/RollButton'
import { MAXDICE } from './constants'
import { newDiceSet, rollDiceSet } from './functions'
import SimpleDiceContainer from './styled/SimpleDiceContainer'

interface ISettings {
	keyboardCommands: boolean
	shake2Roll: boolean
}

interface ISimpleDiceState {
	diceSet: number[]
	settingsOpen: boolean
	settings: ISettings
}
// TODO:
// Shake to roll
// Spacebar to roll
// Click to roll
// + - to change value
// textbox to change value
// roll animations + sound effects??
// Add history
// https://www.critdice.com/how-to-roll-dice/
// Save dice combos

export default class SimpleDice extends React.PureComponent<{}, ISimpleDiceState> {
	state = {
		diceSet: [1],
		settings: {
			keyboardCommands: true,
			shake2Roll: true,
		},
		settingsOpen: false,
	}

	changeValue = (n: number) => {
		if (n >= 1 && n <= MAXDICE) {
			this.setState({ diceSet: newDiceSet(n) })
		}
	}
	rollDiceSet = () => this.setState({ diceSet: rollDiceSet(this.state.diceSet, 6) })

	openSettings = () => this.setState({ settingsOpen: true })
	closeSettings = () => this.setState({ settingsOpen: false })
	saveSettings = (settings: ISettings) => this.setState({ settingsOpen: false, settings })

	render() {
		const { diceSet, settingsOpen } = this.state
		return (
			<SimpleDiceContainer>
				<DiceCounter value={diceSet.length} changeValue={this.changeValue} />
				<DiceDisplay diceSet={diceSet} />
				<RollButton onRollClick={this.rollDiceSet} onSettingClick={this.openSettings} />
				<DiceSettings isOpen={settingsOpen} closeSettings={this.closeSettings} saveSettings={this.saveSettings} />
			</SimpleDiceContainer>
		)
	}
}
