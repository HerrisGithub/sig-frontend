import React, { Component } from 'react'
import _ from 'underscore'
import Nav from './Nav'
import Axios from 'axios'
import Loader from './Loader'
import env from './env'

class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            host:env.host+':'+env.port,
            username:'',
            email:'',
            firstname:'',
            lastname:'',
            password:'',
            password_confirmation:''

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleInputChange(event){
        this.setState({errorMessage:''})
        event.preventDefault()
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    isNullOrEmptyAndUndefined(value){
        return (value===null || value==='' || typeof(value)==='undefined')
    }
    handleSubmit(){
        let self = this
        const state = this.state
        document.getElementsByClassName('modalbox')[0].style.display="unset"
        if(!this.isNullOrEmptyAndUndefined(state.password) && !this.isNullOrEmptyAndUndefined(state.password_confirmation))
        {
            Axios.post(this.state.host+'/register',{
                fullname:this.state.firstname+' '+this.state.lastname,
                email:this.state.email,
                username:this.state.username,
                password:this.state.password_confirmation
            }).then(()=>{
                this.setState({username:'',email:'',firstname:'',lastname:''})
                document.getElementsByClassName('modalbox')[0].style.display="none"
            }).catch(function(err){
                self.setState({errorMessage:err.response.statusText})
                document.getElementsByClassName('modalbox')[0].style.display="none"
                window.location.href="/login"
            })
        }else if(state.password!==state.password_confirmation){
            this.setState({errorMessage:'password harus cocok'})
            
            setTimeout(() => {
                document.getElementsByClassName('modalbox')[0].style.display="none"
            }, 2000);
            
        }else{
            this.setState({errorMessage:'password harus diisi'})
            setTimeout(() => {
                document.getElementsByClassName('modalbox')[0].style.display="none"
            }, 2000);
        }
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
                    <h2>Please Sign Up <small>It's free and always will be.</small></h2>
                    <hr className="colorgraph" />
                    <div className="form-group">
                        <input type="text" 
                         value={this.state.username}
                         onChange={this.handleInputChange}
                        name="username" 
                        className="form-control input-lg" 
                        placeholder="Username" tabIndex="1"/>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="form-group">
                                <input type="text" 
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleInputChange}
                                className="form-control input-lg" 
                                placeholder="First Name" tabIndex="2" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="form-group">
                                <input type="text" 
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleInputChange}
                                className="form-control input-lg" 
                                placeholder="Last Name" tabIndex="3"
                                
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <input type="email" name="email" 
                         value={this.state.email}
                         onChange={this.handleInputChange}
                        className="form-control input-lg" placeholder="Email Address" 
                        tabIndex="4"/>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="form-group">
                                <input type="password" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                className="form-control input-lg" 
                                placeholder="Password" tabIndex="5"/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="form-group">
                                <input type="password" 
                                value={this.state.password_confirmation}
                                onChange={this.handleInputChange}
                                name="password_confirmation" className="form-control input-lg" 
                                placeholder="Confirm Password" tabIndex="6"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4 col-sm-3 col-md-3">
                            <span className="button-checkbox">
                                <button type="button" className="btn" data-color="info" tabIndex="7">I Agree</button>
                                <input type="checkbox" name="t_and_c" id="t_and_c" className="hidden" value="1" />
                            </span>
                        </div>
                        <div className="col-xs-8 col-sm-9 col-md-9">
                            By clicking <strong className="label label-primary">Register</strong>, you agree to the <a href="#" data-toggle="modal" data-target="#t_and_c_m">Terms and Conditions</a> set out by this site, including our Cookie Use.
                        </div>
                    </div>
                    
                    <hr className="colorgraph" />
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                        <input type="submit" value="Register" onClick={this.handleSubmit}
                        className="btn btn-primary btn-block btn-lg" tabIndex="7" />
                        <p style={{color:'red',textAlign:'center', paddingTop:'10px'}}>{this.state.errorMessage}</p>
                        </div>
                    </div>
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

export default Register