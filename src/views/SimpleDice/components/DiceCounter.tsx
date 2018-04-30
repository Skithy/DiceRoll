import React from 'react'
import * as SUI from 'semantic-ui-react'
import styled from 'styled-components'
import { MAXDICE } from '../constants'

interface IDiceCounterProps {
	value: number
	changeValue: (n: number) => void
}

const DiceCounter: React.SFC<IDiceCounterProps> = props => {
	const { value, changeValue } = props
	const addOne = (): void => changeValue(value + 1)
	const minusOne = (): void => changeValue(value - 1)
	
	const disableAdd = value >= MAXDICE
	const disableMinus = value <= 1

	return (
		<SUI.Grid columns="equal">
			<SUI.Grid.Column>
				<CenteredDiv>
					<SUI.Button
						primary
						icon="minus"
						onClick={minusOne}
						disabled={disableMinus}
					/>
				</CenteredDiv>
			</SUI.Grid.Column>
			<SUI.Grid.Column width={8}>
				<CenteredDiv>
					<SUI.Header as="h1">{value}</SUI.Header>
				</CenteredDiv>
			</SUI.Grid.Column>
			<SUI.Grid.Column>
				<CenteredDiv>
					<SUI.Button
						primary
						icon="plus"
						onClick={addOne}
						disabled={disableAdd}
					/>
				</CenteredDiv>
			</SUI.Grid.Column>
		</SUI.Grid>
	)
}
export default DiceCounter

const CenteredDiv = styled.div`
	display: flex;
	justify-content: center;
`
