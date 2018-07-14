import * as React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { ILogEntry } from '../DnD'
import { diceToString } from '../DnDDice'

interface ILogProps {
	rollLog: ILogEntry[]
}

const Log: React.SFC<ILogProps> = props => {
	return (
		<div>
			<Header as="h1" attached="top">
				Log
	    </Header>
			<div className="log-log">
				{ [...props.rollLog].reverse().map((log, i) => 
					<Segment key={i} attached><p><b>{diceToString(log.sides.toString(), { diceNum: log.diceSet.length, modifier: log.modifier, modifierNum: log.modifierNum })}</b>: ({log.diceSet.join(' + ')}) {('+-'.includes(log.modifier) && log.modifierNum !== 0) || ('*/'.includes(log.modifier) && log.modifierNum !== 1) ? <i>{`${log.modifier} ${log.modifierNum}`}</i> : null} = <b>{log.total}</b></p></Segment>
				)}
			</div>
		</div>
	)
}
export default Log
