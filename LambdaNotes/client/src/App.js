import React, { Component } from 'react';
import './index.css';
import { Route, Switch } from 'react-router-dom';

//files
import Login from './Components/Login';
import Register from './Components/Register';
import NotesList from './Components/NotesList';
import CreateNote from './Components/CreateNote';
import EditNote from './Components/EditNote';
import SingleNoteView from './Components/SingleNoteView';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Switch>
         <Route exact path="/" component={Login}/>
         <Route path="/login" component={Login}/>
         <Route path="/register" component={Register}/>
         <Route exact path="/notes" component={NotesList}/>
         <Route exact path ="/notes/:id" component={SingleNoteView}/>
         <Route path ="/create" component={CreateNote} />
         <Route path ="/notes/edit/:id" component={EditNote}/>
       </Switch>
      </div>
    );
  }
}

export default App;
