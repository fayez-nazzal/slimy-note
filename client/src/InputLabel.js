import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import ColFlex from './ColFlex'
import ColoredButton from './ColoredButton'

const StyledSpan = styled.span`
  color: black;
  font-size: ${(props) => props.fontSize};
  display: ${(props) => (props.shown ? 'inline-block' : 'none')};
  max-width: 146px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  user-select: none;
  ${(props) => props.css}
`

const StyledInput = styled.input`
  border: #7eb2cd solid 1px;
  border-radius: 4px;
  background-color: #fefefe;
  box-sizing: border-box;
  margin-top: -3px;
  font-size: ${(props) => props.fontSize};
  &:focus {
    outline: none;
  }
  width: 80%;
  display: ${(props) => (props.shown ? 'unset' : 'none')};
  text-align: center;
  ${(props) => props.css}
`

export default (props) => {
  const [isInput, setIsInput] = useState(false)
  const inputRef = useRef()
  const [isNew, setIsNew] = useState(false)
  const [activeColorIndex, setActiveColorIndex] = useState(
    props.colors.indexOf(props.activeColor)
  )
  const history = useHistory()

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsInput(false)
      setIsNew(false)
      if (props.noteIndex !== undefined && props.notebookIndex !== undefined) {
        history.push(`/${props.notebookIndex}/${props.noteIndex}`)
      }
      e.preventDefault()
    } else if (e.key === 'Escape') {
      alert('not implemented!!!')
    } else if (e.key === 'ArrowLeft' && e.shiftKey) {
      const newActiveColorIndex =
        activeColorIndex - 1 > 0
          ? activeColorIndex - 1
          : props.colors.length - 1
      props.changeColor(props.colors[newActiveColorIndex])
      setActiveColorIndex(newActiveColorIndex)
      e.preventDefault()
    } else if (e.key === 'ArrowRight' && e.shiftKey) {
      const newActiveColorIndex = (activeColorIndex + 1) % props.colors.length
      props.changeColor(props.colors[newActiveColorIndex])
      setActiveColorIndex(newActiveColorIndex)
      e.preventDefault()
    }
  }

  useLayoutEffect(() => {
    if (props.name === 'new\u200b') {
      props.changeName('')
      setIsInput(true)
      setIsNew(true)
      setTimeout(() => {
        inputRef.current.focus()
      }, 10)
    }
  }, [props.name])

  return (
    <React.Fragment>
      <StyledSpan
        fontSize={props.fontSize}
        shown={!isInput}
        onClick={(e) => {
          if (e.detail === 2) {
            setIsInput(true)
            setTimeout(() => {
              inputRef.current.focus()
              inputRef.current.select()
            }, 10)
            e.preventDefault()
          }
        }}
        css={props.labelCss}
      >
        {props.name}
      </StyledSpan>
      <ColFlex
        direction='column'
        css='background-color: transparent;align-items: center;'
      >
        <StyledInput
          dir='auto'
          fontSize={props.fontSize}
          ref={inputRef}
          value={props.name}
          onChange={(e) => {
            props.changeName(e.target.value)
          }}
          onBlur={() => {
            setIsInput(false)
            setIsNew(false)
          }}
          onKeyDown={onKeyDown}
          shown={isInput}
          css={props.inputCss}
        />
        <ColFlex
          direction='row'
          css={`
            justify-content: space-evenly;
            background-color: transparent;
            width: 110px;
            margin: 0 auto;
            display: ${isNew ? 'flex' : 'none'};
          `}
        >
          {props.colors.map((color, index) => (
            <ColoredButton
              key={index}
              color={color}
              activeColor={props.colors[activeColorIndex]}
              changeColor={props.changeColor}
            />
          ))}
        </ColFlex>
      </ColFlex>
    </React.Fragment>
  )
}
