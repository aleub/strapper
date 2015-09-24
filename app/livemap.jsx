import React from 'react';
import _ from 'underscore';
import {Map, Polyline, TileLayer} from 'react-leaflet';

import Dispatcher from './dispatcher/StrapperDispatcher';
import {ActionTypes} from './constants/StrapperConstants';

import FileStore from './stores/FileStore';

class Livemap extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        FileStore.on('change', () => {
            this.forceUpdate();
        });
    }

    handleFileChange() {
        _.each(this.refs.file.files, (file) => {
            Dispatcher.dispatch({
                type: ActionTypes.ADD_FILE,
                data: {
                    file: file
                }
            });
        });
    }

    render() {
        const pols = FileStore.getTracks().map((track, key) => {
            return <Polyline key={key} color="red" positions={track} />;
        });

        return (<div>
            <Map style={{width: '70%', margin: '0 auto', height: '400px'}} center={FileStore.getCenter()} zoom={12}>
                <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {pols}
            </Map>
            <input ref="file" type="file" multiple onChange={this.handleFileChange.bind(this)} />
        </div>);
    }
}

export default Livemap;

