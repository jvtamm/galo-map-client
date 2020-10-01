import React from 'react';

import { Lineup } from '@components/Lineup';
import { Fixture } from '@services/fixture';

export const MatchLineup: React.FC<Fixture> = ({ details }) => {
    if (!details) return null;

    // const lineup = {
    //     homePlayers: details.homePlayers,
    //     awayPlayers: details.awayPlayers
    // };
    const lineup = {
        homePlayers: {
            lineup: [
                {
                    name: 'Victor',
                    jersey: 1,
                    id: '123'
                },
                {
                    name: 'Marcos Rocha',
                    jersey: 2,
                    id: '124'
                }
            ],
            bench: []
        },
        awayPlayers: {
            lineup: [
                {
                    name: 'Fábio',
                    jersey: 1,
                    id: '125'
                },
                {
                    name: 'Ceará',
                    jersey: 2,
                    id: '126'
                }
            ],
            bench: []
        }
    };

    return (
        <Lineup {...lineup}/>
    );
};
