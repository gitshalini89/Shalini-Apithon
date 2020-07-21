import fetch from 'isomorphic-fetch';


export async function getapitoken(acctdata, authcode) {
    try {
        const clientid = 'jf9K_-Lr__HjaqsXiE3J5pEM-kI3C7iVTkLaZ7b_qZU='
        const clientsecret = 'IQD1pi0UnSz4dHBgfyUGtPtJg2rzClVki0thIhrSDi0='
        const x = '5d7a1378-222e-42ab-99e7-041b2b9393ff'
        const redirecturi = 'http%3A%2F%2Flocalhost%3A5000%2Fonboarding'

        const requestoptions = {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            body: 'grant_type=authorization_code&client_id='+clientid+'&client_secret='+clientsecret+'&redirect_uri='+redirecturi+'&code='+authcode,
            headers: {
                'Accept' : '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Connection': 'keep-alive'
            }
        }

        await fetch('https://ob.natwest.useinfinite.io/token', requestoptions)
            .then(response => response.json())
            .then(function(data) {
                    const token =  data.access_token;
                    const monthlyincome = Number(acctdata.totalIncome);
                    const accountdata = {
                        AccountId: x,
                        TotalincomeMon: monthlyincome,
                        bearer: token
                    };
                    getlistAccounts(accountdata, token);

                })
            ;

    }
    catch (err) {
        return err;
    }
}



export async function getlistAccounts(accountdata,token) {

    try {

        const auth = 'Bearer ' + token

        const acctreqoptions = {
            method: 'GET',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        }

        await fetch('https://ob.natwest.useinfinite.io/open-banking/v3.1/aisp/accounts', acctreqoptions)
            .then(acctlistresponse => acctlistresponse.json())
            .then(function(acctlistdata) {
                    const account_id = acctlistdata.Data.Account;
                    postOnboard(accountdata);
            })
            ;
    }
    catch (err) {
        return err;
    }
}

export async function postOnboard(accountdata) {
    try {

        const res = await fetch('https://d52f24be.eu-gb.apigw.appdomain.cloud/addnewreading/entries', {
            method: 'POST',
            body: JSON.stringify(accountdata),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    catch (err) {
        return err;
    }
}
