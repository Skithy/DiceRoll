import React from 'react'
import { Input } from 'semantic-ui-react'
import { FlexContainer } from '../common/FlexContainer'
import DiceTable from './components/DiceTable'
import { parseInput } from './parseInput'

export interface IDiceSet {
	sides: number
	number: number
}

interface IAdvancedDiceState {
	diceSet: IDiceSet[]
	inputString: string
	isValid: boolean
}
// create graph of expected outcomes
// min, max, median, standard deviation

export default class AdvancedDice extends React.PureComponent<{}, IAdvancedDiceState> {
	state = {
		diceSet: [],
		inputString: '',
		isValid: true,
	} as IAdvancedDiceState

	parseInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const inputString = e.target.value
		const diceSet = parseInput(inputString)
		this.setState({
			diceSet: diceSet || [],
			inputString,
			isValid: !!diceSet,
		})
	}

	render() {
		const { isValid, inputString, diceSet } = this.state
		return (
			<FlexContainer>
				<Input error={!isValid} onChange={this.parseInput} value={inputString} />
				<DiceTable diceSet={diceSet} />
			</FlexContainer>
		)
	}
}
