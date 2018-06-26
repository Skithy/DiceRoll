import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { IDnDInputs } from '../DnD'
import { IDnDSet, Modifier } from '../DnDDice'
import TableRow from './TableRow'

interface IDiceTableProps {
	diceSet: IDnDSet
	dndInputs: IDnDInputs
	changeDiceNum: (sides: string, numString: string) => void
	changeModifier: (sides: string, modifier: Modifier) => void
	changeModifierNum: (sides: string, numString: string) => void
	rollDice: (sides: string) => void
	resetDice: () => void
}

const DiceTable: React.SFC<IDiceTableProps> = (props) => (
	<Table celled unstackable>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell width="1">Dice</Table.HeaderCell>
				<Table.HeaderCell width="2">Number</Table.HeaderCell>
				<Table.HeaderCell width="3">Modifier</Table.HeaderCell>				
				<Table.HeaderCell>Result</Table.HeaderCell>
				<Table.HeaderCell width="1"/>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			{Object.keys(props.diceSet).map((d, i) => (
				<TableRow
					key={i}
					sides={d}
					dndDice={props.diceSet[d]}
					dndInput={props.dndInputs[d]}
					changeDiceNum={(e) => props.changeDiceNum(d, e.currentTarget.value)}
					changeModifier={(e) => props.changeModifier(d, e)}
					changeModifierNum={(e) => props.changeModifierNum(d, e.currentTarget.value)}
					rollDice={() => props.rollDice(d)}
				/>
			))}
		</Table.Body>

		<Table.Footer>
			<Table.Row>
				<Table.HeaderCell colSpan="3">
					<Button onClick={props.resetDice}>Reset</Button>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Footer>
	</Table>
)
export default DiceTable
