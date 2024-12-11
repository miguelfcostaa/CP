import React, { createContext, useState, useContext } from 'react';

const FishContext = createContext();

export const FishProvider = ({ children }) => {
    const [fish, setFish] = useState(5);

    const addFish = (value) => {
        setFish(fish + value);
    }

    const removeFish = (value) => {
        setFish(fish - value);
    }

    return (
        <FishContext.Provider value={{ fish, setFish, removeFish, addFish }}>
            {children}
        </FishContext.Provider>
    );
};


export const useFish = () => useContext(FishContext);