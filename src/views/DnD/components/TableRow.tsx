import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import { IDiceInput } from '../DnD'
import { Modifier } from '../DnDDice'

const options = [
	{ text: '+', value: '+' },
	{ text: '-', value: '-' },
	{ text: '×', value: '*' },
	{ text: '÷', value: '/' },
]

interface ITableRowProps {
	sides: string
	dndInput: IDiceInput
	changeDiceNum: (e: React.FormEvent<HTMLInputElement>) => void
	changeModifier: (modifier: Modifier) => void
	changeModifierNum: (e: React.FormEvent<HTMLInputElement>) => void
	rollDice: () => void
}

const TableRow: React.SFC<ITableRowProps> = (props) => {
	const disabled = props.dndInput.number === '0' && props.dndInput.modifierNum === '0'
	const colourCSS = disabled ? 'gray' : ''
	return (
		<tr>
			<td className="td-dice"><i className={`mdi mdi-dice-d${props.sides} ${colourCSS}`} /></td>
			<td className="td-input">
				<input
					className={`table-input ${props.dndInput.numberValidation} ${colourCSS}`}
					type="tel"
					min="0"
					onChange={props.changeDiceNum}
					value={props.dndInput.number}
				/>
			</td>
			<td className="td-modifier-input">
				<Dropdown
					button
					className="dnd-modifier-dropdown primary"
					onChange={(_, d) => props.changeModifier(d.value as Modifier)}
					value={props.dndInput.modifier}
					options={options}
				/>
				<input
					className={`table-input ${props.dndInput.modifierNumValidation} ${colourCSS}`}
					type="tel"
					onChange={props.changeModifierNum}
					value={props.dndInput.modifierNum}
				/>
			</td>
			<td className="td-button">
				<Button
					className="roll-button"
					primary
					disabled={!!props.dndInput.modifierNumValidation || !!props.dndInput.numberValidation || disabled}
					onClick={props.rollDice}
				>
					Roll
				</Button>
			</td>
			<td className="td-result"><p>{props.dndInput.result}</p></td>
		</tr>
	)
}
export default TableRow
