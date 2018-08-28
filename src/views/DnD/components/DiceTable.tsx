import React from 'react'
import { pure } from 'recompose'
import { Button } from 'semantic-ui-react'
import { IDnDInputs } from '../DnD'
import { Modifier } from '../DnDDice'
import TableRow from './TableRow'

interface IDiceTableProps {
	dndInputs: IDnDInputs
	changeDiceNum: (sides: string, numString: string) => void
	changeModifier: (sides: string, modifier: Modifier) => void
	changeModifierNum: (sides: string, numString: string) => void
	onEnter: (e: React.KeyboardEvent, sides?: string) => void
	rollDice: (sides: string) => void
	resetDice: () => void
}

const DiceTable: React.SFC<IDiceTableProps> = (props) => (
	<table className="dice-table">
		<thead>
			<tr>
				<th id="col-dice">Dice</th>
				<th id="col-num">Number</th>
				<th id="col-mod">Modifier</th>
				<th id="col-roll"/>
				<th id="col-result">Result</th>
			</tr>
		</thead>

		<tbody>
			{Object.keys(props.dndInputs).filter(i => i !== 'search').map((d, i) => (
				<TableRow
					key={i}
					sides={d}
					dndInput={props.dndInputs[d]}
					changeDiceNum={(e) => props.changeDiceNum(d, e.currentTarget.value)}
					changeModifier={(e) => props.changeModifier(d, e)}
					changeModifierNum={(e) => props.changeModifierNum(d, e.currentTarget.value)}
					onEnter={(e) => props.onEnter(e, d)}
					rollDice={() => props.rollDice(d)}
				/>
			))}
		</tbody>

		<tfoot>
			<tr>
				<td />
				<td>
					<Button className="reset-button" onClick={props.resetDice}>Reset</Button>
				</td>
			</tr>
		</tfoot>
	</table>
)
export default pure(DiceTable)
