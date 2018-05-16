	import React from 'react'
import styled from 'styled-components'

interface ICoinDisplayProps {
	animationDuration: number
	isHeads: boolean
	isAnimating: boolean
	onAnimationEnd: () => void
}

interface ICoinDisplayState {
	rotationAngle: number
}

export default class CoinDisplay extends React.PureComponent<ICoinDisplayProps, ICoinDisplayState> {
	state = {
		rotationAngle: this.props.isHeads ? 0 : 180
	}

	componentDidUpdate(prevProps: ICoinDisplayProps) {
		if (this.props.isAnimating && prevProps.isAnimating !== this.props.isAnimating) {
			const { rotationAngle } = this.state
			let	newAngle = (rotationAngle === 0 || rotationAngle === 180) ? (360 * 3) : 0
			if (!this.props.isHeads) {
				newAngle += 180
			}
			this.setState({ rotationAngle: newAngle })
		}
	}

	render() {
		const { onAnimationEnd, animationDuration } = this.props
		const { rotationAngle } = this.state
		return (
			<StyledContainer>
				<StyledCoinWrapper
					rotationAngle={rotationAngle}
					duration={animationDuration}
					onTransitionEnd={onAnimationEnd}
				>
					<StyledCoinHeads><h1>HEADS</h1></StyledCoinHeads>
					<StyledCoinTails><h1>TAILS</h1></StyledCoinTails>
				</StyledCoinWrapper>
			</StyledContainer>
		)
	}
}

const StyledContainer = styled.div`
	height: 60vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

interface IStyledCoinWrapperProps {
	duration: number
	rotationAngle: number
}
const StyledCoinWrapper = styled.div`
	height: 40vh;
	width: 40vh;
	transition: transform cubic-bezier(0.645, 0.045, 0.355, 1) ${(props: IStyledCoinWrapperProps) => props.duration}ms;
	transform-style: preserve-3d;
	transform: rotateY(${(props: IStyledCoinWrapperProps) => props.rotationAngle}deg);
`

const StyledCoin = styled.div`
	position: absolute;
  height: 100%;
  width: 100%;
	border-radius: 50%;
  backface-visibility: hidden;
	display: flex;
	justify-content: center;
	align-items: center;

	> h1 {
		font-size: 3em;
		user-select: none;
	}
`
const StyledCoinHeads = styled(StyledCoin)`
	background-color: #5D7968;
	border: #36453C 1em solid;

	> h1 {
		color: #36453C;
	}
`
const StyledCoinTails = styled(StyledCoin)`
	background-color: #80747D;
	border: #4A3945 1em solid;
	transform: rotateY(180deg);
	
	> h1 {
		color: #4A3945;
	}
`
