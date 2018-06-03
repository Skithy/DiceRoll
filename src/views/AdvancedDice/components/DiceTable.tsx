import React from 'react'
import { SortableContainer, SortableContainerProps, SortableElement, SortableElementProps, SortableHandle } from 'react-sortable-hoc'
import { Button, Table } from 'semantic-ui-react'
import { IDiceSet } from '../AdvancedDice'


const DragHandle = SortableHandle(() => <i className="mdi mdi-drag-vertical"/>) // This can be any component you want
const InvisibleDragHandle = SortableHandle(() => <i style={{ visibility: 'hidden' }} className="mdi mdi-drag-vertical" />) // This can be any component you want

interface ITableRowProps {
	dice: IDiceSet
}

const SortableTableRow: React.ComponentClass<ITableRowProps & SortableElementProps> = SortableElement(props =>
	<Table.Row>
		<Table.Cell><DragHandle /></Table.Cell>
		<Table.Cell>{props.dice.number}</Table.Cell>
		<Table.Cell>{props.dice.sides}</Table.Cell>
	</Table.Row>
)

interface IDiceTableProps {
	diceSet: IDiceSet[]
}

const DiceTable: React.ComponentClass<IDiceTableProps & SortableContainerProps> = SortableContainer(props => (
	<Table celled unstackable>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell collapsing><InvisibleDragHandle /></Table.HeaderCell>
				<Table.HeaderCell>Number</Table.HeaderCell>
				<Table.HeaderCell>Sides</Table.HeaderCell>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			{props.diceSet.map((d, i) => <SortableTableRow key={i} index={i} dice={d} />)}
		</Table.Body>

		<Table.Footer>
			<Table.Row>
				<Table.HeaderCell colSpan="3">
					<Button>+6</Button>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Footer>
	</Table>
))
export default DiceTable
