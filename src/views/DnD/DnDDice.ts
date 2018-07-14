import { IDnDInputs } from './DnD'

export type Modifier = '+' | '-' | '*' | '/'

export interface IDnDDice {
	diceNum: number
	modifier: Modifier
	modifierNum: number
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

export const diceToString = (sides: string, dndDice: IDnDDice): string => {
	const modifierString = ('+-'.includes(dndDice.modifier) && dndDice.modifierNum !== 0) || ('*/'.includes(dndDice.modifier) && dndDice.modifierNum !== 1)
		? `${dndDice.modifier}${dndDice.modifierNum}`
		: ''
	return `${dndDice.diceNum}d${sides}${modifierString}`
}

const dndSetToInputString = (dndSet: IDnDSet): string => {
	const diceStrings = Object.keys(dndSet).filter((sides) => (dndSet[sides] as IDnDDice).diceNum !== 0).map((sides) => diceToString(sides, dndSet[sides]))
	return diceStrings.length > 0 ? diceStrings.join(' ') : ''
}

export const dndSetToInputs = (dndSet?: IDnDSet, prevInputs?: IDnDInputs): IDnDInputs => {
	const set = dndSet || createEmptyDnDSet()

	const dndInputs = Object.keys(set).reduce((inputs, sides) => {
		return {
			...inputs,
			[sides]: {
				modifier: set[sides].modifier,
				modifierNum: set[sides].modifierNum.toString(),
				modifierNumValidation: '',
				number: set[sides].diceNum.toString(),
				numberValidation: '',
				result: prevInputs ? prevInputs[sides].result : ''
			}
		}
	}, { search: { input: dndSetToInputString(set), inputValidation: '' } })

	return dndInputs as IDnDInputs
}
