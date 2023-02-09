import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'


const animatedComponents = makeAnimated()

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        name: '',
        projectLink: '',
        projectUsers: []
        }
    }

    getUserList(event)
    {
        var user_array = []
        event.map(user => user_array.push(parseInt(user.value.split('/').slice(-2)[0])))
        this.setState({projectUsers: user_array})
    }


    handleChange(event)
    {        console.log(this)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.projectLink, this.state.projectUsers)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name"
                    value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="projectLink">Project Link</label>
                    <input type="text" className="form-control" name="projectLink"
                    value={this.state.projectLink} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="projectUsers">Project Users:</label>
                    <Select
                        isMulti
                        components={animatedComponents}
                        onChange={(event)=>this.getUserList(event)}
                        options={this.props.users.map((item) => ({
                            ['label']: item.username,
                            ['value']: item.url
                        }))}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm
