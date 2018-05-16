import { IDiceSet } from './AdvancedDice'
import { isOperator, Operator, toOperator } from './Operator'

export const parseInput = (inputString: string): IDiceSet[] | undefined => {
	const str = inputString.replace(/[+-]/g, ' $& ')
	let operator: Operator = Operator.Plus
	const diceSet: IDiceSet[] = []
	for (const diceString of str.split(' ')) {
		if (!diceString) {
			continue
		}
		else if (isOperator(diceString)) {
			operator = toOperator(diceString)
		}
		else if (/^[0-9]*d[0-9]*$/.test(diceString)) {
			const [numbers, sides] = diceString.split('d').map(x => {
				const result = parseInt(x, 10)
				return isNaN(result) ? 1 : result
			})

			diceSet.push({
				number: operator === Operator.Plus ? numbers : -numbers,
				sides,
			})
			operator = Operator.Plus
		}
		else {
			return undefined
		}
	}	
	return diceSet
}
