import React, { Component } from 'react'
import _ from 'underscore'
import Nav from './Nav'
import './loader.css'

class Loader extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
         <span>
              <div className="modalbox" id="text">
                    <div className="box">
                            <ul id="loader">
                                <li className="loader"></li>
                                <li className="loader"></li>
                                <li className="loader"></li>
                                <li className="loader"></li>
                                <li className="loader"></li>
                                <li className="loader"></li>
                                <li className="loader"></li>
                            </ul>
                    </div>
                </div>
         </span>

        )
    }
}

export default Loader