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
    const size = Math.min(radius * 2, 50);
    const style = `width: ${size}px; height: ${size}px; border: ${borderWidth}px solid #CC0202;font-size:10px;background: white;
                    border-radius: ${radius}px; display: flex; align-items: center; justify-content: center; text-align: center;`;

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
