import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectNote = ({note, changeToDoNoteStatus}) => {
    return (
        <tr>
            <td>
                {note.text}
            </td>
            <td>
                {String(note.isActive)}
            </td>
            <td>
                {note.createdBy.username}
            </td>
            <td>
                <button onClick={()=>changeToDoNoteStatus(note.url, note.isActive)} type='button'>Change status</button>
            </td>
        </tr>
    )
}

const ProjectNotesList = ({notes, changeToDoNoteStatus}) => {
    let { project_name } = useParams()
    let filtered_notes = notes.filter(note => note.project.name== project_name)
    console.log(project_name)
    return (
        <table>
            <tr>
                <th>
                    Note text
                </th>
                <th>
                    Note is active
                </th>
                <th>
                    Created by
                </th>
                <th>
                </th>
            </tr>
            {filtered_notes.map((note) => <ProjectNote
                note={note}
                changeToDoNoteStatus = {changeToDoNoteStatus}
            />)}
        </table>

    )
}
export default ProjectNotesList
