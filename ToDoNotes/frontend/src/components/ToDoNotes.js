import React from 'react'


const ToDoNotesItem = ({note}) => {
    return (
        <tr>
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
        </tr>
    )
}

const ToDoNotesList = ({notes}) => {
    return (
        <table>
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
            {notes.map((note) => <ToDoNotesItem note={note} />)}
        </table>
    )
}

export default ToDoNotesList