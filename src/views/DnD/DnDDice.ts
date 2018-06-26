import { IDnDInputs } from './DnD'

export type Modifier = '+' | '-' | '*' | '/'
export interface IDnDDiceResult {
	diceSet: number[]
	modifier: Modifier
	modifierNum: number
	total: number
}

export interface IDnDDice {
	diceNum: number
	modifier: Modifier
	modifierNum: number
	result?: IDnDDiceResult
}

export interface IDnDSet {
	4: IDnDDice
	6: IDnDDice
	8: IDnDDice
	10: IDnDDice
	12: IDnDDice
	20: IDnDDice
}

const createEmptyDnDDice = (): IDnDDice => ({
	diceNum: 0,
	modifier: '+',
	modifierNum: 0,
})
export const createEmptyDnDSet = (): IDnDSet => [4, 6, 8, 10, 12, 20].reduce((dndSet, side) =>
	({ ...dndSet, [side]: createEmptyDnDDice() }),
	{} as IDnDSet
)

const dndSetToInputString = (dndSet: IDnDSet): string => {
	const diceStrings = Object.keys(dndSet).filter((sides) => dndSet[sides].diceNum !== 0).map((sides) => {
		const dndDice: IDnDDice = dndSet[sides]
		const modifierString = ('+-'.includes(dndDice.modifier) && dndDice.modifierNum !== 0) || '*/'.includes(dndDice.modifier)
			? `${dndDice.modifier}${dndDice.modifierNum}`
			: ''
		return `${dndDice.diceNum}d${sides}${modifierString}`
	})
	return diceStrings.length > 0 ? diceStrings.join(' ') : ''
}

export const dndSetToInputs = (dndSet: IDnDSet): IDnDInputs => {
	const dndInputs = Object.keys(dndSet).reduce((inputs, sides) => {
		return {
			...inputs,
			[sides]: {
				modifier: dndSet[sides].modifierNum,
				modifierValidation: '',
				number: dndSet[sides].diceNum,
				numberValidation: '',
			}
		}
	}, { search: { input: dndSetToInputString(dndSet), inputValidation: '' } })

	return dndInputs as IDnDInputs
}
