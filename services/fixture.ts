import api from './api';

import { FixtureDetails, FixtureDetailsService } from './fixture-details';

export type FixtureStatus = 'NS' | 'FT';

export interface Tournament {
    id: string;
    name: string;
    season: number;
}

interface Team {
    id: string;
    name: string;
    abbreviation: string;
    displayName: string;
    country: string;
}

interface FixtureTeam {
    team: Team;
    score: number;
}

interface Coordinates {
    latitude: number,
    longitude: number
}

interface Stadium {
    name: string;
    nickname?: string;
    coordinates: Coordinates;
}

export interface Fixture {
    id: string;
    tournament: Tournament;
    round: string;
    matchDate?: Date;
    ground?: Stadium;
    homeTeam: FixtureTeam;
    awayTeam: FixtureTeam;
    status: FixtureStatus;
    referee?: string;
    details?: FixtureDetails;
}

interface Query {
    [key: string]: string|number
}

interface IFixtureService {
    query(params: Query): Promise<Fixture[]>;
    getById(id: string): Promise<Fixture>;
    getNextMatch(fixtures: Fixture[]): Fixture;
}

export class FixtureService implements IFixtureService {
    private readonly _endpoint = 'fixture';

    private static readonly _fixtureDetailsService = new FixtureDetailsService();

    async query(params: Query): Promise<Fixture[]> {
        const queryParams = Object.entries(params).reduce((acc, [key, value], index) => {
            if (index !== 0) {
                return `${acc}&${key}=${value}`;
            }

            return `${acc}${key}=${value}`;
        }, '?');

        const endpoint = `${this._endpoint}${queryParams}`;

        try {
            const { data } = await api.get(endpoint);

            return data.fixtures.map(FixtureService.formatFixture);
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getById(id: string): Promise<Fixture> {
        try {
            const { data: fixture } = await api.get(`${this._endpoint}/${id}`);

            return FixtureService.formatFixture(fixture);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getNextMatch(fixtures: Fixture[]): Fixture {
        const nextFixtureDate = new Date().setHours(0, 0, 0);

        for (let i = 0; i < fixtures.length; i++) {
            const { matchDate } = fixtures[i];
            const dateObj = new Date(matchDate);

            if (dateObj.getTime() >= nextFixtureDate) {
                return fixtures[i];
            }
        }

        return null;
    }

    getTournaments(fixtures: Fixture[]): Tournament[] {
        const tournaments = {};

        for (let i = 0; i < fixtures.length; i++) {
            const fixture = fixtures[i];
            const { id } = fixture.tournament;

            tournaments[id] = fixture.tournament;
        }

        return Object.values(tournaments);
    }

    static formatFixture(fixture: any): Fixture {
        return {
            id: fixture.id,
            tournament: fixture.tournament as Tournament,
            round: fixture.round,
            homeTeam: fixture.homeTeam,
            awayTeam: fixture.awayTeam,
            status: fixture.status,
            ...fixture.matchDate && { matchDate: fixture.matchDate },
            ...fixture.ground && { ground: fixture.ground },
            ...fixture.referee && { referee: fixture.referee },
            ...fixture.details && { details: this._fixtureDetailsService.defineAwayFlag(fixture.details, fixture.awayTeam.team.id) }
        };
    }
}
