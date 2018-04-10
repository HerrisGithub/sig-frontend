import React, { Component } from 'react'
import _ from 'underscore'
import Nav from './Nav'
import Loader from './Loader'
import Axios from 'axios'
import env from './env'
class Login extends Component {
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
    handleSubmit(){
        let self = this
        let state = this.state
        document.getElementsByClassName('modalbox')[0].style.display="unset"
        console.log(this.state.email)
        Axios.post(this.state.host+'/login',{
            email:this.state.email,
            password:this.state.password
        }).then(()=>{
            document.getElementsByClassName('modalbox')[0].style.display="none"
            Axios.post(this.state.host+'/users',{email:state.email})
            .then((data)=>{
                data = JSON.parse(JSON.stringify(data.data))
                data = data[0]
                window.localStorage.setItem('users',data.username)
                window.localStorage.setItem('users_email',self.state.email)
                self.setState({username:'',email:'',firstname:'',lastname:''})
                window.location.href="/"    
            }).catch((err)=>{
                console.log(err)
                self.setState({errorMessage:err.response.statusText})
            })
        }).catch(function(err){
            self.setState({errorMessage:err.response.statusText})
            document.getElementsByClassName('modalbox')[0].style.display="none"
        })
    
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
    render(){
        return(
              <span>
             <Nav/>
             <div className="row" style={{padding:0, margin:0, paddingTop:'15%'}}>
             <div className="col-md-3">
               <Loader/>
             </div>   
             <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                    <h2>Login | <small>jaga kerahasiaan password anda</small></h2>
                    <hr className="colorgraph" />
                    <div className="form-group">
                        <input type="text" 
                         value={this.state.email}
                         onChange={this.handleInputChange}
                        name="email" 
                        className="form-control input-lg" 
                        placeholder="Email Address" tabIndex="1"/>
                    </div>
               
                    
                    <div className="form-group">
                        <input type="password" name="password" 
                         value={this.state.password}
                         onChange={this.handleInputChange}
                        className="form-control input-lg" placeholder="Password" 
                        tabIndex="4"/>
                    </div>
                    
                    <hr className="colorgraph" />
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                        <input type="submit" value="Login" onClick={this.handleSubmit}
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

export default Login