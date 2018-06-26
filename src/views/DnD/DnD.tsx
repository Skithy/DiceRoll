import React from 'react'
import { rollDiceSet, sum } from 'scripts/helpers'
import { Input } from 'semantic-ui-react'
import { FlexContainer } from '../common/FlexContainer'
import DiceTable from './components/DiceTable'
import { createEmptyDnDSet, dndSetToInputs, IDnDDice, IDnDSet } from './DnDDice'
import { parseDnDSet } from './parseInput'

export interface IDiceInput {
	number: string
	numberValidation: string
	modifier: string
	modifierValidation: string
}

export interface IDnDInputs {
	search: { input: string, inputValidation: string }
	4: IDiceInput
	6: IDiceInput
	8: IDiceInput
	10: IDiceInput
	12: IDiceInput
	20: IDiceInput
}

interface IDnDState {
	diceSet: IDnDSet
	formInputs: IDnDInputs
}
// Preset dice pages (for each class)
export default class DnD extends React.PureComponent<{}, IDnDState> {
	state = {
		diceSet: createEmptyDnDSet(),
		formInputs: dndSetToInputs(createEmptyDnDSet())
	} as IDnDState

	parseInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const inputString = e.target.value
		const diceSet = parseDnDSet(inputString, this.state.diceSet)
		this.setState({
			diceSet: diceSet || this.state.diceSet,
			formInputs: {
				...dndSetToInputs(diceSet || this.state.diceSet),
				search: { input: inputString, inputValidation: diceSet ? '' : 'error' }
			}
		})
	}

	resetDice = (): void => this.setState({ diceSet: createEmptyDnDSet(), formInputs: dndSetToInputs(createEmptyDnDSet()) })

	changeDiceNum = (sides: string, numString: string) => {
		let num: number | undefined
		try { num = parseInt(numString, 10) } catch (e) { num = undefined }
		if (num !== undefined && num >= 0) {
			const newDnDSet = {
				...this.state.diceSet,
				[sides]: {
					...this.state.diceSet[sides],
					diceNum: num,
				}
			}
			this.setState({ diceSet: newDnDSet, formInputs: dndSetToInputs(newDnDSet) })
		} else {
			this.setState({
				formInputs: {
					...this.state.formInputs,
					[sides]: {
						...this.state.formInputs[sides],
						number: numString,
						numberValidation: 'error'
					}
				}
			})
		}
	}

	changeModifier = (sides: string, modifier: string) => {
		const newDnDSet = {
			...this.state.diceSet,
			[sides]: {
				...this.state.diceSet[sides],
				modifier,
			}
		}
		this.setState({ diceSet: newDnDSet })
	}

	changeModifierNum = (sides: string, numString: string) => {
		let num: number | undefined
		try { num = parseInt(numString, 10) } catch (e) { num = undefined }
		if (num !== undefined && !isNaN(num)) {
			const newDnDSet = {
				...this.state.diceSet,
				[sides]: {
					...this.state.diceSet[sides],
					modifierNum: num,
				}
			}
			this.setState({ diceSet: newDnDSet, formInputs: dndSetToInputs(newDnDSet) })
		} else {
			this.setState({
				formInputs: {
					...this.state.formInputs,
					[sides]: {
						...this.state.formInputs[sides],
						modifier: numString,
						modifierValidation: 'error'
					}
				}
			})
		}
	}

	rollDice = (sides: string) => {
		const dndDice: IDnDDice = this.state.diceSet[sides]
		const diceSet = rollDiceSet(dndDice.diceNum, parseInt(sides, 10))
		let total: number = sum(diceSet)
		switch (dndDice.modifier) {
			case '+':
				total += dndDice.modifierNum
				break
			case '-':
				total -= dndDice.modifierNum
				break
			case '*':
				total *= dndDice.modifierNum
				break
			case '/':
				total = Math.floor(total/dndDice.modifierNum)
				break
		}

		const newDnDSet = {
			...this.state.diceSet,
			[sides]: {
				...this.state.diceSet[sides],
				result: {
					diceSet,
					modifier: dndDice.modifier,
					modifierNum: dndDice.modifierNum,
					total,
				},
			}
		}
		this.setState({ diceSet: newDnDSet })
	}

	render() {
		const { diceSet, formInputs } = this.state
		return (
			<FlexContainer>
				<Input
					error={!!formInputs.search.inputValidation}
					onChange={this.parseInput}
					value={formInputs.search.input}
					placeholder="2d20 d6+5 ..."
				/>
				<DiceTable
					diceSet={diceSet}
					dndInputs={formInputs}
					changeDiceNum={this.changeDiceNum}
					changeModifier={this.changeModifier}
					changeModifierNum={this.changeModifierNum}
					rollDice={this.rollDice}
					resetDice={this.resetDice}
				/>
			</FlexContainer>
		)
	}
}
