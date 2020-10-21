// Adapted from: https://codepen.io/Naasa21/embed/qdxKMo?default-tab=result&theme-id=0

import React, { useRef, useEffect } from 'react';

import { TimelineContainer, TimelineItem } from './styles';

export interface TimelineItemProps {
    id: string,
    matchDate: Date,
    ground: string,
    homeTeam: string,
    awayTeam: string
}

interface TimelineProps {
    items: TimelineItemProps[];
    selectable: boolean;
    initialSelectedIndex: number;
    onSelectionChange: (index: number, lastIndex: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ items, initialSelectedIndex, selectable, onSelectionChange }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialSelectedIndex);

    useEffect(() => {
        const index = items.length > 1 ? 1 : 0;
        setSelectedIndex(index);
    }, [items]);

    const [baseMargin, setBaseMargin] = React.useState<number>();
    const timelineRef = useRef(null);

    const ITEM_WIDTH = 100;

    useEffect(() => {
        if (timelineRef.current) {
            const width = timelineRef.current.offsetWidth;

            setBaseMargin(width / 2 - ITEM_WIDTH / 2);
        }
    }, [timelineRef]);

    const onClick = (index) => {
        if (index !== selectedIndex && selectable) {
            onSelectionChange(index, selectedIndex);
            setSelectedIndex(index);
        }
    };

    return (
        <TimelineContainer ref={timelineRef} marginLeft={baseMargin - (ITEM_WIDTH * selectedIndex)}>
            {
                items.map((item, index) => (
                    <TimelineItem
                        key={item.id}
                        onClick={() => onClick(index)}
                        width={ITEM_WIDTH}
                        active={index === selectedIndex}
                    >
                        <div>
                            <h3>{item.homeTeam}</h3>
                            <span>vs</span>
                            <h3>{item.awayTeam}</h3>
                            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <img src={'/teams/default.webp'} />
                            </div> */}
                        </div>
                        <span>{item.ground}</span>
                    </TimelineItem>
                ))
            }
        </TimelineContainer>
    );
};
