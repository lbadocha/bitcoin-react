import React from 'react';

const CryptoList = props => {
   
    let cryptoList = props.cryptoArray.map(crypto=>{
        return <li key={crypto.currency}>Last rate: <span className={crypto.class}>{crypto.last}</span> {crypto.currency} {crypto.symbol}</li>;
    });

    return (
        <ul className="crypto-list">
            {cryptoList}
        </ul>
    );
}

export default CryptoList;