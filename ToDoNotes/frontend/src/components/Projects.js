import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
               <Link to={`projects/${project.name.replaceAll(" ", "_")}`}>{project.name}</Link>
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                Project link
            </th>
            <th>
                Project users
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList