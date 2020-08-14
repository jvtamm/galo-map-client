// import React, { useRef, useState, useEffect, useCallback } from 'react';
import React, { useCallback, useState } from 'react';
import Leaflet, { LatLngExpression } from 'leaflet';

import {
    LayersControl,
    Map as LeafletMap,
    TileLayer
} from 'react-leaflet';

import { MapContainer } from './styles';

const { BaseLayer, Overlay } = LayersControl;

export interface Coordinates {
    latitude: number;
    longitude: number;
}

interface MapProps {
    points: Coordinates[];
    children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ points }: MapProps) => {
    const [showLabels, setShowLabels] = useState(false);

    const onLayeradd = ({ layer }) => {
        const { url } = layer.options;

        const isSatellite = url.includes('arcgisonline');
        setShowLabels(isSatellite);
    };

    const layersRef = useCallback(node => {
        if (node !== null) {
            const map = node.leafletElement;

            map.on('layeradd', onLayeradd);
        }
    }, []);

    const formattedPoints: LatLngExpression[] = points.map(({ latitude, longitude }) => {
        return [latitude, longitude];
    });

    const mapProps = {
        ref: layersRef,
        zoom: 17,
        ...formattedPoints.length === 1 && { center: formattedPoints[0] },
        ...formattedPoints.length > 1 && { bounds: Leaflet.latLngBounds(formattedPoints) }
    };

    return process.browser && (
        <MapContainer>
            <LeafletMap {...mapProps}>
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
                    <Overlay checked={showLabels} name="World Boundaries and Places">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                        />
                    </Overlay>
                </LayersControl>
            </LeafletMap>
        </MapContainer>
    );
};

export default Map;
