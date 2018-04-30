import React from 'react'
import { Link } from 'react-router-dom'
import * as SUI from 'semantic-ui-react'

// Sidebar if mobile, header if desktop
// window.innerWidth
const Header: React.SFC = () => (
	<SUI.Menu inverted fixed="top" color="brown">
		<SUI.Container>
			<SUI.Menu.Item header name="header" as={Link} to="/">
				<i className="mdi mdi-dice-multiple"/> DiceRoll
			</SUI.Menu.Item>
			<SUI.Menu.Item name="dice" as={Link} to="/dice">
				Dice
			</SUI.Menu.Item>
			<SUI.Menu.Item name="coin" as={Link} to="/coin">
				Coin
			</SUI.Menu.Item>
			<SUI.Menu.Item name="adv" as={Link} to="/advanced">
				Advanced Dice
			</SUI.Menu.Item>
		</SUI.Container>
	</SUI.Menu>
)
export default Header
