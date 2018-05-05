import React from 'react'
import { Button, Grid, Header, } from 'semantic-ui-react'
import styled from 'styled-components'
import { MAXDICE } from '../constants'

interface IDiceCounterProps {
	isRolling: boolean
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
		<Grid columns="equal">
			<Grid.Column>
				<CenteredDiv>
					<Button
						primary
						icon="minus"
						onClick={minusOne}
						disabled={disableMinus || props.isRolling}
						as="a"
					/>
				</CenteredDiv>
			</Grid.Column>
			<Grid.Column width={8}>
				<CenteredDiv>
					<Header as="h1">{value}</Header>
				</CenteredDiv>
			</Grid.Column>
			<Grid.Column>
				<CenteredDiv>
					<Button
						primary
						icon="plus"
						onClick={addOne}
						disabled={disableAdd || props.isRolling}
						as="a"
					/>
				</CenteredDiv>
			</Grid.Column>
		</Grid>
	)
}
export default DiceCounter

const CenteredDiv = styled.div`
	display: flex;
	justify-content: center;
`
