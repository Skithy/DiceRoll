import React from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'
import styled, { StyledComponentClass } from 'styled-components'

const StyledSettingsButton = styled(Button) `
	position: absolute;
	right: 0;
	z-index: 1;
` as StyledComponentClass<ButtonProps, {}>

const SettingsButton: React.SFC<ButtonProps> = props => (
	<StyledSettingsButton
		circular
		icon="setting"
		primary
		{...props}
	/>
)
export default SettingsButton
