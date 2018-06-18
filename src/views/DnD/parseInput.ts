import { createEmptyDnDSet, IDnDSet } from './DnD'

export const parseInput = (inputString: string): IDnDSet | undefined => {
	const matches = inputString.match(/[0-9]*d(4|6|8|(10)|(12)|(20))/gi)
	if (matches) {
		return matches.reduce((diceSet: IDnDSet, match: string) => {
			const [num, sides] = match.split(/d/i)
			diceSet[sides] = new Array(num ? parseInt(num, 10) : 1).fill(1)
			return diceSet
		}, createEmptyDnDSet())
	}
	return undefined
}
