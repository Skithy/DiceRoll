import React from 'react'
import DiceDisplayContainer from '../styled/DiceDisplayContainer'
import DiceDisplayScore from '../styled/DiceDisplayScore'
import DiceIcon from '../styled/DiceIcon'

interface IDiceDisplayProps {
	diceSet: number[]
}

interface IDiceDisplayState {
	height: number
	width: number
}

class DiceDisplay extends React.PureComponent<IDiceDisplayProps, IDiceDisplayState> {
	ref: any
	state = {
		height: 0,
		width: 0,
	}

	componentDidMount() {
		const paddingLeft = parseFloat(getComputedStyle(this.ref).paddingLeft || '0')
		const paddingTop = parseFloat(getComputedStyle(this.ref).paddingTop || '0')
		this.setState({
			height: this.ref.clientHeight - 2 * paddingTop,
			width: this.ref.clientWidth - 2 * paddingLeft,
		})
	}

	getRef = (ref: any): void => this.ref = ref
	
	calculateSize = () => {
		const num = this.props.diceSet.length
		const { width, height } = this.state
		if (width === 0 || height === 0) {
			return { size: 0, rows: 0, cols: 0 }
		}

		let size = (width + height) / 4
		while(true) {
			const possibleRows = Math.floor(height / size)
			const possibleCols = Math.floor(width / size)

			for(let rows = 1; rows <= possibleRows; rows++) {
				if (rows * possibleCols >= num) {
					return { size, rows, cols: possibleCols }
				}
			}
			size = Math.floor(size * 0.9)
		}
	}

	render() {
		const { diceSet } = this.props
		const { size, cols } = this.calculateSize()
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
				<DiceDisplayScore as="h1">{diceSet.reduce((total, val) => total + val)}</DiceDisplayScore>
				{ diceRows.map((row, i) => (
					<div key={i}>
						{ row.map((d, j) => (
							<DiceIcon
								size={size}
								className={getDiceIconClass(d)}
								key={i * cols + j}
							/>
						))}
					</div>
				))}
			</DiceDisplayContainer>
		)
	}
}

export default DiceDisplay

const getDiceIconClass = (num: number) => `mdi mdi-dice-${num}`
