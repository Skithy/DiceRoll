import * as React from 'react'
import { rollDice, sum, tryParseInt } from 'scripts/helpers'
import { Button } from 'semantic-ui-react'
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
	time: Date
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
	
	parseInput: React.FormEventHandler<HTMLInputElement> = (e): void => {
		const inputString = e.currentTarget.value
		this.setState((prevState) => {
			const diceSet = parseDnDSet(inputString, prevState.diceSet)
			return {
				diceSet: diceSet || prevState.diceSet,
				formInputs: {
					...dndSetToInputs(diceSet || prevState.diceSet, prevState.formInputs),
					search: { input: inputString, inputValidation: diceSet ? '' : 'error' }
				}
			}
		})
	}

	resetDice = (): void => this.setState({ diceSet: createEmptyDnDSet(), formInputs: dndSetToInputs() })

	changeDiceNum = (sides: string, numString: string) => {
		this.setState((prevState) => {
			const num = tryParseInt(numString)
			if (!isNaN(num) && num >= 0) {
				const newDnDSet = {
					...prevState.diceSet,
					[sides]: {
						...prevState.diceSet[sides],
						diceNum: num,
					}
				}
				return {
					diceSet: newDnDSet,
					formInputs: dndSetToInputs(newDnDSet, prevState.formInputs)
				}
			}

			return {
				...prevState,
				formInputs: {
					...prevState.formInputs,
					[sides]: {
						...prevState.formInputs[sides],
						number: numString,
						numberValidation: 'error'
					}
				}
			}
		})
	}

	changeModifier = (sides: string, modifier: string) => {
		this.setState((prevState) => {
			const newDnDSet = {
				...prevState.diceSet,
				[sides]: {
					...prevState.diceSet[sides],
					modifier,
				}
			}

			return {
				diceSet: newDnDSet,
				formInputs: dndSetToInputs(newDnDSet)
			}
		})
	}

	changeModifierNum = (sides: string, numString: string) => {
		this.setState((prevState) => {
			const num = tryParseInt(numString)
			if (!isNaN(num)) {
				const newDnDSet: IDnDSet = {
					...prevState.diceSet,
					[sides]: {
						...prevState.diceSet[sides],
						modifierNum: num,
					}
				}
				return {
					diceSet: newDnDSet,
					formInputs: dndSetToInputs(newDnDSet)
				}
			}
			
			return {
				...prevState,
				formInputs: {
					...prevState.formInputs,
					[sides]: {
						...prevState.formInputs[sides],
						modifierNum: numString,
						modifierNumValidation: 'error'
					}
				}
			}
		})
	}

	rollDice = (sides: string) => {
		this.setState((prevState) => {
			const dndDice: IDnDDice = prevState.diceSet[sides]
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
					total = Math.floor(total / dndDice.modifierNum)
					break
			}

			const formInputs = {
				...prevState.formInputs,
				[sides]: {
					...prevState.formInputs[sides],
					result: total.toString()
				}
			}
			const logEntry: ILogEntry = {
				diceSet,
				modifier: dndDice.modifier,
				modifierNum: dndDice.modifierNum,
				sides: tryParseInt(sides),
				time: new Date(),
				total,
			}
			const rollLog = [...prevState.rollLog, logEntry]

			return { formInputs, rollLog }
		})
	}

	rollAllDice = () => {
		Object.keys(this.state.diceSet).forEach((sides) => {
			const dndDice: IDnDDice = this.state.diceSet[sides]
			if (dndDice.diceNum > 0 || dndDice.modifierNum !== 0) {
				this.rollDice(sides)
			}
		})
	}

	onEnter: React.KeyboardEventHandler = (e, sides?: string) => {
		if (e.key === 'Enter') {
			if (sides) {
				this.rollDice(sides)
			} else {
				this.rollAllDice()
			}
		}
	}

	resetLog = () => {
		this.setState({ rollLog: [] })
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
							onKeyPress={this.onEnter}
						/>
						<Button primary onClick={this.rollAllDice} className="roll-all-button">Roll</Button>
					</div>
					<DiceTable
						changeDiceNum={this.changeDiceNum}
						changeModifier={this.changeModifier}
						changeModifierNum={this.changeModifierNum}
						dndInputs={formInputs}
						onEnter={this.onEnter}
						rollDice={this.rollDice}
						resetDice={this.resetDice}
					/>
				</div>
				<div className="dnd-log"><Log rollLog={rollLog} resetLog={this.resetLog} /></div>
			</div>
		)
	}
}
