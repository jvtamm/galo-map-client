// import React, { useRef, useState, useEffect, useCallback } from 'react';
import React from 'react';

import {
    LayersControl,
    Map as LeafletMap,
    // SVGOverlay,
    TileLayer
} from 'react-leaflet';

import { MapContainer } from './styles';

const { BaseLayer, Overlay } = LayersControl;

interface MapProps {
    point: Array<number>;
    children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ point }: MapProps) => {
    // const layersRef = useRef(null);
    // const [showLabels, setShowLabels] = useState(false);

    // const position = [-19.9083333333333, -43.9177777777778];
    // const bounds = [
    //     [-19.9083333333333, -43.9177777777778],
    //     [-19.92, -43.925]
    // ];

    // const shouldShowLables = (layerControl) => {
    //     const map = layerControl && layerControl.leafletElement;
    //     if (!map) return false;

    //     const { _layers: layers, _layerControlInputs: layerInputs } = map;

    //     const sateliteIndex = layers.findIndex(({ name }) => name === 'Satelite');
    //     if (sateliteIndex < 0) return false;

    //     return layerInputs[sateliteIndex].checked;
    // };

    // const layersRef = useCallback(node => {
    //     if (node !== null) {
    //         setShowLabels(shouldShowLables(node));
    //     }
    // }, []);

    return process.browser && (
        <MapContainer>
            <LeafletMap center={point} zoom={17}>
                {/* <LayersControl position="topright" ref={layersRef}> */}
                <LayersControl position="topright">
                    <BaseLayer checked name="Satelite">
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community, ESRI'
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        />
                    </BaseLayer>

                    <BaseLayer name="Standard">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                    </BaseLayer>
                    <Overlay checked name="World Boundaries and Places">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                        />
                    </Overlay>

                    {/* <Overlay checked name="Marker">
                        <SVGOverlay bounds={bounds} viewBox="0 0 80 80">
                            <rect x="0" y="0" width="100%" height="100%" fill="blue" />
                            <circle r="5" cx="10" cy="10" fill="red" />
                            <text x="50%" y="50%" fill="white">
                                text
                            </text>
                        </SVGOverlay>
                    </Overlay> */}
                </LayersControl>
            </LeafletMap>
        </MapContainer>
    );
};

export default Map;
