import { createEmptyDnDSet, IDnDSet } from './DnDDice'

export const parseDnDSet = (inputString: string, prevDnDSet: IDnDSet): IDnDSet | undefined => {
	const newDnDSet = createEmptyDnDSet()
	for (const sides of Object.keys(prevDnDSet)) {
		newDnDSet[sides].modifier = prevDnDSet[sides].modifier
	}

	if (!inputString) {
		return newDnDSet
	}

	const inputs = inputString.trim().split(' ')
	for (const input of inputs) {
		if (/^[0-9]*d(4|6|8|(10)|(12)|(20))((\+|\-|\/|\*)(\+|\-)?[0-9]+)?$/i.test(input)) {
			const [diceNum, rightD] = input.split(/d/i)
			const [sides, modifierNum] = rightD.replace(/\+|\-|\/|\*/, '~').split('~')
			newDnDSet[sides].diceNum = parseInt(diceNum, 10) || 1
			if (modifierNum) {
				newDnDSet[sides].modifier = input.match(/\+|\-|\/|\*/i)![0]
				newDnDSet[sides].modifierNum = parseInt(modifierNum, 10)
			}
		} else {
			return undefined
		}
	}
	return newDnDSet
}
