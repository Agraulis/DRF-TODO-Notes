import React from 'react'
import logo from './logo.svg'
import './App.css'
import UserList from './components/User.js'
import ProjectList from './components/Projects.js'
import ToDoNotesList from './components/ToDoNotes.js'
import ProjectNotesList from './components/ProjectNotes.js'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
          <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': []
    }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                    this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todonotes/')
            .then(response => {
                const notes = response.data.results
                    this.setState(
                    {
                        'notes': notes
                    }
                )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/"> ToDo Notes </Link>
                            </li>
                            <li>
                                <Link to="/projects"> Projects </Link>
                            </li>
                            <li>
                                <Link to="/users"> Users </Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={() => <ToDoNotesList notes={this.state.notes}/>} />
                        <Route exact path="/users" component={() => <UserList users={this.state.users} />} />
                        <Route exact path="/projects" component={() => <ProjectList projects={this.state.projects} />} />
                        <Route path="/projects/:project_name">
                            <ProjectNotesList notes={this.state.notes} />
                         </Route>
                        <Redirect from='/todonotes' to='/' />
                        <Route component={NotFound404} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
