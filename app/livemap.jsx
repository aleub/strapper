import React from 'react';
import {Map, Polyline, TileLayer} from 'react-leaflet';

class Livemap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lineColor: 'red',
            tracks: [[]],
            center: [50.742477, 13.706126]
        };
    }

    handleReadLoadend(progressEvent) {
        const parser = new window.DOMParser();
        const xmlObj = parser.parseFromString(progressEvent.target.result, 'text/xml');
        const trkPts = xmlObj.documentElement.getElementsByTagName('trkpt');

        const tracks = this.state.tracks;
        const results = [];
        let key = null;

        for (key in trkPts) {
            if (trkPts.hasOwnProperty(key) && parseInt(key, 10) % 2 === 0) {
                results.push([
                    parseFloat(trkPts[key].getAttribute('lat')),
                    parseFloat(trkPts[key].getAttribute('lon'))
                ]);
            }
        }

        tracks.push(results);

        this.setState({
            tracks: tracks,
            center: results[0]
        });
    }

    handleProgress(progressEvent) {
        if (progressEvent.lengthComputable) {
            console.log(`${(progressEvent.loaded / progressEvent.total) * 100} %`);
        }
    }

    handleFileChange() {
        for (let i = 0; i < this.refs.file.files.length; i++) {
            const reader = new FileReader();

            reader.onprogress = handleProgress;
            reader.onloadend = this.handleReadLoadend.bind(this);
            reader.readAsText(this.refs.file.files.item(i));
        }
    }

    render() {
        const pols = this.state.tracks.map((track, key) => {
            return <Polyline key={key} color={this.state.lineColor} positions={track} />;
        });

        return (<div>
            <Map style={{width: '70%', margin: '0 auto', height: '800px'}} center={this.state.center} zoom={12}>
                <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {pols}
            </Map>
            <input ref="file" type="file" multiple={true} onChange={this.handleFileChange.bind(this)} />
        </div>);
    }
}

export default Livemap;

