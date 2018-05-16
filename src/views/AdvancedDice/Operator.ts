export enum Operator {
	None = '',
	Plus = '+',
	Minus = '-',
}
export const isOperator = (str: string): boolean => str === '+' || str === '-'
export const toOperator = (str: string): Operator => {
	switch (str) {
		case '+': return Operator.Plus
		case '-': return Operator.Minus
		default: return Operator.None
	}
}
