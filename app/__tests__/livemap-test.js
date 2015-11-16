import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Livemap from '../livemap';
import {Map, Polyline, TileLayer} from 'react-leaflet';

describe('livemap', () => {
    let mockStore;

    beforeEach(() => {
        mockStore = {
            getCenter: () => {
                return [51, 17];
            },
            getTracks: () => {
                return [
                   [[51, 17], [51, 17], [51, 17], [51, 17]]
                ];
            }
        };
    });

    it('renders', () => {
        const element = TestUtils.renderIntoDocument(<Livemap FileStore={mockStore}/>);
        expect(element).toBeTruthy();
    });

    it('emits events', () => {
        const element = TestUtils.renderIntoDocument(<Livemap FileStore={mockStore}/>);
        expect(spyOn(element, 'forceUpdate')).toHaveBeenCalled();

        expect(element).toBeTruthy();
    });
});

