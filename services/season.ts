import api from './api';

export interface Season {
    id: string;
    year: number;
    label?: string;
}

export interface SeasonRange {
    current: Season;
    previous?: Season;
    next?: Season;
}

interface ISeasonService {
    getByYear(year: number, range?: number): Promise<SeasonRange>
    getAllSeasons(): Promise<Season[]>;
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

    async getAllSeasons():Promise<Season[]> {
        const endpoint = `${this._endpoint}/list`;

        try {
            const { data } = await api.get(endpoint);

            return data.seasons;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}
