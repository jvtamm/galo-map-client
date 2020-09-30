import React, { createContext, useState, useContext, useImperativeHandle, useCallback, forwardRef } from 'react';
import { DivIconOptions, LatLngExpression } from 'leaflet';
// import { MarkerProps } from '@components/Map/Marker';

export interface Coordinates {
    latitude: number;
    longitude: number;
}

interface MarkerOptions {
    small: DivIconOptions;
    large?: DivIconOptions;
    breakpoint?: number;
    popup?: React.ReactNode;
}

interface InputPoint {
    position: Coordinates;
    marker?: MarkerOptions;
}

export interface Point {
    position: LatLngExpression;
    // marker?: DivIconOptions;
    marker?: MarkerOptions;
}

export interface MapContextData {
    points: Point[];
    distance?: number;
    zoom: number;
    additionalPoints?: Point[];
    setZoom(zoom: number): void;
    setDistance(distance: number): void;
    definePoints(points: InputPoint[] | Point[]): void;
    defineAdditionalPoints(points: InputPoint[] | Point[]): void;
    getMarker(point: Point, currentZoom: number): DivIconOptions;
}

export interface MapHandlers {
    definePoints(points: InputPoint[]): void;
    defineAdditionalPoints(points: InputPoint[]): void;
}

interface InitialProps {
    positions?: InputPoint[];
    additionalPositions?: InputPoint[];
    children: React.ReactNode;
}

function formatPoints(points: InputPoint[]): Point[] {
    if (!points || !points.length) return [];

    return points.map((point) => ({
        position: [point.position.latitude, point.position.longitude],
        ...point.marker && { marker: point.marker }
    }));
}

const MapContext = createContext<MapContextData>({} as MapContextData);

const MapProvider: React.ForwardRefRenderFunction<MapHandlers, InitialProps> = ({ children, positions, additionalPositions }, ref) => {
    const [points, setPoints] = useState<Point[]>(formatPoints(positions || []));
    const [additionalPoints, setAdditionalPoints] = useState<Point[]>(formatPoints(additionalPositions || []));
    const [zoom, setZoom] = useState<number>(17);
    const [distance, setDistance] = useState<number>(0);

    const definePoints = useCallback((positions: InputPoint[] | Point[]) => {
        if (positions && positions.length && Array.isArray(positions[0].position)) {
            setPoints(positions as Point[]);
        } else {
            setPoints(formatPoints(positions as InputPoint[]));
        }
    }, []);

    const defineAdditionalPoints = useCallback((positions: InputPoint[] | Point[]) => {
        if (positions && positions.length && Array.isArray(positions[0].position)) {
            setAdditionalPoints(positions as Point[]);
        } else {
            setAdditionalPoints(formatPoints(positions as InputPoint[]));
        }
    }, []);

    const getMarker = useCallback((point: Point, currentZoom: number) => {
        if (!point || !point.marker) return null;

        const { breakpoint, small, large } = point.marker;

        return small && currentZoom <= breakpoint ? small : large;
    }, []);

    const values: MapContextData = {
        points,
        distance,
        additionalPoints,
        definePoints,
        defineAdditionalPoints,
        zoom,
        setZoom,
        getMarker,
        setDistance
    };

    useImperativeHandle(ref, () => values);

    return (
        <MapContext.Provider
            value={values}>
            {children}
        </MapContext.Provider>
    );
};

export default forwardRef(MapProvider);

export const useMap = () => {
    return useContext(MapContext);
};
