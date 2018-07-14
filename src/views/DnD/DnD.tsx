import React from 'react'
import { rollDice, sum, tryParseInt } from 'scripts/helpers'
import { Icon } from 'semantic-ui-react'
import DiceTable from './components/DiceTable'
import Log from './components/Log'
import './DnD.css'
import { createEmptyDnDSet, dndSetToInputs, IDnDDice, IDnDSet, Modifier } from './DnDDice'
import { parseDnDSet } from './parseInput'

export interface ILogEntry {
	sides: number
	diceSet: number[]
	modifier: Modifier
	modifierNum: number
	total: number
}

export interface IDiceInput {
	number: string
	numberValidation: string
	modifierNum: string
	modifierNumValidation: string
	modifier: string
	result: string
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
	rollLog: ILogEntry[]
}
export default class DnD extends React.PureComponent<{}, IDnDState> {
	constructor(props: any) {
		super(props)

		const dndSet = {
			...createEmptyDnDSet(),
			6: {
				diceNum: 1,
				modifier: '+',
				modifierNum: 0,
			},
			10: {
				diceNum: 1,
				modifier: '+',
				modifierNum: 0,
			}
		} as IDnDSet
		
		this.state = {
			diceSet: dndSet,
			formInputs: dndSetToInputs(dndSet),
			rollLog: []
		}
	}
	
	parseInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const inputString = e.target.value
		const diceSet = parseDnDSet(inputString, this.state.diceSet)
		this.setState({
			diceSet: diceSet || this.state.diceSet,
			formInputs: {
				...dndSetToInputs(diceSet || this.state.diceSet, this.state.formInputs),
				search: { input: inputString, inputValidation: diceSet ? '' : 'error' }
			}
		})
	}

	resetDice = (): void => this.setState({ diceSet: createEmptyDnDSet(), formInputs: dndSetToInputs() })

	changeDiceNum = (sides: string, numString: string) => {
		const num = tryParseInt(numString)
		if (!isNaN(num) && num >= 0) {
			const newDnDSet = {
				...this.state.diceSet,
				[sides]: {
					...this.state.diceSet[sides],
					diceNum: num,
				}
			}
			this.setState({ diceSet: newDnDSet, formInputs: dndSetToInputs(newDnDSet, this.state.formInputs) })
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
		this.setState({ diceSet: newDnDSet, formInputs: dndSetToInputs(newDnDSet) })
	}

	changeModifierNum = (sides: string, numString: string) => {
		const num = tryParseInt(numString)
		if (!isNaN(num)) {
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
						modifierNum: numString,
						modifierNumValidation: 'error'
					}
				}
			})
		}
	}

	rollDice = (sides: string) => {
		const dndDice: IDnDDice = this.state.diceSet[sides]
		const diceSet = rollDice(dndDice.diceNum, parseInt(sides, 10))
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

		const formInputs = {
			...this.state.formInputs,
			[sides]: {
				...this.state.formInputs[sides],
				result: total.toString()
			}
		}
		const logEntry: ILogEntry = {
			diceSet,
			modifier: dndDice.modifier,
			modifierNum: dndDice.modifierNum,
			sides: tryParseInt(sides),
			total,
		}
		const rollLog = [...this.state.rollLog, logEntry]
		this.setState({ formInputs, rollLog })
	}

	render() {
		const { formInputs, rollLog } = this.state
		return (
			<div className="dnd-grid">
				<div className="dnd-table">
					<div className="dice-input-wrapper">
						<input
							className={`dice-input ${formInputs.search.inputValidation}`}
							onChange={this.parseInput}
							value={formInputs.search.input}
							placeholder="2d20 d6+5 ..."
						/>
						<Icon name="search" className="dice-input-icon"/>
					</div>
					<DiceTable
						dndInputs={formInputs}
						changeDiceNum={this.changeDiceNum}
						changeModifier={this.changeModifier}
						changeModifierNum={this.changeModifierNum}
						rollDice={this.rollDice}
						resetDice={this.resetDice}
					/>
				</div>
				<div className="dnd-log"><Log rollLog={rollLog}/></div>
			</div>
		)
	}
}
