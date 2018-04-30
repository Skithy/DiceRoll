export const newDiceSet = (n: number): number[] =>
	Array.from(new Array(n)).map(d => 1)

export const getRandInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min

export const rollDiceSet = (set: number[], sides: number): number[] =>
	set.map(() => getRandInt(1, sides))
