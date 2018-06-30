import React, { Component } from 'react';
import Sidebar from './Sidebar';
import IndivNote from './IndivNote';
import { Link } from 'react-router-dom';

class SingleNoteView extends Component {
    constructor(props) {
        super(props);
        this.state ={
            note: this.props.location.state
        }
    }
    

    

    render() {
        console.log(this.state)
        return (
            <div className="indiv-note-single">
                <Sidebar />
                <div className="indiv-note-container">
                <div className="single-note-nav-bar">
                    <div className="nav">
                        <Link to=
                            {{pathname:`/notes/edit/${this.state.note.id}`, 
                            state: {note_title: this.state.note.note_title, note_body: this.state.note.note_body, id: this.state.note.id
                            }}}
                              
                              >
                            Edit
                        </Link>
                    </div>
                    <div className="nav">Delete</div>
                    <div className="nav">Log Out</div>
                </div>
                <IndivNote 
                    note_title={this.state.note.note_title}
                    note_body={this.state.note.note_body}
                />
                </div>
            </div>
        );
    }
}

export default SingleNoteView;
