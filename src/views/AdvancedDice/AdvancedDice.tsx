import React from 'react'
import { arrayMove, SortEnd } from 'react-sortable-hoc'
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
		diceSet: parseInput('2d6'),
		inputString: '2d6',
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

	onSortEnd = ({ oldIndex, newIndex }: SortEnd) => this.setState({ diceSet: arrayMove(this.state.diceSet, oldIndex, newIndex) })

	render() {
		const { isValid, inputString, diceSet } = this.state
		return (
			<FlexContainer>
				<Input error={!isValid} onChange={this.parseInput} value={inputString} />
				<DiceTable
					diceSet={diceSet}
					onSortEnd={this.onSortEnd}
					useDragHandle={true}
					// hideSortableGhost={false}
				/>
			</FlexContainer>
		)
	}
}
