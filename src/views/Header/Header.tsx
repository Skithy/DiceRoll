import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, } from 'semantic-ui-react'

// Sidebar if mobile, header if desktop
// window.innerWidth
const Header: React.SFC = () => (
	<Menu inverted fixed="top" color="brown">
		<Container>
			<Menu.Item header name="header" as={Link} to="/">
				<i className="mdi mdi-dice-3" style={{ marginRight: 5 }}/> DiceRoll
			</Menu.Item>
			<Menu.Item name="coin" as={Link} to="/coin">
				Coin
			</Menu.Item>
		</Container>
	</Menu>
)
export default Header
