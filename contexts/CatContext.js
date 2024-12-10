import React, { createContext, useState, useContext } from 'react';

const CatContext = createContext();

export const CatProvider = ({ children }) => {
    const [happiness, setHappiness] = useState(0);
    const [hungry, setHungry] = useState(0);
    const [isDirty, setIsDirty] = useState(true);
    const [isEating, setIsEating] = useState(false);

    if (hungry > 100) {
        setHungry(100);
    }

    if (happiness > 100) {
        setHappiness(100);
    }

    return (
        <CatContext.Provider value={{ happiness, setHappiness, hungry, setHungry, isDirty, setIsDirty, isEating, setIsEating }}>
            {children}
        </CatContext.Provider>
    );
};


export const useCat = () => useContext(CatContext);