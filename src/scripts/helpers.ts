export const clone = (obj: any): any => JSON.parse(JSON.stringify(obj))

export const getRandInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min

export const newDiceSet = (n: number): number[] =>
	Array.from(new Array(n)).map(d => 1)

export const rollDice = (diceNum: number, sides: number): number[] => 
	Array.from(new Array(diceNum)).map(() => getRandInt(1, sides))

export const sum = (arr: number[]): number => arr.reduce((total, val) => total + val, 0)

export const tryParseInt = (str: string): number => {
	if (/^(\-|\+)?([0-9]+|Infinity)$/.test(str)) {
		return Number(str)
	}
	return NaN
}
