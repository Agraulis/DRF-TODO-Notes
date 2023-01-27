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

        console.log(this.state.username)
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
                        <Route exact path="/" component={() => <ToDoNotesList notes={this.state.notes}/>} />
                        <Route exact path="/users" component={() => <UserList users={this.state.users} />} />
                        <Route exact path="/projects" component={() => <ProjectList
                            projects={this.state.projects} />} />
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>} />
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
