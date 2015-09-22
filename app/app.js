import React from 'react';
import ReactDom from 'react-dom';
import Livemap from './livemap';

import 'leaflet/dist/leaflet.css'

ReactDom.render(
    <Livemap />,
    document.getElementById("mymap")
);