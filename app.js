const request = require('request-json');

function GetTicket(interationNumber) {
    let website = ""
    let eventId = ""
    let websiteUrl = `https://www.${website}.co.za/api/event/${eventId}/resale`
    let client = request.createClient(websiteUrl);
    client.get('', function(err, res, body) {
        switch (res.statusCode) {
            case 200:
                let resaleTickets = ''
                // console.log(body)
                if (body && body.payload.resaleTickets) {
                    resaleTickets = body.payload.resaleTickets
                }
                for(let i = 0; i < resaleTickets.length; i++ )
                {
                    if(resaleTickets[i].name == "General Sale (adult)")
                    {
                        console.log('\u0007');
                        console.log(resaleTickets[i])
                    }
                }
                if(resaleTickets.length > 1)
                {
                    console.log('multiple items');
                    console.log('\u0007');
                    console.log(resaleTickets)
                }
                else{
                    console.log(interationNumber + ' iteration and 0 options');
                }
                break;
            default:
                throw new Error(JSON.stringify(body));
            }
    });
  
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function delayedFetch() {
    let sleepTime = 60000 // 60 seconds
    for(let i = 0; i<100;i++)
    {
        GetTicket(i)
        await sleep(sleepTime);
    }
    console.log('\u0007');
}
  
console.log(`Started`)  
delayedFetch()
