import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, } from 'semantic-ui-react'
import styled from 'styled-components'

const HeaderIcon = styled.i`
	margin-top: -0.2em;
	margin-bottom: -0.2em;
	margin-right: 0.2em;
	font-size: 1.5em;
`
// Sidebar if mobile, header if desktop
// window.innerWidth
const Header: React.SFC = () => (
	<Menu inverted fixed="top" color="brown">
		<Container>
			<Menu.Item header name="dice" as={Link} to="/">
				<HeaderIcon className="mdi mdi-dice-3"/>DiceRoll
			</Menu.Item>
			<Menu.Item name="coin" as={Link} to="/coin">
				<HeaderIcon className="mdi mdi-coins"/>Coin
			</Menu.Item>
			<Menu.Item name="dnd" as={Link} to="/dnd">
				<HeaderIcon className="mdi mdi-dice-d20"/>DnD
			</Menu.Item>
		</Container>
	</Menu>
)
export default Header
