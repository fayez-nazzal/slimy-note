import React from 'react'
import styled from 'styled-components'
import InputLabel from './InputLabel'
import { useHistory } from 'react-router-dom'
import Flex from './ColFlex'
import StyledText from './StyledText'

interface NotebookItemProps {
  title: string
  notes: any[]
  changeNoteTitle: {
    (notebookIndex: number, noteIndex: number, title: string): void
  }
  changeNoteColor: {
    (notebookIndex: number, noteIndex: number, color: string): void
  }
  changeNotebookTitle: { (index: number, title: string): void }
  changeNotebookColor: { (index: number, color: string): void }
  index: number
  activateNotebook: { (index: number): void }
  active: boolean
  color: string
  addNote: { (notebookIndex: number): void }
}

interface StyledItemProps {
  backgroundColor: string
  css: string
}

const StyledItem = styled.div`
  cursor: pointer;
  background-color: ${(props: StyledItemProps) => props.backgroundColor};
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  ${(props: StyledItemProps) => props.css}
`

const Container = styled.div`
  ${(props: { active: boolean }) =>
    !props.active
      ? `
      outline: 0.1px solid #cccccc;
      z-index: 1000;
      `
      : `
      outline: 0.9px solid #2d618786;
      z-index: 10000;
      `}
`

export default (props: NotebookItemProps) => {
  const history = useHistory()

  return (
    <Container active={props.active}>
      <StyledItem
        backgroundColor={props.color}
        css='padding: 10px 0;border-bottom: 0.2px solid #cccccc'
        onClick={(e) => {
          if (e.detail === 1) props.activateNotebook(props.index)
        }}
      >
        <InputLabel
          fontSize='16px'
          name={props.title}
          changeName={(title: string) =>
            props.changeNotebookTitle(props.index, title)
          }
          css='padding: 6px;'
          colors={[
            '#eeeeee',
            '#ea2c62',
            '#b8de6f',
            '#a3ccf4',
            '#726a95',
            '#fcf876',
            '#f9c49a'
          ]}
          changeColor={(color: string) =>
            props.changeNotebookColor(props.index, color)
          }
          activeColor={props.color}
        />
        <div style={{ flex: '0.1 0.1 auto' }}></div>
        {props.active ? (
          <StyledText
            fontSize='24px'
            onClick={(e) => {
              props.addNote(props.index)
              e.stopPropagation()
            }}
            css='justify-self: flex-end;-webkit-text-stroke: 0.4px #888888;'
          >
            +
          </StyledText>
        ) : (
          ''
        )}
      </StyledItem>
      <Flex
        direction='column'
        reverse
        css={`
          display: ${props.active ? 'unset' : 'none'};
        `}
      >
        {props.notes.map((note, noteIndex) => (
          <StyledItem
            backgroundColor={note.color}
            css='padding: 4px 0;'
            onClick={() => {
              history.push(`/${props.index}/${noteIndex}`)
            }}
          >
            <InputLabel
              fontSize='12px'
              name={note.title}
              changeName={(title: string) =>
                props.changeNoteTitle(props.index, noteIndex, title)
              }
              colors={[
                '#f4f3f3',
                '#ff414d',
                '#91d18b',
                '#a2d5f2',
                '#9ab3f5',
                '#fcf876',
                '#f4ebc1'
              ]}
              changeColor={(color: string) =>
                props.changeNoteColor(props.index, noteIndex, color)
              }
              activeColor={note.color}
              noteIndex={noteIndex}
              notebookIndex={props.index}
            />
          </StyledItem>
        ))}
      </Flex>
    </Container>
  )
}
