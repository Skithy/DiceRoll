import * as React from 'react'
import { pure } from 'recompose'
import { Button, Header, Segment } from 'semantic-ui-react'
import { ILogEntry } from '../DnD'
import LogRow from './LogRow'

interface ILogProps {
	rollLog: ILogEntry[]
	resetLog: () => void
}

const Log: React.SFC<ILogProps> = ({ rollLog, resetLog }) => {
	return (
		<div className="log-container">
			<Header className="log-header" attached="top">
				Log
				<Button className="log-reset-button" onClick={resetLog}>Reset</Button>
	    </Header>
			<div className="log-log">
				{[...rollLog].reverse().map((log, i) => <LogRow key={i} log={log} />)}
				{ rollLog.length === 0 && <Segment attached>Log is currently empty.</Segment>}
			</div>
		</div>
	)
}
export default pure(Log)
