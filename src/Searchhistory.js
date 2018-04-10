import React, { Component } from 'react'
import _ from 'underscore'
import Nav from './Nav'
import './loader.css'
import Loader from './Loader'
import Axios from 'axios'
import env from './env'

class Addplace extends Component {
    constructor(props){
        super(props)
        this.state={
            host:env.host+':'+env.port,
            places:[]
        }
    }
    getPlaces(){
        return this.state.places.map((item, key)=>{
            item.location = JSON.parse(item.location)
            return (
                <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td>{item.name}</td>
                    <td>Lat: {item.location.lat} | Lng : {item.location.lng}</td>
                    <td>{item.formatted_address}</td>
                    <td>{item.types}</td>
                    <td>{item.updateBy}</td>
                    <td>{item.created_at}</td>
                </tr>
            )
        })
    }
    render(){
        return(
         <span>
           <Nav/>
           <Loader/>
           
             <div className="row" style={{padding:0, margin:0, paddingTop:'5%'}}>
             <div className="col-xs-12 col-sm-8 col-md-12 col-sm-offset-2 col-md-offset-3">
                    <h2>Search History</h2>
                    <hr className="colorgraph" />
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Address</th>
                        <th scope="col">Types</th>
                        <th scope="col">Update By</th>
                        <th scope="col">Created At</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.getPlaces()
                        }
                    </tbody>
                    </table>
                   
                    <hr className="colorgraph" />
             </div>
             </div>
         </span>

        )
    }
    componentDidMount(){
        const self = this
        document.getElementsByClassName('modalbox')[0].style.display="unset"
        setTimeout(() => {
           document.getElementsByClassName('modalbox')[0].style.display="none"
        }, 2000);
        Axios.post(this.state.host+'/local/places/users',{username:window.localStorage.getItem('users')})
        .then((data)=>{
            self.setState({places:data.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export default Addplace