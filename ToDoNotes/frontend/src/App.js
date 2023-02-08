import React from 'react'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'

import logo from './logo.svg'
import './App.css'

import UserList from './components/User.js'
import ProjectList from './components/Projects.js'
import ToDoNotesList from './components/ToDoNotes.js'
import ProjectNotesList from './components/ProjectNotes.js'
import LoginForm from './components/Auth.js'
import ToDoNoteForm from './components/ToDoNoteForm.js'
import ProjectForm from './components/ProjectForm.js'



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
            'notes': [],
            'token': '',
            'username': ''
    }
    }

    deleteToDoNote(url) {
        const headers = this.get_headers()
        axios.delete(url, {headers})
            .then(response => {
                this.setState({notes: this.state.notes.filter((item)=>item.url !==url)})
            }).catch(error => console.log(error))
    }

    changeToDoNoteStatus(url, status) {
        console.log(url, status)
        const headers = this.get_headers()
        const currentDateTime = new Date(Date.now()).toISOString()
        const data = {
            isActive: status ? false : true,
            updatedOn: currentDateTime,
        }
        axios.patch(url, data, {headers})
            .then(response => {
                this.setState({notes: this.state.notes.filter((item)=>item.url !==url)})
            }).catch(error => console.log(error))
    }

    create_spam()
    {
        console.log('spam')
    }

    createToDoNote(text, project, createdBy) {
        const currentDateTime = new Date(Date.now()).toISOString()
        const headers = this.get_headers()
        const data = {
            text: text,
            project: project.split('/').slice(-2)[0],
            createdBy: createdBy.split('/').slice(-2)[0],
            createdOn: currentDateTime,
            updatedOn: currentDateTime,
        }
        axios.post('http://127.0.0.1:8000/api/todonotes/', data, {headers})
            .then(response => {
                let new_note = response.data
                const project = this.state.projects.filter((item) => item.url === new_note.project)[0]
                const createdBy = this.state.users.filter((item) => item.url === new_note.createdBy)[0]
                new_note.project = project
                new_note.createdBy = createdBy
                this.setState({notes: [...this.state.notes, new_note]})
            }).catch(error => console.log(error))
    }

    createProject(name, projectLink, projectUsers) {
        const headers = this.get_headers()
        const data = {
            name: name,
            link: projectLink,
            users: projectUsers
        }
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                let new_project = response.data
                const projectUsers = this.state.users.filter((item) => new_project.projectUsers.includes(item.id))
                new_project.name = name
                new_project.link = projectLink
                new_project.users = projectUsers
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data.results
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                    this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
                    }
                )

        axios.get('http://127.0.0.1:8000/api/todonotes/', {headers})
            .then(response => {
                const notes = response.data.results
                    this.setState(
                    {
                        'notes': notes
                    }
                )
            }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    login() {
        window.location='/login'
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username,
        password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
        this.state.username = username
    }

    render () {
        return (
            <div className="App">
                {this.is_authenticated() ?
                <h3>Welcome, {this.state.username}</h3> :
                <h3>Welcome, Anonymous</h3>}
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
                            <li>
                                {this.is_authenticated() ?
                                    <button onClick={()=>this.logout()}>Logout</button> :
                                    <button onClick={()=>this.login()}>Login</button>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/"
                            component={() => <ToDoNotesList
                                notes={this.state.notes}
                                deleteToDoNote={(id)=>this.deleteToDoNote(id)}/>}/>
                        <Route exact path="/todonotes/create"
                            component={() => <ToDoNoteForm
                            projects={this.state.projects}
                            users={this.state.users}
                            createToDoNote={(text, project, createdBy) => this.createToDoNote(text, project, createdBy)}/>} />
                        <Route exact path="/projects/create"
                            component={() => <ProjectForm
                            users={this.state.users}
                            createProject={(name, projectLink, projectUsers) => this.createProject(name, projectLink, projectUsers)}/>} />
                        <Route exact path="/users" component={() => <UserList users={this.state.users} />} />
                        <Route exact path="/projects" component={() => <ProjectList
                            projects={this.state.projects} />} />
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>} />

                        <Route path="/projects/:project_name">
                            <ProjectNotesList
                                notes={this.state.notes}
                                create_spam={()=> this.create_spam()}
                                changeToDoNoteStatus={(url, status)=> this.changeToDoNoteStatus(url, status)}
                            />
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
