import React from 'react'
import styled from 'styled-components'

interface IDiceSumDisplayProps {
	sum: number
	show: boolean
}

const DiceSumDisplay: React.SFC<IDiceSumDisplayProps> = props => {
	if (!props.show) { 
		return null
	}
	
	return (
		<StyledHeader>{props.sum}</StyledHeader>
	)
}
export default DiceSumDisplay

const StyledHeader = styled.h1`
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
	font-size: 3em !important;
	bottom: 1.5em;
`
