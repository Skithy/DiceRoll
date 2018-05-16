import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { IDiceSet } from '../AdvancedDice'

interface IDiceTableProps {
	diceSet: IDiceSet[]
}

const DiceTable: React.SFC<IDiceTableProps> = props => (
	<Table celled unstackable>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Number</Table.HeaderCell>
				<Table.HeaderCell>Sides</Table.HeaderCell>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			{ props.diceSet.map((d, i) => 
				<Table.Row key={i}>
					<Table.Cell>{d.number}</Table.Cell>
					<Table.Cell>{d.sides}</Table.Cell>
				</Table.Row>
			)}
		</Table.Body>

		<Table.Footer>
			<Table.Row>
				<Table.HeaderCell colSpan="3">
					<Button>+6</Button>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Footer>
	</Table>
)
export default DiceTable
