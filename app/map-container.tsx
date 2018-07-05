import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';

interface ICoordinate{
    lat: number;
    long: number;
}

interface IMapContainerProps{
    coordinateList: Array<ICoordinate>;
}

class MapContainer extends React.Component<IMapContainerProps, any>{
    constructor(props:any) {
        super(props)
        this.mapLoadedCheck = this.mapLoadedCheck.bind(this);
    }
   
    mapLoadedCheck():void{
        if(!((window as any).google.maps))
        {
            setTimeout(this.mapLoadedCheck,100)
        }
        else if(this.props.coordinateList.length >0)
        {
            (window as any).coordinateList = this.props.coordinateList;
            (window as any).renderMap()
        }
    }
   
    componentDidMount()
    {
        this.mapLoadedCheck();
    }

    render() {
        return (
            <div className="map-holder">
                <div id="map" />
            </div>
        );
    }
    
}

export default MapContainer;