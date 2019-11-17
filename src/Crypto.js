import React, { Component } from 'react';

import CryptoList from './CryptoList';

import axios from 'axios';

class Crypto extends Component {

    constructor() {
        super();

        this.state = {
            cryptoArray: [],
            filteredCryptoArray: []
        }
    }

    getCryptoData = () => {
        axios.get(`https://blockchain.info/pl/ticker`)
            .then(res => {
                const crypto = res.data;
                let convertedCryptoArray = [];
                let i = 0;

                for (let key in crypto) {
                    let newCryptoObj = crypto[key];
                    let prevCryptoObj = this.state.cryptoArray[i];

                    if(prevCryptoObj !== undefined) {

                        if(prevCryptoObj.last>newCryptoObj.last) {
                            newCryptoObj.class = 'red';
                        } else if(prevCryptoObj.last<newCryptoObj.last) {
                            newCryptoObj.class = 'green';
                        } else {
                            newCryptoObj.class = 'blue';
                        }

                    } else {
                        newCryptoObj.class = 'blue';
                    }
                    


                    newCryptoObj.currency = key;
                    convertedCryptoArray.push(newCryptoObj);
                    i++;
                }

                this.setState({cryptoArray:convertedCryptoArray ,filteredCryptoArray: convertedCryptoArray });
                this.filterCrypto();
            });
    }



    filterCrypto = () => {
        let trimValue = this.filterInput.value.trim().toUpperCase();
        let currentCrypto = this.state.cryptoArray;

        let filteredCrypto = currentCrypto.filter(crypto=>{
            return crypto.currency.includes(trimValue);
        });
        
        this.setState({filteredCryptoArray: filteredCrypto})
    }

    

    componentDidMount() {
        this.getCryptoData();
        setInterval(() => { this.getCryptoData() }, 5000);
    }


    render() {
        return (
            <div className="crypto">
                <input type="text" onChange={this.filterCrypto} ref={ input=> this.filterInput = input } />
                <CryptoList cryptoArray={this.state.filteredCryptoArray}  />
            </div>
        );
    }
}

export default Crypto;