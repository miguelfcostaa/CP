import React, { createContext, useState, useContext } from 'react';

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
    const [coins, setCoins] = useState(200);

    const addCoin = (value) => {
        setCoins(coins + value);
    }

    const removeCoin = (value) => {
        setCoins(coins - value);
    }

    return (
        <CoinContext.Provider value={{ coins, setCoins, removeCoin, addCoin }}>
            {children}
        </CoinContext.Provider>
    );
};


export const useCoin = () => useContext(CoinContext);