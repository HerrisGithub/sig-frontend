import React, { Component } from 'react'
import _ from 'underscore'
import Nav from './Nav'
import './loader.css'
import Loader from './Loader'
import env from './env'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
         <span>
           <Nav/>
             <div className="row" style={{padding:0, margin:0, paddingTop:'5%'}}>
             <div className="col-md-3">
               <Loader/>
             </div>   
             <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                    <h2>Profile</h2>
                    <hr className="colorgraph" />
                    <div className="form-group">
                        <label><b>Email :</b></label>
                        <input type="text" disabled
                        value={window.localStorage.getItem('users_email')} 
                        className="form-control input-lg" 
                        placeholder="Email Address" tabIndex="1"/>
                    </div>
                    <div className="form-group">
                        <label><b>Username :</b></label>
                        <input type="text" name="password" value={window.localStorage.getItem('users')} 
                        className="form-control input-lg" placeholder="Password" 
                        tabIndex="4"/>
                    </div>
                    
                    <hr className="colorgraph" />
             </div>
             </div>
         </span>

        )
    }
    componentDidMount(){
        document.getElementsByClassName('modalbox')[0].style.display="unset"
        setTimeout(() => {
           document.getElementsByClassName('modalbox')[0].style.display="none"
        }, 2000);
    }
}

export default Profile