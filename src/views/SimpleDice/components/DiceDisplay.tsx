import React from 'react'
import DiceDisplayContainer from '../styled/DiceDisplayContainer'
import DiceDisplayScore from '../styled/DiceDisplayScore'
import DiceIcon from '../styled/DiceIcon'

interface IDiceDisplayProps {
	diceSet: number[]
	showSum: boolean
	rollingAngle: number
}

interface IDiceDisplayState {
	height: number
	width: number
	size: number
	cols: number
}

class DiceDisplay extends React.PureComponent<IDiceDisplayProps, IDiceDisplayState> {
	ref: any
	state = {
		cols: 0,
		height: 0,
		size: 0,
		width: 0,
	}

	componentDidMount() {
		this.setDimensions()
		window.addEventListener('resize', this.setDimensions)
	}

	componentDidUpdate(prevProps: IDiceDisplayProps) {
		if (prevProps.diceSet.length !== this.props.diceSet.length) {
			const { height, width } = this.state
			const { size, cols } = this.calculateSize(this.props.diceSet.length, height, width)
			this.setState({ size, cols })
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setDimensions)		
	}

	getRef = (ref: any): void => this.ref = ref
	
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

	render() {
		const { diceSet, showSum, rollingAngle } = this.props
		const { size, cols } = this.state
		const diceRows: number[][] = diceSet.reduce((total, val) => {
			if (total[total.length - 1].length < cols) {
				total[total.length - 1].push(val)
			} else {
				total.push([val])
			}
			return total
		}, [[]] as number[][])

		return (
			<DiceDisplayContainer innerRef={this.getRef}>
				{ showSum &&
					<DiceDisplayScore as="h1">{diceSet.reduce((total, val) => total + val)}</DiceDisplayScore>
				}
				{ diceRows.map((row, i) => (
					<div key={i}>
						{ row.map((d, j) => (
							<div key={i * cols + j}
								style={{ display: 'inline-flex', transform: `rotate(${rollingAngle}deg)` }}>
								<DiceIcon
									size={size}
									className={getDiceIconClass(d)}
								/>
							</div>
						))}
					</div>
				))}
			</DiceDisplayContainer>
		)
	}
}

export default DiceDisplay

const getDiceIconClass = (num: number) => `mdi mdi-dice-${num}`
