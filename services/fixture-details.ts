
interface Player {
    name: string;
    jersey: number;
    id?: string;
}

export interface SummonedPlayers {
    bench: Player[];
    lineup: Player[];
}

export type EventTypes = 'card' | 'goal' | 'substitution';

export interface Event {
    type: EventTypes;
    details: any;
    isAway: boolean;
    timestamp?: number;
};

export interface FixtureDetails {
    events: Event[];
    homePlayers: SummonedPlayers;
    awayPlayers: SummonedPlayers;
    attendance?: number;
}

interface IFixtureDetailsService {
    loadDetails(fixtureId: string): Promise<FixtureDetails>;
}

export class FixtureDetailsService {
    // private readonly _endpoint = 'fixture';
}
