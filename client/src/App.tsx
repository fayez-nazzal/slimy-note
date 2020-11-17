import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { ReactComponent as Search } from "./search.svg";
import { Richmon } from "@fayez-nazzal/react-richmon";
import { styled } from "@fayez-nazzal/react-richmon";
import "./styles.css";
import NotebookItem from "./NotebookItem";
import ColFlex from "./ColFlex";
import StyledPlusIcon from "./StyledText";

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
`;

const StyledSearchIcon = styled(Search)`
  width: 22px;
`;

interface LabelProps {
  padding?: string;
  fontSize?: string;
  margin?: string;
}

const StyledLabel = styled.label`
  padding: ${(props: LabelProps) => (props.padding ? props.padding : "unset")};
  font-size: ${(props: LabelProps) =>
    props.fontSize ? props.fontSize : "unset"};
  margin: ${(props: LabelProps) => (props.margin ? props.margin : "unset")};
`;

type notebook = {
  title: string,
  active: boolean,
  color: string,
  notes: [
    {
      title: string,
      color: string,
      content: string,
    },
  ],
}

const App = () => {
  const [notebooks, setNotebooks] = useState<notebook[]>([]);

  const [searchText, setSearchText] = useState("");
  const [activeNotebookIndex, setActiveNotebookIndex] = useState(0);

  useEffect(()=>{
    console.log("about to load data")
    loadData()
  }, [])

  const loadData = async () => {
    const response = await fetch(`https://slimy-note.azurewebsites.net/api/notebooks`, {credentials: 'include'})
    const data = await response.json()
    setNotebooks(data.notebooks)
    console.log(data.notebooks)
  }

  const activateNotebook = (index: number) => {
    const clonedNotebooks = [...notebooks];
    clonedNotebooks.forEach((notebook, notebookIndex) => {
      notebook.active = notebookIndex === index;
    });
    setNotebooks([...clonedNotebooks]);
    setActiveNotebookIndex(index);
    if (!notebooks[index].notes) addNote(index);
  };

  const changeNotebookTitle = (index: number, title: string) => {
    const clonedNotebooks = [...notebooks];
    clonedNotebooks[index].title = title;
    setNotebooks([...clonedNotebooks]);
  };

  const changeNoteTitle = (
    notebookIndex: number,
    noteIndex: number,
    title: string
  ) => {
    const clonedNotebooks = [...notebooks];
    clonedNotebooks[notebookIndex].notes[noteIndex].title = title;
    setNotebooks([...clonedNotebooks]);
  };

  const changeNotebookColor = (index: number, color: string) => {
    const clonedNotebooks = [...notebooks];
    clonedNotebooks[index].color = color;
    setNotebooks([...clonedNotebooks]);
  };

  const changeNoteColor = (
    notebookIndex: number,
    noteIndex: number,
    color: string
  ) => {
    const clonedNotebooks = [...notebooks];
    clonedNotebooks[notebookIndex].notes[noteIndex].color = color;
    setNotebooks([...clonedNotebooks]);
  };

  const addNote = (notebookIndex: number) => {
    const clonedNotebooks = [...notebooks];
    clonedNotebooks[notebookIndex].notes.push({
      title: "new\u200b",
      color: "#f4f3f3",
      content: "<div></div>",
    });
    setNotebooks([...clonedNotebooks]);
  };

  return (
    <BrowserRouter>
      <ColFlex direction="row">
        <ColFlex style={{ width: "300px" }} direction="column">
          <ColFlex
            direction="row"
            style={{
              justifyContent: "space-around",
              marginTop: "8px",
            }}
            alignItemsCenter
          >
            <StyledLabel fontSize="20px">Notebooks</StyledLabel>
            <StyledPlusIcon
              fontSize="29px"
              onClick={() => {
                setNotebooks([
                  ...notebooks,
                  {
                    title: "new\u200b",
                    active: false,
                    color: "#eeeeee",
                    notes: [
                      {
                        title: "new Note",
                        content: "<div></div>",
                        color: "#f4f3f3",
                      },
                    ],
                  },
                ]);
              }}
            >
              +
            </StyledPlusIcon>
          </ColFlex>
          <ColFlex
            direction="row"
            style={{
              justifyContent: "space-around",
              marginTop: "8px",
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
          <ColFlex direction="column">
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
                  key={index}
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
              key={`route${noteIndex+2}`}
            >
              <Richmon
                key={`richmon${noteIndex}`}
                tools={[
                  "BIUS",
                  "thin-seperator",
                  "sub",
                  "sup",
                  "thin-seperator",
                  "fontSize",
                  "textColor",
                  "textHighlight",
                  "textShadow",
                  "thin-seperator",
                  "table",
                  "orderedList",
                  "unorderedList",
                ]}
                content={note.content}
                onChange={(newContent: string) => {
                  const notebooksClone = [...notebooks];
                  console.log(noteIndex)
                  notebooksClone[activeNotebookIndex].notes[
                    noteIndex
                  ].content = newContent;
                  setNotebooks([...notebooksClone]);
                  fetch('https://slimy-note.azurewebsites.net/api/notebooks', {
                      method: "PUT",
                      body: JSON.stringify(notebooksClone),
                      headers: {"Content-type": "application/json; charset=UTF-8"},
                      credentials: 'include'
                    })
                    .then(response => response.json()) 
                    .catch(err => console.log(err));
                }}
                toolbarCss="border-bottom: 1px solid #cccccc"
                width="100%"
                height="100vh"
                css="border-left: 1px solid #eeeeee;box-shadow: none;"
              />
            </Route>
          ))
        )}
        <Route>
          <Redirect
            to={`/0/${
              0
            }`}
          />
        </Route>
      </ColFlex>
    </BrowserRouter>
  );
};

export default App;
