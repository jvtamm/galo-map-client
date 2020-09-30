import React from 'react';
import Leaflet, { latLng, LatLngExpression } from 'leaflet';
import { PolylineProps as LPolylineProps } from 'react-leaflet';

import { CircleTextMarker } from './CircleTextMarker';

export interface PolylineProps extends LPolylineProps {
    showDistance?: boolean;
    currentZoom?: number;
}

const Polyline: React.FC<PolylineProps> = ({ showDistance, currentZoom, positions, ...rest }) => {
    const formattedPositions = positions as LatLngExpression[];

    return (
        <>
            <Polyline positions={formattedPositions} {...rest} />
            {
                currentZoom > 4 && showDistance && formattedPositions.map((location, index) => {
                    if (index === 0) return;

                    const bounds = Leaflet.latLngBounds([location, formattedPositions[index - 1]]);
                    const center = bounds.getCenter();

                    const distance = latLng(location[0], location[1]).distanceTo(formattedPositions[index - 1]);
                    const distanceStr = `${(distance / 1000).toFixed(0)} km`;
                    const radius = currentZoom * 4;

                    return (
                        <CircleTextMarker
                            position={center}
                            content={distanceStr}
                            radius={radius}
                            borderWidth={2}
                            key={index}
                        />
                    );
                })
            }
        </>
    );
};

export const generatePolyline = (showDistance = false) => {
    // eslint-disable-next-line react/display-name
    return (props: PolylineProps) => <Polyline {...props} showDistance={showDistance}/>;
};

export default Polyline;
