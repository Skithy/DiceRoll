import React from 'react'
import { get, set } from 'scripts/store'
import { Button, ButtonProps } from 'semantic-ui-react'
import Shake from 'shake.js'
import styled, { StyledComponentClass } from 'styled-components'
import { FlexCenteredContainer } from '../common/FlexContainer'
import CoinDisplay from './components/CoinDisplay'

interface ICoinState {
	isHeads: boolean
	isAnimating: boolean
}

export default class Coin extends React.PureComponent<{}, ICoinState> {
	shakeEvent = new Shake({
		threshold: 15,
		timeout: 1000,
	})

	state = {
		isAnimating: false,
		isHeads: get('coin_isHeads') || false,
	} as ICoinState

	componentDidMount() {
		this.shakeEvent.start()
		window.addEventListener('shake', this.handleShake)
		window.addEventListener('keypress', this.handleKeyPress)
	}

	componentWillUnmount() {
		this.shakeEvent.stop()
		window.removeEventListener('shake', this.handleShake)
		window.removeEventListener('keypress', this.handleKeyPress)
	}

	componentDidUpdate() {
		set('coin_isHeads', this.state.isHeads)
	}

	handleKeyPress = (e: KeyboardEvent): void => {
		switch (e.key) {
			case ' ':
				return this.startFlip()
		}
	}

	handleShake = (): void => {
		this.startFlip()
	}

	startFlip = (): void => {
		if (this.state.isAnimating) {
			return
		}
		this.setState({ isHeads: Math.random() >= 0.5, isAnimating: true })
	}

	onAnimationEnd = (): void => this.setState({ isAnimating: false })
	
	render() {
		const { isHeads, isAnimating } = this.state
		return (
			<FlexCenteredContainer>
				<CoinDisplay
					animationDuration={1000}
					isHeads={isHeads}
					isAnimating={isAnimating}
					onAnimationEnd={this.onAnimationEnd}
				/>
				<StyledFlipButton
					size="massive"
					primary
					onClick={this.startFlip}
					disabled={isAnimating}
				>
					Flip
				</StyledFlipButton>
			</FlexCenteredContainer>
		)
	}
}

const StyledFlipButton = styled(Button)`
	width: 8em !important;
	margin-right: 0 !important;
` as StyledComponentClass<ButtonProps, {}>
