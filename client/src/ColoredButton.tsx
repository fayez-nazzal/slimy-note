import React from 'react'
import { styled } from 'react-richmon'

interface ColorButtonProps {
  color: string
  changeColor: { (color: string): void }
  activeColor: string
}

interface StyledButtonProps {
  color: string
  active: boolean
}

const StyledButton = styled.button`
  padding: 6px;
  border: none;
  width: auto;
  height: auto;
  background-color: ${(props: StyledButtonProps) => props.color};
  -webkit-box-shadow: 0px 0px 4px 0px black;
  box-shadow: 0px 0px 4px 0px black;
  margin-top: 6px;
  &:hover {
    cursor: pointer;
  }
  ${(props: StyledButtonProps) =>
    props.active ? `outline: 1.2px solid black` : ''}
  }
`

export default React.memo((props: ColorButtonProps) => (
  <StyledButton
    className='color-button'
    color={props.color}
    onClick={(e) => {
      e.stopPropagation()
      props.changeColor(props.color)
    }}
    onMouseDown={(e) => {
      e.preventDefault()
    }}
    onMouseUp={(e) => {
      e.preventDefault()
    }}
    active={props.activeColor === props.color}
  ></StyledButton>
))
