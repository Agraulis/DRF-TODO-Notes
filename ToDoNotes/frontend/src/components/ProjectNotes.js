import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectNote = ({note}) => {
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
        </tr>
    )
}

const ProjectNotesList = ({notes}) => {
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
            </tr>
            {filtered_notes.map((note) => <ProjectNote note={note} />)}
        </table>

    )
}
export default ProjectNotesList
