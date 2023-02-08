import React from 'react'
import {Link} from 'react-router-dom'
import Select from 'react-select'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
               <Link to={`projects/${project.name}`}>{project.name}</Link>
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users.toString()}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <div>
            <Select
                placeholder = 'Find a project'
                options={projects.map((item) => ({
                    ['label']: <Link to={`projects/${item.name}`}>{item.name}</Link>,
                    ['value']: item.name
                }))}
            />
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
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList