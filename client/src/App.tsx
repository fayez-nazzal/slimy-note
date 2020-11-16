import React, { useState } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { ReactComponent as Search } from './search.svg'
import { Richmon } from 'react-richmon'
import { styled } from 'react-richmon'
import './styles.css'
import NotebookItem from './NotebookItem'
import ColFlex from './ColFlex'
import StyledPlusIcon from './StyledText'

const StyledInput = styled.input`
  padding: 6.5px;
  border: #7eb2cd solid 1px;
  border-radius: 4px;
  &:active,
  &:focus {
    outline: none;
  }
  width: 134px;
  height: 16px;
`

const StyledSearchIcon = styled(Search)`
  width: 22px;
`

interface LabelProps {
  padding?: string
  fontSize?: string
  margin?: string
}

const StyledLabel = styled.label`
  padding: ${(props: LabelProps) => (props.padding ? props.padding : 'unset')};
  font-size: ${(props: LabelProps) =>
    props.fontSize ? props.fontSize : 'unset'};
  margin: ${(props: LabelProps) => (props.margin ? props.margin : 'unset')};
`

const App = () => {
  const [notebooks, setNotebooks] = useState([
    {
      title: 'My Notebook',
      active: true,
      color: '#eeeeee',
      notes: [
        {
          title: 'Welcome!',
          color: '#a2d5f2',
          content: '<div></div>'
        }
      ]
    }
  ])
  const [searchText, setSearchText] = useState('')
  const [activeNotebookIndex, setActiveNotebookIndex] = useState(0)

  const activateNotebook = (index: number) => {
    const clonedNotebooks = [...notebooks]
    clonedNotebooks.forEach((notebook, notebookIndex) => {
      notebook.active = notebookIndex === index
    })
    setNotebooks([...clonedNotebooks])
    setActiveNotebookIndex(index)
    if (!notebooks[index].notes) addNote(index)
  }

  const changeNotebookTitle = (index: number, title: string) => {
    const clonedNotebooks = [...notebooks]
    clonedNotebooks[index].title = title
    setNotebooks([...clonedNotebooks])
  }

  const changeNoteTitle = (
    notebookIndex: number,
    noteIndex: number,
    title: string
  ) => {
    const clonedNotebooks = [...notebooks]
    clonedNotebooks[notebookIndex].notes[noteIndex].title = title
    setNotebooks([...clonedNotebooks])
  }

  const changeNotebookColor = (index: number, color: string) => {
    const clonedNotebooks = [...notebooks]
    clonedNotebooks[index].color = color
    setNotebooks([...clonedNotebooks])
  }

  const changeNoteColor = (
    notebookIndex: number,
    noteIndex: number,
    color: string
  ) => {
    const clonedNotebooks = [...notebooks]
    clonedNotebooks[notebookIndex].notes[noteIndex].color = color
    setNotebooks([...clonedNotebooks])
  }

  const addNote = (notebookIndex: number) => {
    const clonedNotebooks = [...notebooks]
    clonedNotebooks[notebookIndex].notes.push({
      title: 'new\u200b',
      color: '#f4f3f3',
      content: '<div></div>'
    })
    setNotebooks([...clonedNotebooks])
  }

  return (
    <BrowserRouter>
      <ColFlex direction='row'>
        <ColFlex style={{ width: '230px' }} direction='column'>
          <ColFlex
            direction='row'
            style={{
              justifyContent: 'space-around',
              marginTop: '8px'
            }}
            alignItemsCenter
          >
            <StyledLabel fontSize='20px'>Notebooks</StyledLabel>
            <StyledPlusIcon
              fontSize='29px'
              onClick={() => {
                setNotebooks([
                  ...notebooks,
                  {
                    title: 'new\u200b',
                    active: false,
                    color: '#eeeeee',
                    notes: [
                      {
                        title: 'new Note',
                        content: '<div></div>',
                        color: '#f4f3f3'
                      }
                    ]
                  }
                ])
              }}
            >
              +
            </StyledPlusIcon>
          </ColFlex>
          <ColFlex
            direction='row'
            style={{
              justifyContent: 'space-around',
              marginTop: '8px'
            }}
            alignItemsCenter
          >
            <StyledSearchIcon />
            <StyledInput
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </ColFlex>
          <div>
            <hr />
          </div>
          <ColFlex direction='column'>
            {notebooks
              .filter(
                (notebook) =>
                  notebook.title
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  notebook.notes.find(
                    (note) =>
                      note.title
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      note.content
                        .toLocaleLowerCase()
                        .includes(searchText.toLowerCase())
                  )
              )
              .map((notebook, index) => (
                <NotebookItem
                  color={notebook.color}
                  title={notebook.title}
                  index={index}
                  activateNotebook={activateNotebook}
                  addNote={addNote}
                  changeNoteTitle={changeNoteTitle}
                  changeNotebookTitle={changeNotebookTitle}
                  changeNoteColor={changeNoteColor}
                  changeNotebookColor={changeNotebookColor}
                  notes={notebook.notes}
                  active={notebook.active}
                />
              ))}
          </ColFlex>
        </ColFlex>
        {notebooks.map((notebook: any, notebookIndex: number) =>
          notebook.notes.map((note: any, noteIndex: number) => (
            <Route
              exact
              path={`/${notebookIndex}/${noteIndex}`}
              key={`route${noteIndex}`}
            >
              <Richmon
                tools={['BIUS', 'fontSize', 'textColor', 'textHighlight', 'table']}
                content={note.content}
                onChange={(newContent: string) => {
                  const notebooksClone = [...notebooks]
                  notebooksClone[activeNotebookIndex].notes[
                    noteIndex
                  ].content = newContent
                  setNotebooks([...notebooksClone])
                }}
                toolbarCss='border-bottom: 1px solid #cccccc'
                width='100%'
                height='100vh'
                css='border-left: 1px solid #eeeeee;box-shadow: none;'
              />
            </Route>
          ))
        )}
        <Route>
          <Redirect
            to={`/${activeNotebookIndex}/${
              notebooks[activeNotebookIndex].notes.length - 1
            }`}
          />
        </Route>
      </ColFlex>
    </BrowserRouter>
  )
}

export default App
