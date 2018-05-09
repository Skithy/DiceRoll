import React from 'react'
import styled from 'styled-components'
import { rollDiceSet } from '../functions'

interface IDiceDisplayProps {
	diceSet: number[]
	isRolling: boolean
	animationDuration: number
	onAnimationEnd: () => void
}

interface IDiceDisplayState {
	height: number
	width: number
	size: number
	cols: number
	diceSet: number[]
	shakeAngle: number
	shakeIntensity: number
	shakeSpeed: number
	animationDuration: number
}

export default class DiceDisplay extends React.PureComponent<IDiceDisplayProps, IDiceDisplayState> {
	ref: any
	state = {
		animationDuration: 0,
		cols: 0,
		diceSet: this.props.diceSet,
		height: 0,
		shakeAngle: 0,
		shakeIntensity: 20,
		shakeSpeed: 150,
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
		} else if (prevProps.diceSet !== this.props.diceSet) {
			this.setState({ diceSet: this.props.diceSet })
		}

		if (prevProps.isRolling !== this.props.isRolling && this.props.isRolling) {
			this.setState({ shakeAngle: this.state.shakeIntensity })
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

	animate = (time: number): void => {
		if (this.state.shakeAngle === 0) {
			this.props.onAnimationEnd()
			return
		}

		const duration = this.state.animationDuration + time
		if (duration > this.props.animationDuration) {
			this.setState({
				animationDuration: 0,
				diceSet: this.props.diceSet,
				shakeAngle: 0,
			})
			return
		}

		const { diceSet, shakeAngle, shakeIntensity } = this.state
		this.setState({
			animationDuration: duration,
			diceSet: rollDiceSet(diceSet, 6),
			shakeAngle: shakeAngle === shakeIntensity ? -shakeIntensity : shakeIntensity,
		})
	}

	getRef = (ref: any): void => this.ref = ref

	render() {
		const { diceSet, size, cols, shakeAngle, shakeSpeed } = this.state

		const diceRows: number[][] = diceSet.reduce((total, val) => {
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
								<StyledIconWrapper
								key={i * cols + j}
								rotation={shakeAngle}
								duration={shakeSpeed}
								onTransitionEnd={(e) => (i * cols + j) === 0 && this.animate(e.elapsedTime * 1000)}
							>
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
	duration: number
}
const StyledIconWrapper = styled.div`
	display: inline-flex;
	transform: rotate(${(props: IStyledIconWrapperProps) => props.rotation}deg);
	transition: transform cubic-bezier(0.785, 0.135, 0.15, 0.86) ${(props: IStyledIconWrapperProps) => props.duration}ms;
`

interface IStyledDiceIconProps {
	size: number
}
const StyledDiceIcon = styled.i`
	font-size: ${(props: IStyledDiceIconProps) => props.size}px;
	line-height: ${(props: IStyledDiceIconProps) => props.size}px;
`
