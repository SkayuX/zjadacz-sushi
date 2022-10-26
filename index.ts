import axios from 'axios';

let api_link: string = "https://workers.ssum.dev/api/v1/contact";

const repeat_times: number = 50

class Functions {
    constructor() {}

    randomString = (length: number) => {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
    }
}

const f = new Functions();

for (let i = 0; i < repeat_times; i++) {

    const email = f.randomString(10);
    const fullName = f.randomString(20)
    const message = f.randomString(1000)

    axios.post(api_link, {
        "email": `${email}@example.com`,
        "fullName": fullName,
        "message": message
    }).then(response => {

        const data = response.data;

        if (data.code === 429) {
            setTimeout(() => {
                console.log("ratelimit timeout")
            }, 10000)
        }
 
        console.log(`Wysłano ${i + 1} raz`)
    }).catch(error => {
	console.log(error)
    })
}

console.log("Zakończono wysyłanie")