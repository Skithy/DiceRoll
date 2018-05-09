import React from 'react'
import styled from 'styled-components'
import { rollDiceSet } from '../functions'

interface IDiceDisplayProps {
	diceSet: number[]
	isRolling: boolean
}

interface IDiceDisplayState {
	animationInterval?: NodeJS.Timer
	height: number
	width: number
	size: number
	cols: number
	diceSet: number[]
	shakeAngle: number
	shakeIntensity: number
	shakeRight: boolean
	shakeSpeed: number
}

export default class DiceDisplay extends React.PureComponent<IDiceDisplayProps, IDiceDisplayState> {
	ref: any
	state = {
		animationInterval: undefined,
		cols: 0,
		diceSet: this.props.diceSet,
		height: 0,
		shakeAngle: 0,
		shakeIntensity: 15,
		shakeRight: true,
		shakeSpeed: 100,
		size: 0,
		width: 0,
	}

	componentDidMount() {
		this.setDimensions()
		window.addEventListener('resize', this.setDimensions)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setDimensions)
	}

	componentDidUpdate(prevProps: IDiceDisplayProps) {
		if (prevProps.diceSet.length !== this.props.diceSet.length) {
			const { height, width } = this.state
			const { size, cols } = this.calculateSize(this.props.diceSet.length, height, width)
			this.setState({ size, cols, diceSet: this.props.diceSet, shakeAngle: 0 })
		}

		if (prevProps.isRolling !== this.props.isRolling) {
			if (this.props.isRolling) {
				this.setState({ animationInterval: setInterval(this.animate, this.state.shakeSpeed) })
			} else {
				clearInterval(this.state.animationInterval)
				this.setState({ animationInterval: undefined })
			}
		}
	}

	setDimensions = (): void => {
		const paddingLeft = parseFloat(getComputedStyle(this.ref).paddingLeft || '0')
		const paddingTop = parseFloat(getComputedStyle(this.ref).paddingTop || '0')
		
		const height = this.ref.clientHeight - 2 * paddingTop
		const width = this.ref.clientWidth - 2 * paddingLeft
		
		const { size, cols } = this.calculateSize(this.props.diceSet.length, height, width)		
		this.setState({ cols, height, size, width, })
	}

	calculateSize = (num: number, height: number, width: number): { size: number, cols: number } => {
		if (width === 0 || height === 0) {
			return { size: 0, cols: 0 }
		}

		let size = (width + height) / 4
		let loops = 0
		while(loops++ < 20) {
			const possibleRows = Math.floor(height / size)
			const possibleCols = Math.floor(width / size)

			for(let rows = 1; rows <= possibleRows; rows++) {
				if (rows * possibleCols >= num) {
					return { size, cols: possibleCols }
				}
			}
			size = Math.floor(size * 0.9)
		}
		return { size: 0, cols: 0 }
	}

	animate = (): void => {
		const { diceSet, shakeAngle, shakeIntensity, shakeRight, } = this.state
		const r = shakeRight ? shakeAngle + shakeIntensity : shakeAngle - shakeIntensity
		this.setState({
			diceSet: rollDiceSet(diceSet, 6),
			shakeAngle: r,
		})

		if (r === shakeIntensity) {
			this.setState({ shakeRight: false })
		}
		if (r === -shakeIntensity) {
			this.setState({ shakeRight: true })
		}
		// const { shakeAngle, shakeIntensity } = this.state
		// this.setState({
		// 	diceSet: rollDiceSet(this.props.diceSet, 6),
		// 	shakeAngle: shakeAngle === shakeIntensity ? -shakeIntensity : shakeIntensity,
		// })
	}

	getRef = (ref: any): void => this.ref = ref

	render() {
		const { isRolling } = this.props
		const { size, cols, shakeAngle } = this.state

		const renderedDice = isRolling ? this.state.diceSet : this.props.diceSet
		const diceRows: number[][] = renderedDice.reduce((total, val) => {
			if (total[total.length - 1].length < cols) {
				total[total.length - 1].push(val)
			} else {
				total.push([val])
			}
			return total
		}, [[]] as number[][])

		return (
			<StyledContainer innerRef={this.getRef}>
				{ diceRows.map((row, i) => (
					<div key={i}>
						{ row.map((d, j) => (
							<StyledIconWrapper key={i * cols + j} rotation={isRolling ? shakeAngle : 0}>
								<StyledDiceIcon size={size} className={`mdi mdi-dice-${d}`} />
							</StyledIconWrapper>
						))}
					</div>
				))}
			</StyledContainer>
		)
	}
}

const StyledContainer = styled.div`
	height: 50vh;
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
	justify-content: center;
	padding: 10vh 20px;
`
interface IStyledIconWrapperProps {
	rotation: number
}
const StyledIconWrapper = styled.div`
	display: inline-flex;
	transform: rotate(${(props: IStyledIconWrapperProps) => props.rotation}deg);
`

interface IStyledDiceIconProps {
	size: number
}
const StyledDiceIcon = styled.i`
	font-size: ${(props: IStyledDiceIconProps) => props.size}px;
	line-height: ${(props: IStyledDiceIconProps) => props.size}px;
`
