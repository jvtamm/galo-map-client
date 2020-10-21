import React, { useCallback, useState } from 'react';
import Leaflet, { latLng, LatLngExpression, DivIconOptions } from 'leaflet';

import {
    LayersControl,
    Map as LeafletMap,
    TileLayer,
    Marker,
    Polyline, Popup
} from 'react-leaflet';

import { MapContainer } from './styles';
import { CircleTextMarker } from './CircleTextMarker';
import { useMap } from '@contexts/map';

const { BaseLayer, Overlay } = LayersControl;

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Point {
    position: Coordinates;
    marker?: DivIconOptions;
}

export interface FormattedPoint {
    position: LatLngExpression;
    marker?: DivIconOptions;
}

interface MapProps {
    // points: Point[];
    showPolylines?: boolean;
    // additionalPoints?: Point[];
    children?: React.ReactNode;
    style?: any;
}

const Map: React.FC<MapProps> = ({ showPolylines, children, ...rest }: MapProps) => {
    const [showLabels, setShowLabels] = useState(false);
    const {
        points,
        additionalPoints,
        zoom: currentZoom,
        setZoom,
        getMarker,
        setDistance
    } = useMap();

    const onLayeradd = ({ layer }) => {
        const { url } = layer.options;

        const isSatellite = Boolean(url) && url.includes('arcgisonline');
        setShowLabels(isSatellite);
    };

    const layersRef = useCallback(node => {
        if (node !== null) {
            const map = node.leafletElement;

            map.on('layeradd', onLayeradd);
            // map.dragging = !Leaflet.Browser.mobile;
            // map.tap = !Leaflet.Browser.mobile;
        }
    }, []);

    const allPoints = [...points, ...additionalPoints];

    if (!allPoints.length) {
        setZoom(4);
        allPoints.push({
            position: [-15.749997, -47.9499962] as LatLngExpression
        });
    }

    const allLocations = allPoints.map(({ position }) => position);
    const mapProps = {
        ref: layersRef,
        zoom: currentZoom || 17,
        dragging: true,
        tap: !Leaflet.Browser.mobile,
        ...allLocations.length === 1 && { center: allLocations[0] },
        ...allLocations.length > 1 && { bounds: Leaflet.latLngBounds(allLocations) }
    };

    const onViewportChanged = (viewport) => {
        const { zoom } = viewport;
        setZoom(zoom);
    };

    let travelledDistance = 0;

    return process.browser && (
        <MapContainer {...rest}>
            <LeafletMap {...mapProps} onViewportChanged={onViewportChanged}>
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
                    points.length > 0 && points.map((point, index) => {
                        const { position, marker: currentMarker } = point;

                        const marker = getMarker(point, currentZoom);
                        if (marker) {
                            const icon = Leaflet.divIcon(marker);

                            if (currentMarker.popup) {
                                return (
                                    <Marker position={position} icon={icon} key={index}>
                                        <Popup maxHeight={200}>
                                            {currentMarker.popup}
                                        </Popup>
                                    </Marker>
                                );
                            }

                            return <Marker position={position} icon={icon} key={index} />;
                        }

                        return null;
                    })
                }
                {
                    points.length > 0 && (
                        <>
                            {showPolylines && (
                                <Polyline
                                    positions={points.map(({ position }) => position)}
                                    color="black"
                                    opacity={0.75}
                                    weight={2} />
                            )}
                            {
                                points.map((location, index) => {
                                    if (index === 0) return;

                                    const { position } = location;
                                    const bounds = Leaflet.latLngBounds([position, points[index - 1].position]);
                                    const center = bounds.getCenter();

                                    const distance = latLng(position[0], position[1]).distanceTo(points[index - 1].position) / 1000;
                                    travelledDistance += distance;

                                    const distanceStr = `${distance.toFixed(0)} km`;
                                    const radius = currentZoom * 4;

                                    return currentZoom > 4 && distance > 0 ? (
                                        <CircleTextMarker
                                            position={center}
                                            content={distanceStr}
                                            radius={radius}
                                            borderWidth={2}
                                            key={index}
                                        />
                                    ) : <></>;
                                })
                            }
                        </>
                    )
                }
                { setDistance(travelledDistance) }

                {children}
            </LeafletMap>
        </MapContainer>
    );
};

export default Map;
