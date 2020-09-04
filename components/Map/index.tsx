// import React, { useRef, useState, useEffect, useCallback } from 'react';
import React, { useCallback, useState } from 'react';
import Leaflet, { LatLngExpression, latLng } from 'leaflet';

import {
    LayersControl,
    Map as LeafletMap,
    TileLayer,
    Marker,
    Polyline
} from 'react-leaflet';

import { MapContainer } from './styles';
import SnakeAnim from './SnakeAnim';
import { CircleTextMarker } from './CircleTextMarker';

const { BaseLayer, Overlay } = LayersControl;

export interface Coordinates {
    latitude: number;
    longitude: number;
}

interface MapProps {
    points: Coordinates[];
    showPolylines?: boolean;
    showMarker?: boolean;
    snakePoints?: Coordinates[];
    onAnimationStart?: Function;
    onAnimationEnd?: Function;
    children?: React.ReactNode;
}

const icon = Leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png'
});

const Map: React.FC<MapProps> = ({ points, snakePoints, onAnimationStart, onAnimationEnd, showPolylines, showMarker }: MapProps) => {
    const [showLabels, setShowLabels] = useState(false);

    const onLayeradd = ({ layer }) => {
        const { url } = layer.options;

        const isSatellite = Boolean(url) && url.includes('arcgisonline');
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

    const formattedSnakePoints: LatLngExpression[] = (snakePoints || []).map(({ latitude, longitude }) => {
        return [latitude, longitude];
    });

    const allPoints: LatLngExpression[] = [...formattedPoints, ...formattedSnakePoints];

    const mapProps = {
        ref: layersRef,
        zoom: 17,
        ...allPoints.length === 1 && { center: allPoints[0] },
        ...allPoints.length > 1 && { bounds: Leaflet.latLngBounds(allPoints) }
    };

    return process.browser && (
        <MapContainer>
            <LeafletMap {...mapProps}>
                <LayersControl position="topright">
                    <BaseLayer checked={allPoints.length === 1} name="Satelite">
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community, ESRI'
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        />
                    </BaseLayer>

                    <BaseLayer checked={allPoints.length > 1} name="Standard">
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
                {
                    formattedPoints.length > 0 && (showMarker || showPolylines) && (
                        <>
                            {
                                showMarker && formattedPoints.map((location, index) => (
                                    <Marker position={location} icon={icon} key={index} />
                                ))
                            }
                            { showPolylines && <Polyline positions={formattedPoints} color="black" weight={2} /> }
                            {
                                formattedPoints.map((location, index) => {
                                    if (index === 0) return;

                                    const bounds = Leaflet.latLngBounds([location, formattedPoints[index - 1]]);
                                    const center = bounds.getCenter();

                                    const distance = latLng(location[0], location[1]).distanceTo(formattedPoints[index - 1]);
                                    const distanceStr = `${(distance / 1000).toFixed(0)} km`;

                                    return (
                                        <CircleTextMarker
                                            position={center}
                                            content={distanceStr}
                                            radius={30}
                                            borderWidth={2}
                                            key={index}
                                        />
                                    );
                                })
                            }
                        </>
                    )
                }

                {
                    formattedSnakePoints.length > 1 && (
                        <SnakeAnim
                            locations={formattedSnakePoints}
                            onAnimationStart={onAnimationStart}
                            onAnimationEnd={onAnimationEnd} />
                    )
                }
            </LeafletMap>
        </MapContainer>
    );
};

export default Map;
