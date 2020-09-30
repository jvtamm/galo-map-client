import { useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js';
import { generateMarker } from './Marker';
// import { Point } from '../Map';
import { useMap } from '@contexts/map';

const defaultIcon = L.divIcon(generateMarker('stadium'));

interface SnakeAnimProps {
    // locations: Point[];
    onAnimationStart?: Function;
    onAnimationEnd?: Function;
}

const SnakeAnim: React.FC<SnakeAnimProps> = ({ onAnimationEnd, onAnimationStart }) => {
    const { map } = useLeaflet();
    const { additionalPoints: points, getMarker, zoom } = useMap();

    useEffect(() => {
        if (!points || points.length < 2) return;

        const { position } = points[0];
        const icon = getMarker(points[0], zoom) ? L.divIcon(getMarker(points[0], zoom)) : defaultIcon;
        const features: Array<any> = [L.marker(position, { icon })];

        for (let i = 0; i < points.length - 1; i++) {
            const { position } = points[i];
            const { position: nextPosition } = points[i + 1];

            features.push(L.polyline([position, nextPosition], {
                weight: 2,
                snakingSpeed: 300,
                color: 'black'
            }));

            const icon = getMarker(points[i], zoom) ? L.divIcon(getMarker(points[i], zoom)) : defaultIcon;
            features.push(L.marker(nextPosition, { icon }));
        }

        const route = L.featureGroup(features);

        map.addLayer(route);

        route.on('snakestart', () => {
            if (onAnimationStart) {
                onAnimationStart();
            }
        });

        route.on('snakeend', () => {
            map.removeLayer(route);
            if (onAnimationEnd) {
                onAnimationEnd();
            }
        });

        route.snakeIn();
    }, [points, map]);

    return null;
};

export default SnakeAnim;
