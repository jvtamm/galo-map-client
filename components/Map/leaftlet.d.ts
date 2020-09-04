import 'leaflet';

declare module 'leaflet' {
    export interface SnakePolylineOptions extends PolylineOptions {
        snakingSpeed: number;
    }

    export interface SnakeFeatureGroup extends FeatureGroup {
        snakeIn: Function;
    }

    export function polyline(latlngs: LatLngExpression[] | LatLngExpression[][], options?: SnakePolylineOptions): Polyline;

    export function featureGroup(layers?: Layer[]): SnakeFeatureGroup;
}
