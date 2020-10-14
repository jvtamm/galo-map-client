
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
    data: any;
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
    // loadDetails(fixtureId: string): Promise<FixtureDetails>;
    defineAwayFlag(details: FixtureDetails, homeTeamId: string, awayTeamId: string): FixtureDetails;
}

export class FixtureDetailsService implements IFixtureDetailsService {
    // private readonly _endpoint = 'fixture';
    defineAwayFlag(details: FixtureDetails, awayTeamId: string): FixtureDetails {
        const { events } = details;

        details.events = events.map((event) => {
            const { data } = event;
            if (data && data.team) {
                event.isAway = data.team.id === awayTeamId;
            }

            return event;
        });

        return details;
    }
}
