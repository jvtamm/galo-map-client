import React, { useContext } from 'react';

import { Layout } from '@components/Layout';
import Chip from '@components/Chip';
import { Swiper } from '@components/SliderSelection';
import { Filter } from '@components/Filter';
import { FilterContext, FilterProvider } from '@contexts/filter';
import { Fixture } from '@components/Fixture';
import { SeasonService, Season } from '@services/season';

const filterSections = {
    Campeonatos: [
        { label: 'Campeonato Brasileiro', key: '1' },
        { label: 'Campeonato Mineiro', key: '2' },
        { label: 'Copa do Brasil', key: '3' }
    ]
};

const fixture = {
    homeTeam: {
        team: { name: 'Uberlândia-MG', id: '1' },
        score: 0
    },
    awayTeam: {
        team: { name: 'Atlético', id: '2' },
        score: 1
    },
    matchDate: new Date(2020, 1, 21, 17),
    ground: {
        name: 'Parque do Sabiá',
        coordinates: {
            latitude: -18.913889,
            longitude: -48.2325
        }
    }
};

const Filters: React.FC = () => {
    const { filters, removeFilter } = useContext(FilterContext);

    return (
        <div style={{ display: 'flex', height: '60px', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid var(--light-effect)' }}>
            <div style={{ marginRight: '32px' }}>
                <Filter sections={filterSections} />
            </div>
            <div>
                {
                    filters.map(({ key, label }) => <Chip color="success" key={key} text={label} handleClose={() => removeFilter(key)} />)
                }
            </div>
        </div>
    );
};

interface MatchesProps {
    seasons: Season[];
}

const Matches = ({ seasons }: MatchesProps) => {
    const swiperOptions = seasons.map(({ id, label }) => ({ label, value: id }));
    const initialSeason = swiperOptions[0];

    return (
        <Layout>
            <div style={{
                width: '480px',
                background: 'var(--white)',
                boxShadow: '5px 0px 20px rgba(0,0,0,.3)',
                height: '100vh'
            }}>
                <div style={{ borderBottom: '1px solid var(--light-effect)' }}>
                    <Swiper options={swiperOptions} initialValue={initialSeason} onChange={(value) => console.log(value)} />
                </div>

                <FilterProvider>
                    <Filters />
                </FilterProvider>

                <Fixture {...fixture} />
            </div>
        </Layout>
    );
};

Matches.getInitialProps = async() => {
    const seasonService = new SeasonService();
    const seasons = await seasonService.list();

    return {
        seasons
    };
};

export default Matches;
