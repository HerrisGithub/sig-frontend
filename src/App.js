 /* global google */
/* eslint-disable no-undef */
// eslint-disable-next-line 
import React, { Component } from 'react'
import _ from 'underscore'
import Nav from './Nav'
import Loader from './Loader'
import Axios from 'axios'
import env from './env'

class App extends Component {
  constructor(props){
    super(props)
    this.handleSubmit= this.handleSubmit.bind(this)  
    this.state={
      ori:{lat:3.588073,lng:98.686605},
      dest:{lat:3.586749,lng: 98.691515},
      host:env.host+':'+env.port,
      origin:37.78,
      key:'AIzaSyATGbyfcvW-uanT-Imwayj8KjDg_iHJgIs',
      placesList:[],
      placeSelected:{},
      address:''
    }
     
  }
  
  handleSubmit(){
    const address = this.refs.address.value
    const name = this.refs._name.value
    const category =  this.refs.category.value
    const lat = this.refs.lat.value
    const lng = this.refs.lng.value
    const updateBy = window.localStorage.getItem('users')
    let self = this
    document.getElementsByClassName('modalbox')[0].style.display="unset"
    Axios.post(this.state.host+'/places',{
      formatted_address:address,
      name:name,
      location:JSON.stringify({lat:lat,lng:lng}),
      types:category,
      updateBy:updateBy
    }).then(()=>{
      self.refs.address.value=''
      self.refs._name.value=''
      self.refs.category.value=''
      self.refs.lat.value=''
      self.refs.lng.value=''
      document.getElementsByClassName('modalbox')[0].style.display="none"
    }).catch((err)=>{
      console.log(err)
      document.getElementsByClassName('modalbox')[0].style.display="none"
    })

  }
  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    // const selectedMode = document.getElementById('mode').value
    directionsService.route({
      origin: {lat: this.state.ori.lat, lng: this.state.ori.lng},  // Haight.
      destination: {lat: this.state.dest.lat, lng: this.state.dest.lng}, 
      travelMode: window.google.maps.TravelMode["TRANSIT"]
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        console.log(response.routes)

      } else { 
        console.log('rute tidak ditemukan')
      }
    })
  }
  getJSONXmlhttpRequest(url){
    try {
      var httpRequest = new XMLHttpRequest();
      httpRequest.open('GET',url,false);
      httpRequest.send();
      return JSON.parse(httpRequest.responseText);
      } catch (error) {
          return [];
    }
  }
  getPlacesType(){
    return this.getJSONXmlhttpRequest(this.state.host+'/places/type').map((item,key)=>{
      return (
        <option key={key}>{item}</option>
      )
    })
  }
  getPlacesResults(){
    return this.state.placesList.map((item,key)=>{
      return (
        <option key={item.id} value={item.name}  >{item.name}</option>      
      )
    })
  }
  getPlace(place){
    return this.getJSONXmlhttpRequest(this.state.host+'/places/'+place+'/'+this.state.key)  
  }
  initMap(origin){
      const self = this
      const input = document.getElementById('pac-input')
      let directionsService = new window.google.maps.DirectionsService
      let map 
      navigator.geolocation.getCurrentPosition((position)=>{
        map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: position.coords.latitude, lng: position.coords.longitude},
          draggable:true,
        })
        const a = {lat:position.coords.latitude,lng:position.coords.longitude}
        self.setState({ori:a})
        // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
        map.addListener('bounds_changed', function() {
        });
        // directionsDisplay.setMap(map)
        let directionsDisplay = new window.google.maps.DirectionsRenderer({
          draggable: true,
          map: map
        });
        let trafficLayer = new window.google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        
        const searchBox = new window.google.maps.places.SearchBox(input)
        searchBox.addListener('places_changed', function() {
            if (searchBox.getPlaces().length === 0) {
              return;
            }
            if(
              searchBox.getPlaces()[0].formatted_address.includes('North Sumatra') || 
              searchBox.getPlaces()[0].formatted_address.includes('Sumatera Utara')
            ){
              const a = searchBox.getPlaces()[0].geometry.location.lat()
              const b =  searchBox.getPlaces()[0].geometry.location.lng()
              self.setState({ori:{lat:position.coords.latitude,lng:position.coords.longitude},dest:{lat:a,lng:b}})
              self.calculateAndDisplayRoute(directionsService,directionsDisplay)

              self.setState({placeSelected:searchBox.getPlaces()[0]})
              return;
            }
            alert('aplikasi hanya untuk daerah medan')
        })
        // var service = new google.maps.places.PlacesService(map);

        // var service = new google.maps.places.PlacesService(map);
        // service.nearbySearch({
        //   location: {lat:this.state.ori.lat,lng:this.state.ori.lng},
        //   radius: 1000,
        //   types: ['bus_station','transit_station']
        // }, (resp)=>{
        //   console.log(resp)
        // });

        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
        
        document.getElementById('places').addEventListener('change', function() {
          const place = this.value
          Axios.get(self.state.host+'/local/places/'+place)
          .then((data)=>{
            data =data.data
            const pl = self.getPlace(place+' medan')
            data.forEach(e => {
              pl.results.push(e)
            });
            self.setState({placesList:pl.results})
          })
        })
        document.getElementById('placeName').addEventListener('change',()=>{
          const name =  document.getElementById('placeName').value
          const place = _.findWhere(this.state.placesList,{name:name})
          this.setState({placeSelected:place})
          let location ={}
          try {
            location = place.geometry.location
          } catch (error) {
            location = JSON.parse(place.location)
            location.lat = parseFloat(location.lat)
            location.lng = parseFloat(location.lng)
          } 
          const a = location.lat
          const b = location.lng
          self.setState({dest:{lat:a,lng:b}})
          self.calculateAndDisplayRoute(directionsService,directionsDisplay)
          self.state.temp=JSON.stringify(place)
        })
    })
  }
  render() {
    return (
      <span>
      <Nav/>
      <Loader/>
      <div className="row" style={{padding:0, margin:0, paddingTop:'5%'}}>
            <div className="col-md-3">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">Kategori</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab">Cari</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#contact" role="tab" >Tambah</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
            <p></p>
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <b>Kategori Tempat: </b>
                  <select id="places" className="form-control" autoFocus>
                      <option value="none">--none--</option>
                      {this.getPlacesType()}
                  </select>
                  <br/>
                  <b>Nama Tempat: </b>
                  <select id="placeName" className="form-control" autoFocus>
                      <option value="none">--none--</option>
                      {this.getPlacesResults()}
                  </select>
                  <br/>
                  <b>Lokasi: </b>
                  <p style={{minHeight:'100px', backgroundColor:'whitesmoke'}}>{
                    this.state.placeSelected.formatted_address
                  }</p>
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <b>Koordinat</b>
                  <input className="form-control" placeholder="masukan koordinat tempat"/>
                  <br/>
                  <b>Nama Tempat</b>
                  <input className="form-control" id="pac-input" placeholder="masukan nama tempat"/>
                  <br/>
                  
              <b>Lokasi: </b>
              <p style={{minHeight:'100px', backgroundColor:'whitesmoke'}}>{
                this.state.placeSelected.formatted_address
              }</p>
              </div>
              <div className="tab-pane fade " id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <input type="text" 
                  ref="address"
                  className="form-control input-lg" 
                  placeholder="Alamat" tabIndex="2"
                  tabIndex='1'
                  />
                <p/>
                <input 
                    ref="_name"
                    className="form-control" 
                    placeholder="Nama Tempat"
                    tabIndex="2" 
                />
                <p/>
                <input type="number" className="form-control" 
                    placeholder="Lat" 
                    ref="lat"
                    tabIndex="3"
                />
                <p/>
                <input type="number" className="form-control" placeholder="Lng" 
                  ref="lng"
                  tabIndex="4"
                />
                <p/>
                <select ref="category" className="form-control" autoFocus>
                   {this.getPlacesType()}
                </select>
                <p/>
                <input 
                type="submit" 
                className="btn btn-info btn-lg"
                onClick={this.handleSubmit} 
                value="Tambahkan" 
                tabIndex="7"
                /> 
                
              </div>
            </div>
              {/* <input type="text" className="form-control" placeholder="Destination"/>   */}
          </div>
          <div className="col-md-9">
              <div id="map" style={{height:'70vh'}}></div>
          </div>
      </div>
      </span>
  )
 }
  
  componentDidMount(){
    // const a  = this.getJSONXmlhttpRequest(this.state.host+'/places/bus/'+this.state.key)

    document.getElementsByClassName('modalbox')[0].style.display="unset"
    setTimeout(() => {
      document.getElementsByClassName('modalbox')[0].style.display="none"
    }, 2000);
    this.initMap()
  }

}

export default App;



