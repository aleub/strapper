import FileStore from '../../stores/FileStore';

describe('FileStore', () => {
    let store;

    beforeEach(() => {
        store = new FileStore();
    });

    it('should be a function', () => {
        expect(typeof FileStore).toEqual('function');
    });

    it('should init with an empty tracklist', () => {
        let tracks = store.getTracks();
        expect(tracks.length).toBe(0);
        expect(tracks).toEqual([]);
    });

    it('should init with an default center', () => {
        let center = store.getCenter();
        expect(center.length).toBe(2);
        expect(center[0]).toEqual(jasmine.any(Number));
        expect(center[1]).toEqual(jasmine.any(Number));
    });
});
