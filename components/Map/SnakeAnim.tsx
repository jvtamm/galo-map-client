import { useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js';

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png'
});

interface SnakeAnimProps {
    locations: LatLngExpression[];
    onAnimationStart?: Function;
    onAnimationEnd?: Function;
}

const SnakeAnim = ({ locations, onAnimationEnd, onAnimationStart }: SnakeAnimProps) => {
    const { map } = useLeaflet();

    useEffect(() => {
        if (!locations || locations.length < 2) return;

        const features: Array<any> = [L.marker(locations[0], { icon })];

        for (let i = 0; i < locations.length - 1; i++) {
            const start = locations[i];
            const end = locations[i + 1];

            features.push(L.polyline([start, end], {
                weight: 2,
                snakingSpeed: 300,
                color: 'black'
            }));

            features.push(L.marker(end, { icon }));
        }

        const route = L.featureGroup(features);

        map.addLayer(route);

        // map.fitBounds(route.getBounds());

        route.on('snakestart', () => {
            console.log('starting');
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
    }, [locations, map]);

    return null;
};

export default SnakeAnim;
