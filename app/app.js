import React from 'react';
import ReactDom from 'react-dom';
import Livemap from './livemap';

import 'leaflet/dist/leaflet.css';

import FileStore from './stores/FileStore';

const fileStore = new FileStore();

ReactDom.render(
    <Livemap FileStore={fileStore} />,
    document.getElementById('mymap')
);
