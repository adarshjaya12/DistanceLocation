import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';
import AutoCompleteDisplay from './address-autocomplete-display';
import MapContainer from './map-container';

const selectSide = ["Select","East", "west"];
interface IAutoComplete {
    place_id: string;
    description: string;
    latitude:string;
    longitude:string;
}

interface ICoordinate{
    lat: number;
    long: number;
}

interface IAutoCompleteList {
    autoFillList: Array<IAutoComplete>;
    coordinateList: Array<ICoordinate>;
    displayList: boolean;
    displayMap:boolean;
    cityplace_id: string;
    miles: string;
    cityDescription: string;
    latitude: string;
    longitude: string;
}

const script = "http://maps.googleapis.com/maps/api/js?libraries=places";


class IndexContainer extends React.Component<any, IAutoCompleteList>{
    constructor(props: any) {
        super(props)
        this.state = {
            displayList: false,
            autoFillList: new Array<IAutoComplete>(),
            coordinateList: new Array<ICoordinate>(),
            displayMap:false,
            cityplace_id: "",
            miles: "",
            cityDescription:"",
            latitude:"",
            longitude: ""
        }
        this.fetchFromAPI = this.fetchFromAPI.bind(this);
    }

    fetchFromAPI(apiUrl: string): void {
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log("Success");
            }
            return response.json();
        }).then(body => {
            if(apiUrl.indexOf("Submit") !== -1)
            {
                this.setState({
                    coordinateList: body,
                    displayMap:true
                })
            }else
            {
                this.setState({
                    autoFillList: body,
                    displayList: true
                });
            }
        })
    }
    handlemiles(eve:any):void{
        var inputText = eve.target.value as string;
        this.setState({
                miles: inputText
            });
    }
    handleInputChange(eve: any): void {
        var inputText = eve.target.value as string;
        var autoCompleteUrl = "/autofillcities?input=" + inputText;
        this.fetchFromAPI(autoCompleteUrl);
    }
    selectedFromAutofill(placeId: string): void {
        console.log(placeId);
        var autoPlace = this.state.autoFillList.filter(it => it.place_id == placeId);
        var input = this.refs.autoCompletePlaces as any;
        if (autoPlace.length > 0) {
            console.log(input);
            input.value = autoPlace[0].description;
            var placeId = autoPlace[0].place_id;
            this.setState({
                autoFillList: new Array<IAutoComplete>(),
                cityplace_id: placeId,
                cityDescription: autoPlace[0].description,
                latitude: autoPlace[0].latitude,
                longitude: autoPlace[0].longitude
            });
        }
    }
    buttonSubmit(): boolean {
        var cityDescription = this.state.cityDescription;
        var placeId = this.state.cityplace_id;
        var milesSelected = this.state.miles;
        var latitude= this.state.latitude;
        var longitude = this.state.longitude;
        var url = "/Submit?cityDescription=" + cityDescription + "&miles=" + milesSelected+"&latitude="+latitude+"&longitude="+longitude;
        this.fetchFromAPI(url);
        return false;
    }

    fetchGeoLocation(apiUrl: string): void {
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300)
            {
                console.log("Success");
            }
            return response.json();
        }).then(body => {
            var input = this.refs.autoCompletePlaces as any;
            console.log(input);
            input.value = body.city;
            var placeId = body.placeId;
            this.setState({
                autoFillList: new Array<IAutoComplete>(),
                cityplace_id: placeId,
                displayList: false
            });
        });
    }
    geolocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error);
        } else {
            console.log("No geo location");
        }
    }

    success(position :any): void {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log('Your latitude is :' + lat + ' and longitude is ' + long);
        var goeLocationUrl = "/GetGeoLocation?latitude=" + lat + "&longitude=" + long;
        this.fetchGeoLocation(goeLocationUrl);
    }
    

    error(): void {

    }
    render() {
        const display = this.state.displayList;
        return (
            <div className="form-container">
                <div className="form-component">
                    <input type="text" className="form-container-textbox" id="autocomplete-text" placeholder="Enter the city" onChange={this.handleInputChange.bind(this)} ref="autoCompletePlaces" />
                    <button onClick={this.geolocation.bind(this)}>Geo</button>
                </div>
                <div>
                    {
                        (display == true) ?
                        (<ul className="auto-complete-list" >
                            {this.state.autoFillList.map(item =>
                                <AutoCompleteDisplay selectedFromAutofill={this.selectedFromAutofill.bind(this)} list={item} />
                            )}
                        </ul>
                        )
                        :
                        (<div></div>)
                    }
                </div>
                <div>
                
                </div>
                
                <div className="form-component">
                    <input type="text" className="form-container-textbox" onChange={this.handlemiles.bind(this)} id="miles-text" placeholder="Miles" ref="miles" />
                </div>
                <div className="form-component">
                    <a href="" className="form-container-button" onClick={this.buttonSubmit.bind(this)}>Submit</a>
                </div>
            </div>
        );
    }

}

export default IndexContainer;