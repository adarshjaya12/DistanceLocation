import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';
import AutoCompleteDisplay from './address-autocomplete-display';
import MilesLimitDisplay from './input-miles-display';

const distanceList = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1100+"];
const selectSide = ["Select","East", "west"];
interface IAutoComplete {
    place_id: string;
    description: string;
}
 
interface IAutoCompleteList {
    autoFillList: Array<IAutoComplete>;
    displayList: boolean;
    cityplace_id: string;
    miles: string;
    cityDescription: string;
    sideSelect: string;
}

const script = "http://maps.googleapis.com/maps/api/js?libraries=places";


class HomeFormContainer extends React.Component<any, IAutoCompleteList>{
    constructor(props: any) {
        super(props)
        this.state = {
            displayList: false,
            autoFillList: new Array<IAutoComplete>(),
            cityplace_id: "",
            miles: "",
            sideSelect: "",
            cityDescription:""
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
            this.setState({
                autoFillList: body,
                displayList: true
            });
        })
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
                cityDescription: autoPlace[0].description
            });
        }
    }
    buttonSubmit(): void {
        var placeId = this.state.cityplace_id;
        var milesSelected = this.state.miles;
        var cityDescription = this.state.cityDescription;
        var isEast = this.state.sideSelect == "East" || this.state.sideSelect == undefined;
        var url = "route/index?cityDescription=" + cityDescription + "&miles=" + milesSelected + "&east=" + isEast;
        window.open(url, '_blank');
        //this.fetchFromAPI(url);
        //this.fetchPOST(url,
        //    { "cityDescription": cityDescription, "miles": milesSelected, "east": isEast});
    }

    //fetchPOST(apiUrl: string,data:any): void
    //{
    //    fetch(apiUrl, {
    //        method: "POST",
    //        body: JSON.stringify(data),
    //        headers: {
    //            "Content-Type": "application/json"
    //        }
    //    }).then(response => {
    //        if (response.status >= 200 && response.status < 300) {
    //            console.log("Success");
    //        }
    //        return response.json();
    //    }).then(body => {

    //    });
    //}
    dropdownChange(e: any): void {
        var milesValue = e.target.value;
        this.setState({
            miles: milesValue
        });
    }
    dropdownSideChange(e: any): void {
        var sideValue = e.target.value;
        this.setState({
            sideSelect: sideValue
        });
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
                
                <div className="form-component">
                    <select className="form-container-dropdown" onChange={this.dropdownChange.bind(this)}>
                        {distanceList.map(item =>
                            <MilesLimitDisplay miles={item} />
                        )}
                    </select>
                </div>
                <div className="form-component">
                    <button className="form-container-button" onClick={this.buttonSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        );
    }

}

export default HomeFormContainer;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               