import React from 'react'

class ToDoNoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        text: '',
        project: props.projects[0]?.url,
        createdBy: props.users[0]?.url
        }
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createToDoNote(this.state.text, this.state.project, this.state.createdBy)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">text</label>
                    <input type="text" className="form-control" name="text"
                    value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="project">project</label>
                    <select name="project" className='form-control'
                        onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((item)=><option value={item.url}>{item.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label for="createdBy">createdBy</label>
                    <select name="createdBy" className='form-control'
                        onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((item)=><option value={item.url}>{item.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ToDoNoteForm
