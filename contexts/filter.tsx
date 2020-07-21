import React, { createContext, useState } from 'react';

interface FilterItem {
    label: string;
    key: string;
}

interface FilterContextData {
    filters: FilterItem[];
    applyFilters(filters: FilterItem[]): void;
    removeFilter(key: string): void;
}

export const FilterContext = createContext<FilterContextData>({} as FilterContextData);

// eslint-disable-next-line react/prop-types
export const FilterProvider: React.FC = ({ children }) => {
    const [filters, setFilters] = useState<FilterItem[]>([]);

    function applyFilters(filters: FilterItem[]) {
        setFilters(filters);
    }

    function removeFilter(key: string) {
        const updatedFilters = filters.filter(item => item.key !== key);
        setFilters(updatedFilters);
    }

    return (
        <FilterContext.Provider value={{ filters, applyFilters, removeFilter }}>
            {children}
        </FilterContext.Provider>
    );
};
