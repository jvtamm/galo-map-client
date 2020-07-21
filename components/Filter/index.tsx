import React, { useState, useEffect, useRef, useContext } from 'react';

import {
    ButtonWrapper,
    Container,
    FilterButton,
    FilterIcon,
    Dropdown,
    CheckBox,
    FilterSection
} from './styles';
import { Button } from '@components/Button';
import { FilterContext } from '@contexts/filter';

interface FilterItem {
    label: string;
    key: string;
}

interface FilterSection {
    [key: string]: FilterItem[];
}

interface FilterProps {
    sections: FilterSection;
}

export const Filter: React.FC<FilterProps> = ({ sections }: FilterProps) => {
    const [open, setOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const { applyFilters } = useContext(FilterContext);

    function closeDropdown(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }

    const dropdownRef = useRef(null);
    closeDropdown(dropdownRef);

    function handleApply() {
        applyFilters(selectedFilters);

        setOpen(false);
    }

    function handleCheckBox(event, item) {
        const { checked } = event.target;

        if (checked) {
            setSelectedFilters([...selectedFilters, item]);
        } else {
            const updatedFilters = selectedFilters.filter(({ key }) => item.key !== key);
            setSelectedFilters(updatedFilters);
        }
    }

    return (
        <Container>
            <FilterButton onClick={() => setOpen(!open)}>
                <FilterIcon />
            </FilterButton>

            {open && (
                <Dropdown ref={dropdownRef}>
                    {
                        Object.entries(sections).map(([key, value]) => {
                            return (
                                <FilterSection key={key}>
                                    <span>{key.toUpperCase()}</span>
                                    <ul>
                                        {
                                            value.map(({ key, label }) => (
                                                <li key={key}>
                                                    <CheckBox
                                                        type="checkbox"
                                                        id={key}
                                                        value={key}
                                                        checked={selectedFilters.some(item => item.key === key)}
                                                        onChange={(event) => handleCheckBox(event, { key, label })} />
                                                    <label htmlFor={key}>{label}</label>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </FilterSection>
                            );
                        })
                    }

                    <ButtonWrapper>
                        <Button color="success" textColor="white" onClick={handleApply}>
                            Aplicar
                        </Button>
                    </ButtonWrapper>
                </Dropdown>
            )}
        </Container>
    );
};
