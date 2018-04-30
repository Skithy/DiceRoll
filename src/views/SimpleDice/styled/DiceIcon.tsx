import styled from 'styled-components'

interface IDiceIconProps {
	size: number
}

const DiceIcon = styled.i`
	font-size: ${(props: IDiceIconProps) => props.size}px;
	line-height: ${(props: IDiceIconProps) => props.size}px;
`
export default DiceIcon
