import React from 'react'
import { pure } from 'recompose'
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
	changeDiceNum: React.FormEventHandler<HTMLInputElement>
	changeModifier: (modifier: Modifier) => void
	changeModifierNum: React.FormEventHandler<HTMLInputElement>
	onEnter: React.KeyboardEventHandler
	rollDice: () => void
}

const TableRow: React.SFC<ITableRowProps> = (props) => {
	const disabled = props.dndInput.number === '0' && props.dndInput.modifierNum === '0'
	const searchDisabled = !!props.dndInput.modifierNumValidation || !!props.dndInput.numberValidation || disabled
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
					onKeyPress={(e) => searchDisabled ? null : props.onEnter(e)}
					value={props.dndInput.number}
				/>
			</td>
			<td className="td-modifier-input">
				<Dropdown
					button
					className={`dnd-modifier-dropdown primary ${colourCSS} ${props.dndInput.modifierNumValidation}`}
					onChange={(_, d) => props.changeModifier(d.value as Modifier)}
					value={props.dndInput.modifier}
					options={options}
				/>
				<input
					className={`table-input ${props.dndInput.modifierNumValidation} ${colourCSS}`}
					type="tel"
					onChange={props.changeModifierNum}
					onKeyPress={(e) => searchDisabled ? null : props.onEnter(e)}
					value={props.dndInput.modifierNum}
				/>
			</td>
			<td className="td-button">
				<Button
					className="roll-button"
					primary
					disabled={searchDisabled}
					onClick={props.rollDice}
				>
					Roll
				</Button>
			</td>
			<td className="td-result"><p>{props.dndInput.result}</p></td>
		</tr>
	)
}
export default pure(TableRow)
