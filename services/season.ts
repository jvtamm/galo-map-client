import api from './api';

export interface Season {
    id: string;
    year: number;
    label?: string;
}

interface ISeasonService {
    list(): Promise<Season[]>
}

export class SeasonService implements ISeasonService {
    private readonly _endpoint = 'season';

    async list(): Promise<Season[]> {
        try {
            const response = await api.get(this._endpoint);
            const { data } = response;

            return data.map((season) => season as Season);
        } catch (e) {
            console.log(e);
            return [] as Season[];
        }
    }
}
