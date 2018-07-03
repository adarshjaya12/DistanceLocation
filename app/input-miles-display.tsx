import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';

interface IMilesLimitProps {
    miles: string;
}

class MilesLimitDisplay extends React.Component<IMilesLimitProps, any>{
    constructor(props:any) {
        super(props)
    }

   
    render() {
        return (
            <option key={this.props.miles} value={this.props.miles} >
                {this.props.miles}
            </option>
        );
    }
    
}

export default MilesLimitDisplay;