import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import styled from 'styled-components'
import { IDnDSet } from '../DnD'

const DiceIcon = styled.i`
	font-size: 2em;
`

const sum = (arr: number[]): number => arr.reduce((total, val) => total + val, 0)

interface ITableRowProps {
	sides: string
	values: number[]
}
const TableRow: React.SFC<ITableRowProps> = (props) => (
	<Table.Row>
		<Table.Cell><DiceIcon className={`mdi mdi-dice-d${props.sides}`}/></Table.Cell>
		<Table.Cell>{props.values.length}</Table.Cell>
		<Table.Cell>{sum(props.values)}</Table.Cell>
	</Table.Row>
)

interface IDiceTableProps {
	diceSet: IDnDSet
}

const DiceTable: React.SFC<IDiceTableProps> = (props) => (
	<Table celled unstackable>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Dice</Table.HeaderCell>
				<Table.HeaderCell>Number</Table.HeaderCell>
				<Table.HeaderCell>Result</Table.HeaderCell>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			{Object.keys(props.diceSet).map((d, i) => <TableRow key={i} sides={d} values={props.diceSet[d]}/>)}
			<Table.Row>
				<Table.Cell>Total</Table.Cell>
				<Table.Cell>{Object.keys(props.diceSet).reduce((total, val) => total + props.diceSet[val].length, 0)}</Table.Cell>
				<Table.Cell>{Object.keys(props.diceSet).reduce((total, val) => total + sum(props.diceSet[val]), 0)}</Table.Cell>
			</Table.Row>
		</Table.Body>

		<Table.Footer>
			<Table.Row>
				<Table.HeaderCell colSpan="3">
					<Button>Reset</Button>
					<Button>Roll</Button>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Footer>
	</Table>
)
export default DiceTable
