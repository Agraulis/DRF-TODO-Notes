import React from 'react'
import {Link} from 'react-router-dom'

const ToDoNotesItem = ({note, deleteToDoNote}) => {
    return (
        <tr>
            <td>
                {note.url}
            </td>
            <td>
                {note.text}
            </td>
            <td>
                {String(note.isActive)}
            </td>
            <td>
                {note.project.name}
            </td>
            <td>
                {note.createdBy.username}
            </td>
            <td>
                <button onClick={()=>deleteToDoNote(note.url)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoNotesList = ({notes, deleteToDoNote}) => {
    return (
    <div>
        <table>
            <th>
                Note url
            </th>
            <th>
                Note text
            </th>
            <th>
                Note is active
            </th>
            <th>
                Note project
            </th>
            <th>
                Created by
            </th>
            <th>

            </th>
            {notes.map((note) => <ToDoNotesItem note={note} deleteToDoNote={deleteToDoNote} />)}
        </table>
        <Link to='/todonotes/create'>Create</Link>
    </div>
    )
}

export default ToDoNotesList