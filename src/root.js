import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import App from './App';
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import AddPlace from './Addplace'
import SearchHistory from './Searchhistory' 

const Root = () => (
      <Router>
          <div>
              <Switch>
                  <Route exact path="/" component={App} />
                  <Route path='/register' component={Register} />
                  <Route path='/profile' component={Profile} />
                  <Route path='/addedplace' component={AddPlace} />
                  <Route path='/search_history' component={SearchHistory} />
                  <Route path='/login' render={(props)=>(
                      window.localStorage.getItem('users')!==null?(
                        <Redirect to="/" />
                      ):(
                        <Login {...props}/>
                      )
                  )} />
                  <Route path='/logout' render={(props)=>(
                     window.localStorage.removeItem('users'),
                     window.localStorage.removeItem('users_email'),
                     <Redirect to="/login" />
                  )} />
                  
              </Switch>
          </div>
      </Router>
  )
   
  export default Root