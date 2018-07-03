import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';

interface IAutoCompleteDisplayProps{
    list: IAutoComplete;
    selectedFromAutofill: (place_id:string) => void;
}
interface IAutoComplete {
    place_id: string;
    description: string;
}

class AutoCompleteDisplay extends React.Component<IAutoCompleteDisplayProps, any>{
    constructor(props:any) {
        super(props)
    }

    updateSelectedCity(e:any):void {
        e.preventDefault();
        var placeId = e.currentTarget.attributes["value"].value as string;
        this.props.selectedFromAutofill(placeId);
    }
    render() {
        return (
            <li key={this.props.list.place_id} value={this.props.list.place_id} onClick={this.updateSelectedCity.bind(this)}>
                <a href="#">{this.props.list.description}</a>
            </li>
        );
    }
    
}

export default AutoCompleteDisplay;