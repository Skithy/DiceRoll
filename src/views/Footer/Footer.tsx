import React from 'react'
import styled from 'styled-components'

const FooterDiv = styled.div`
	position: absolute;
	bottom: 0em;
	background-color: #F4E4D4;
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding-left: 0.5em;
	padding-right: 0.5em;
`

const Footer: React.SFC = () => (
	<FooterDiv>
		<div id="footer-left">Skithy © 2018</div>
		<div id="footer-right">Made by Tony Dong</div>
	</FooterDiv>
)
export default Footer
