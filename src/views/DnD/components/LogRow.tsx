import * as React from 'react'
import { pure } from 'recompose'
import { Segment } from 'semantic-ui-react'
import { ILogEntry } from '../DnD'
import { diceToString } from '../DnDDice'

interface ILogRowProps {
	log: ILogEntry
}

const LogRow: React.SFC<ILogRowProps> = ({ log }) => {
	const diceString = diceToString(log.sides.toString(), {
		diceNum: log.diceSet.length,
		modifier: log.modifier,
		modifierNum: log.modifierNum
	})
	const diceSumString = log.diceSet.join(' + ')
	const diceModifierString = ('+-'.includes(log.modifier) && log.modifierNum !== 0) || ('*/'.includes(log.modifier) && log.modifierNum !== 1)
		? `${log.modifier} ${log.modifierNum}`
		: ''

	return (
		<Segment attached>
			<b>{diceString}</b>: ({diceSumString}) <i>{diceModifierString}</i> = <b>{log.total}</b>
			<i className="log-time">{getAMPMString(log.time)}</i>
		</Segment>
	)
}
export default pure(LogRow)

const getAMPMString = (date: Date) => date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')
