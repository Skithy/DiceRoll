export const clone = (obj: any): any => JSON.parse(JSON.stringify(obj))

export const getRandInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min

export const rollDiceSet = (num: number, sides: number): number[] =>
	Array.from(new Array(num)).map(() => getRandInt(1, sides))

export const sum = (arr: number[]): number => arr.reduce((total, val) => total + val, 0)
