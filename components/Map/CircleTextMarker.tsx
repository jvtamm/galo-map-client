import React from 'react';
import L, { LatLng } from 'leaflet';
import { Marker } from 'react-leaflet';

interface CircleTextMarkerProps {
    position: LatLng;
    content: string;
    radius: number;
    borderWidth: number;
}

export const CircleTextMarker = ({ position, content, radius, borderWidth, ...rest }: CircleTextMarkerProps) => {
    const size = radius * 2;
    const style = `width: ${size}px; height: ${size}px; border: ${borderWidth}px solid red; 
                   background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center;`;

    const iconSize = size + (borderWidth * 2);

    const circle = L.divIcon({
        html: `<div style="${style}">${content}</div>`,
        iconSize: [iconSize, iconSize]
    });

    return <Marker
        position={position}
        icon={circle}
        {...rest}
    />;
};
