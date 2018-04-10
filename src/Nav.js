import React, { Component } from 'react'
import _ from 'underscore'

class Nav extends Component {
    constructor(props){
        super(props)
        this.state={isLoggedIn: false}
    }
  
    render(){
      const isLoggedIn = this.state.isLoggedIn
        return(
        <div className="row" style={{padding:0, margin:0}}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light" >
          <button className="navbar-toggler" type="button" data-toggle="collapse" 
          data-target="#navbarTogglerDemo01" 
          aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">SIG</a>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Beranda <span className="sr-only">(current)</span></a>
                </li>
                {
                  this.state.isLoggedIn?(
                   <span></span>
                  ):(
                      <li className="nav-item">
                        <a className="nav-link" href="/register">Daftar</a>
                     </li>
                  )
                }
                {
                  this.state.isLoggedIn?(
                    <li className="nav-item">
                      <a className="nav-link" href="/logout">Keluar</a>
                    </li>
                  ):(
                    <li className="nav-item">
                    <a className="nav-link" href="/login">Masuk</a>
                  </li>
                  )
                }
                <li className="nav-item">
                  {/* <input id="pac-input" style={{width:'500px'}} className="form-control" type="search" placeholder="Tujuan" aria-label="Tujuan" /> */}
                </li>
              </ul>
                {this.state.isLoggedIn?(
                        <div className="form-inline my-2 my-lg-0">
                        <div className="dropdown">
                        <a href="#"  data-toggle="dropdown" >
                          <i className="fa fa-user-o fa-2x"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right pull-right" style={{right: 0, left: 'auto'}}>
                          <a className="dropdown-item" href="/profile">Profil</a>
                          <a className="dropdown-item" href="/search_history">Histori pencarian</a>
                          <a className="dropdown-item" href="/addedplace">Histori penambahan</a>
                        </div>
                      </div>
                      </div>
                    ):(
                      <div></div>
                    )
                }
          </div>
        </nav>
      </div>
        )
    }
    componentDidMount(){
      if(window.localStorage.getItem('users')!=='' 
      && window.localStorage.getItem('users')!==null 
      && typeof(window.localStorage.getItem('users'))!=='undefined'){
        this.setState({isLoggedIn:true})
      }else{
        this.setState({isLoggedIn:false})
      }
    }
}

export default Nav