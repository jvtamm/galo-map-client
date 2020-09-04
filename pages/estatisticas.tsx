import React, { useState } from 'react';

import { Layout } from '@components/Layout';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@components/Map'), {
    ssr: false
});

const Statistics: React.FC = () => {
    const [animating, setAnimating] = useState(false);

    const [nextLocations, setNextLocations] = useState([
        { latitude: -31.63179605, longitude: -60.715666350237484 },
        { latitude: -18.596747, longitude: -46.521592 },
        { latitude: -7.253889, longitude: -35.880833 },
        { latitude: -19.865833, longitude: -43.970833 },
        { latitude: -19.908517, longitude: -43.917856 },
        { latitude: -7.75807135, longitude: -37.63183459381579 }
    ]);

    const [locations, setLocations] = useState([
        { latitude: -18.913889, longitude: -48.2325 },
        { latitude: -19.908517, longitude: -43.917856 }
    ]);

    const [animatedLocations, setAnimatedLocations] = useState([]);

    const next = () => {
        const nextLocation = nextLocations.shift();

        setLocations([...locations, nextLocation]);
        setNextLocations(nextLocations);
    };

    const back = () => {
        if (!locations || !locations.length) return;
        if (!animatedLocations || !animatedLocations.length) return;

        const { latitude: lastLat, longitude: lastLng } = locations[locations.length - 1];
        const { latitude: lastAnimLat, longitude: lastAnimLng } = animatedLocations[
            animatedLocations.length - 1
        ];

        if (lastLat !== lastAnimLat || lastLng !== lastAnimLng) return;

        const updatedAnimated = animatedLocations.slice(
            0,
            animatedLocations.length - 1
        );
        const updatedLocations = [updatedAnimated[updatedAnimated.length - 1]];

        nextLocations.unshift({ latitude: lastLat, longitude: lastLng });

        setNextLocations([...nextLocations]);
        setLocations(updatedLocations);
        setAnimatedLocations(updatedAnimated);
    };

    const removeSequenceDuplicates = (locations) => {
        const newLocations = [];

        locations.forEach((loc, index) => {
            if (index === 0) {
                newLocations.push(loc);
            } else {
                const lastLoc = locations[index - 1];

                if (lastLoc.latitude !== loc.latitude && lastLoc.longitude !== loc.longitude) {
                    newLocations.push(loc);
                }
            }
        });

        return newLocations;
    };

    const onAnimationEnd = () => {
        console.log('Animation ended');
        const lastIndex = locations.length - 1;
        // const animatedPaths = locations.slice(0, lastIndex);

        const newAnimatedLocations = [...animatedLocations, ...locations];

        const lastPoint = locations[lastIndex];
        setLocations([lastPoint]);
        console.log('locations', locations);

        setAnimatedLocations(removeSequenceDuplicates(newAnimatedLocations));

        setAnimating(false);
    };

    const onAnimationStart = () => {
        console.log('Animation started');
        setAnimating(true);
    };

    return (
        <Layout>
            <div>
                <div style={{
                    width: '40%',
                    background: 'var(--white)',
                    boxShadow: '5px 0px 20px rgba(0,0,0,.3)',
                    height: '100%'
                }}>

                    <button onClick={back} disabled={animating}>Go back!</button>
                    <button onClick={next} disabled={nextLocations.length === 0 || animating}> Next!</button>

                </div>
                <div style={{ width: '60%', height: '100%' }}>
                    <Map
                        points={animatedLocations}
                        showPolylines={true}
                        showMarker={true}
                        snakePoints={locations}
                        onAnimationStart={onAnimationStart}
                        onAnimationEnd={onAnimationEnd}
                    />

                </div>
            </div>
        </Layout>
    );
};

export default Statistics;
