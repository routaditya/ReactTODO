import React from 'react';
import { InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  NotesFormStyled,
  NotesListStyled,
  NotesHomeStyled,
  NotesTitleContainerStyled,
} from './home.styled';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      selectedNote: null,
      isUpdateState: false,
    };
    this.titleRef = React.createRef();
    this.bodyRef = React.createRef();
  }

  componentDidMount() {
    const userLoggedIn =
      this.props.location.state && this.props.location.state.userLoggedIn;
    if (!userLoggedIn) {
      this.props.history.push({
        pathname: '/login',
        state: { userLoggedIn: false },
      });
    }
  }

  addNote = () => {
    const { notes } = this.state;
    const title = this.titleRef.current.value;
    const body = this.bodyRef.current.value;
    let updatedNotes = notes;
    updatedNotes.push({
      id: 'note' + new Date().getTime(),
      title: title,
      body: body,
    });
    this.setState({ notes: updatedNotes });
    this.titleRef.current.value = '';
    this.bodyRef.current.value = '';
  };

  removeNote = (noteId) => {
    let updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
    this.titleRef.current.value = '';
    this.bodyRef.current.value = '';
  };

  setSelectedItem = (item) => {
    this.titleRef.current.value = item.title;
    this.bodyRef.current.value = item.body;
    this.setState({ selectedNote: item, isUpdateState: true });
  };

  renderNotes = (list) => {
    return (
      <ListGroup>
        {list.map((item) => (
          <ListGroup.Item key={item.id}>
            <NotesTitleContainerStyled
              onClick={() => this.setSelectedItem(item)}>
              <div>{item.title}</div>
              <div onClick={() => this.removeNote(item.id)}>X</div>
            </NotesTitleContainerStyled>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  updatedNote = () => {
    const { selectedNote } = this.state;
    let updatedNotes = this.state.notes.filter(
      (note) => selectedNote.id !== note.id
    );
    updatedNotes.push({
      id: 'note' + new Date().getTime(),
      title: this.titleRef.current.value,
      body: this.bodyRef.current.value,
    });
    this.setState({ notes: updatedNotes });
    this.titleRef.current.value = '';
    this.bodyRef.current.value = '';
  };

  render() {
    const { notes, selectedNote, isUpdateState } = this.state;
    return (
      <NotesHomeStyled>
        <NotesListStyled>
          <h2>Notes</h2>
          {notes.length > 0 ? (
            this.renderNotes(notes)
          ) : (
            <div>No notes to display</div>
          )}
        </NotesListStyled>
        <NotesFormStyled>
          <label htmlFor='title'>Title: </label>
          <InputGroup>
            <FormControl
              aria-label='title'
              id='title'
              aria-describedby='basic-addon1'
              ref={this.titleRef}
            />
          </InputGroup>
          <label htmlFor='note-body'>Body: </label>
          <InputGroup>
            <FormControl
              as='textarea'
              id='note-body'
              aria-label='With textarea'
              ref={this.bodyRef}
            />
          </InputGroup>
          <Button
            variant='primary'
            onClick={isUpdateState ? this.updatedNote : this.addNote}>
            ADD
          </Button>
        </NotesFormStyled>
      </NotesHomeStyled>
    );
  }
}

export default withRouter(Home);
