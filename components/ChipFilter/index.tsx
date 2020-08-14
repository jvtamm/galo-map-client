import React from 'react';

import Chip from '@components/Chip';
import { Filter, FilterSection } from '@components/Filter';
import { useFilters } from '@contexts/filter';

import { ChipWrapper } from './styles';

interface FiltersProps {
    sections: FilterSection;
    children?: React.ReactNode,
}

export const ChipFilter: React.FC<FiltersProps> = ({ sections }: FiltersProps) => {
    const { filters, removeFilter } = useFilters();

    return (
        <>
            <Filter sections={sections} />
            <ChipWrapper>
                {
                    filters.map(({ key, label }) => (
                        <Chip color="success" key={key} text={label} handleClose={() => removeFilter(key)} />
                    ))
                }
            </ChipWrapper>
        </>
    );
};
