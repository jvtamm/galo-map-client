import api from './api';

export interface Season {
    id: string;
    year: number;
    label?: string;
}

// interface SeasonSummary {
//     seasons: Season[];
//     current?: Season
// }

export interface SeasonRange {
    current: Season;
    previous?: Season;
    next?: Season;
}

interface ISeasonService {
    getByYear(year: number, range?: number): Promise<SeasonRange>
}

export class SeasonService implements ISeasonService {
    private readonly _endpoint = 'season';

    async getByYear(year: number, range?: number): Promise<SeasonRange> {
        let endpoint = `${this._endpoint}?year=${year}`;
        if (range) endpoint += `&range=${range}`;

        try {
            const { data } = await api.get(endpoint);
            const { season, next, previous } = data;

            return {
                current: season as Season,
                ...previous && { previous: previous as Season },
                ...next && { next: next as Season }
            };
        } catch (e) {
            console.log(e);
            return { current: null };
        }
    }
}
