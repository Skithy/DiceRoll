import React from 'react'
import { Button, Dropdown, Icon, Input, Table } from 'semantic-ui-react'
import styled from 'styled-components'
import { IDiceInput } from '../DnD'
import { IDnDDice, IDnDDiceResult, Modifier } from '../DnDDice'

const options = [
	{ text: '+', value: '+' },
	{ text: '-', value: '-' },
	{ text: '*', value: '*' },
	{ text: '÷', value: '/' },
]

interface ITableRowProps {
	sides: string
	dndDice: IDnDDice
	dndInput: IDiceInput
	changeDiceNum: (e: React.FormEvent<HTMLInputElement>) => void
	changeModifier: (modifier: Modifier) => void
	changeModifierNum: (e: React.FormEvent<HTMLInputElement>) => void
	rollDice: () => void
}

const TableRow: React.SFC<ITableRowProps> = (props) => (
	<Table.Row>
		<Table.Cell><DiceIcon className={`mdi mdi-dice-d${props.sides}`} /></Table.Cell>
		<Table.Cell>
			<Input
				fluid
				type="number"
				min="0"
				onChange={props.changeDiceNum}
				value={props.dndInput.number}
				error={!!props.dndInput.numberValidation}
			/>
		</Table.Cell>
		<Table.Cell>
			<Input
				label={<Dropdown
					button
					compact
					icon={<Icon className={getIcon(props.dndDice.modifier)} />}
					text=" "
					className="dnd-modifier-dropdown"
					onChange={(_, d) => props.changeModifier(d.value as Modifier)}
					value={props.dndDice.modifier}
					options={options}
				/>}
				labelPosition="left"
				fluid
				type="number"
				onChange={props.changeModifierNum}
				value={props.dndInput.modifier}
				error={!!props.dndInput.modifierValidation}
			/>
		</Table.Cell>
		<Table.Cell>{props.dndDice.result ? formatResult(props.dndDice.result) : 0}</Table.Cell>
		<Table.Cell>
			<Button
				disabled={!!props.dndInput.modifierValidation || !!props.dndInput.numberValidation}
				onClick={props.rollDice}
			>
				Roll
			</Button>
		</Table.Cell>
	</Table.Row>
)
export default TableRow

const DiceIcon = styled.i`
	font-size: 2em;
`


const getIcon = (modifier: Modifier): string => {
	switch (modifier) {
		case '+': return 'mdi mdi-plus'
		case '-': return 'mdi mdi-minus'
		case '*': return 'mdi mdi-multiplication'
		case '/': return 'mdi mdi-division'
		default: return ''
	}
}

const formatResult = (result: IDnDDiceResult) => {
	let resultString = <>{result.diceSet.join(' + ')}</>
	const modifier = result.modifier === '/' ? '÷' : result.modifier
	if (('+-'.includes(result.modifier) && result.modifierNum !== 0) || '*/'.includes(result.modifier)) {
		resultString = <>({resultString}) <i>{modifier} {result.modifierNum}</i></>
	}
	return <>{resultString} = <b>{result.total}</b></>
}
