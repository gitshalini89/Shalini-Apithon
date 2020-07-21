import fetch from 'isomorphic-fetch';


export async function getaccesstoken() {
    try {
        const clientid = 'jf9K_-Lr__HjaqsXiE3J5pEM-kI3C7iVTkLaZ7b_qZU='
        const clientsecret = 'IQD1pi0UnSz4dHBgfyUGtPtJg2rzClVki0thIhrSDi0='
        const requestoptions = {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            body: 'grant_type=client_credentials&client_id='+clientid+'&client_secret='+clientsecret+'&scope=accounts',
            headers: {
                'Accept' : '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Connection': 'keep-alive'
            }
        }

        await fetch('https://ob.natwest.useinfinite.io/token', requestoptions)
            .then(response => response.json())
            .then(function(data) {
                    const token = data.access_token;
                    postAccountRequest(clientid, token);
                })
            ;

        return items;

    }
    catch (err) {
        return err;
    }
}

export async function postAccountRequest(clientid, token) {

    try {

        const auth = 'Bearer ' + token;

        const accountreqbody = {
            "Data": {
            "Permissions": [
                "ReadAccountsDetail",
                "ReadBalances",
                "ReadTransactionsCredits",
                "ReadTransactionsDebits",
                "ReadDirectDebits",
                "ReadTransactionsDetail",
                "ReadBeneficiariesDetail",
                "ReadStandingOrdersDetail",
                "ReadScheduledPaymentsDetail",
                "ReadProducts"
            ]
            },
            "Risk": {}
        }

        const acctreqoptions = {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(accountreqbody),
            headers: {
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        }


        await fetch('https://ob.natwest.useinfinite.io/open-banking/v3.1/aisp/account-access-consents', acctreqoptions)
            .then(acctauthresponse => acctauthresponse.json())
            .then(function(acctauthdata) {
                    const consent_id = acctauthdata.Data.ConsentId;
                    GetAccountConsent(clientid, consent_id);
                })
            ;

        return items;

    }
    catch (err) {
        return err;
    }
}

export async function GetAccountConsent(clientid, consent_id) {

    try {
        const acctbaseurl = 'https://api.natwest.useinfinite.io/authorize';
        const encodedRedirectUrl = 'https%3A%2F%2zforceapithon1.netlify.app%2Fonboarding';
        //const domain = '9c2a361b-8e35-43ff-b2d0-17b70bfa3864.example.org';
        const query = '?client_id='+clientid+'&response_type=code id_token&scope=openid accounts&redirect_uri='+encodedRedirectUrl+'&state=ABC&request='+consent_id;
        const authorizeurl = acctbaseurl + query;
        window.location = authorizeurl;
    }
    catch (err) {
        return err;
    }
}
