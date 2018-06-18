import React from 'react'
import { Input } from 'semantic-ui-react'
import { FlexContainer } from '../common/FlexContainer'
import DiceTable from './components/DiceTable'
import { parseInput } from './parseInput'

export interface IDnDSet {
	4: number[]
	6: number[]
	8: number[]
	10: number[]
	12: number[]
	20: number[]
}
export const createEmptyDnDSet = (): IDnDSet => ({
	4: [],
	6: [],
	8: [],
	10: [],
	12: [],
	20: [],
})

interface IDnDState {
	diceSet: IDnDSet
	inputString: string
	isValid: boolean
}
// create graph of expected outcomes
// min, max, median, standard deviation

export default class DnD extends React.PureComponent<{}, IDnDState> {
	state = {
		diceSet: createEmptyDnDSet(),
		inputString: '',
		isValid: true,
	} as IDnDState

	parseInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const inputString = e.target.value
		const diceSet = parseInput(inputString)
		this.setState({
			diceSet: diceSet || this.state.diceSet,
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
