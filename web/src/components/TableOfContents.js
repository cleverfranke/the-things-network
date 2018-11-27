import React from 'react'
import styled from 'styled-components'

import modularScale from '../styles/modular-scale'
import variables from '../styles/variables'

import Zero from '../assets/zero.svg'
import One from '../assets/one.svg'
import Two from '../assets/two.svg'
import Three from '../assets/three.svg'
import Four from '../assets/four.svg'

const Section = styled.section`
  @media screen and (min-width: 45rem) {
    grid-column: 2 / 12;
  }
`

const List = styled.ol`
  font-family: ${variables.monoTypo};
  font-size: ${modularScale(2)};
  list-style: none;
  background: ${variables.backgroundBlue};
  margin: 0;
  padding: 0;

  a {
    display: flex;
    align-items: center;
    
    svg {
      color: ${variables.highlightBlue};
    }

    &:hover svg, 
    &:focus svg {
      color: ${variables.green};
    }
  }

  svg {
    width: 0.8em;
    margin: ${variables.spacing.small};
  }
`

const TableOfContents = () => {
  return (
    <Section>
      <List>
        <li>
          <a href="#introduction">
            <Zero /> Introduction
          </a>
        </li>
        <li>
          <a href="#protocols">
            {' '}
            <One />
            Protocols
          </a>
        </li>
        <li>
          <a href="#the-things-network">
            <Two />
            The Things Network
          </a>
        </li>
        <li>
          <a href="#how-it-works">
            <Three />
            How it works
          </a>
        </li>
        <li>
          <a href="#you-are-the-network">
            <Four />
            You are the network
          </a>
        </li>
      </List>
    </Section>
  )
}

export default TableOfContents