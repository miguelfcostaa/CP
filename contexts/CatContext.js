import React, { createContext, useState, useContext } from 'react';

const CatContext = createContext();

export const CatProvider = ({ children }) => {
    const [happiness, setHappiness] = useState(0);
    const [hungry, setHungry] = useState(0);
    const [isDirty, setIsDirty] = useState(false);
    const [isEating, setIsEating] = useState(false);

    const [color, setColor] = useState("")
    const [clothing, setClothing] = useState()
    const [bow, setBow] = useState()
    const [glasses, setGlasses] = useState()
    const [locked, setLocked] = useState([])


    if (hungry > 100) {
        setHungry(100);
    }

    if (happiness > 100) {
        setHappiness(100);
    }

    return (
        <CatContext.Provider value={{ 
            happiness, 
            setHappiness, 
            hungry, 
            setHungry, 
            isDirty, 
            setIsDirty, 
            isEating, 
            setIsEating,
            color,
            setColor,
            clothing,
            setClothing,
            bow,
            setBow,
            glasses,
            setGlasses,
            locked,
            setLocked,
        }}>
            {children}
        </CatContext.Provider>
    );
};


export const useCat = () => useContext(CatContext);