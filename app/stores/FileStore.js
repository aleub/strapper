import StrapperDispatcher from '../dispatcher/StrapperDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from '../constants/StrapperConstants';
import _ from 'underscore';

class FileStore extends EventEmitter {
    constructor() {
        super();

        this.dispatchToken = StrapperDispatcher.register(this.handleDispatch.bind(this));
        this._tracks = [];
        this._center = [51, 17];
    }

    getTracks() {
        return this._tracks;
    }

    getCenter() {
        return this._center;
    }

    emit(...args) {
        EventEmitter.prototype.emit.call(this, 'all', args[0]);
        EventEmitter.prototype.emit.call(this, ...args);
    }

    handleProgress(progressEv) {
        if (progressEv.lengthComputable) {
            console.log(`${(progressEv.loaded / progressEv.total) * 100} %`);
        }
    }

    handleReadLoadend(progressEv) {
        const parser = new window.DOMParser();
        const xmlObj = parser.parseFromString(progressEv.target.result, 'text/xml');
        const trkPts = xmlObj.documentElement.getElementsByTagName('trkpt');

        const results = [];

        _.each(trkPts, (trkPt) => {
            results.push([
                parseFloat(trkPt.getAttribute('lat')),
                parseFloat(trkPt.getAttribute('lon'))
            ]);
        });

        this._tracks.push(results);
        this._center = results[0];
        this.emit('change');
    }

    handleDispatch(action) {
        switch (action.type) {
        case ActionTypes.ADD_FILE:
            // this.emit('change', action);
            const reader = new FileReader();
            reader.onprogress = this.handleProgress;
            reader.onloadend = this.handleReadLoadend.bind(this);
            reader.readAsText(action.data.file);
            break;
        default:
        }
    }
}

export default new FileStore();
