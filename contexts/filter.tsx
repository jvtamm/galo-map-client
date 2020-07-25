import React, { createContext, useState, useContext } from 'react';

interface FilterItem {
    label: string;
    key: string;
}

interface FilterContextData {
    filters: FilterItem[];
    applyFilters(filters: FilterItem[]): void;
    removeFilter(key: string): void;
    includes(key: string): boolean;
}

interface FilterHash {
    [key: string]: boolean;
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData);

// eslint-disable-next-line react/prop-types
export const FilterProvider: React.FC = ({ children }) => {
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [filtersHash, setFiltersHash] = useState<FilterHash>({});

    function applyFilters(filters: FilterItem[]) {
        setFilters(filters);

        const updatedFilterHash = {};
        filters.forEach(({ key }) => {
            updatedFilterHash[key] = true;
        });

        setFiltersHash(updatedFilterHash);
    }

    function removeFilter(key: string) {
        const updatedFilters = filters.filter(item => item.key !== key);
        setFilters(updatedFilters);

        const updatedFilterHash = { ...filtersHash };
        delete updatedFilterHash[key];

        setFiltersHash(updatedFilterHash);
    }

    function includes(key: string) {
        return key in filtersHash;
    }

    return (
        <FilterContext.Provider value={{ filters, applyFilters, removeFilter, includes }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    return useContext(FilterContext);
};
