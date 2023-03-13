const inputElem = document.querySelector('#input');
const btnElem = document.querySelector('#getCfg');

let addreses = [
    {isp: 'Irancell', ip: 'irc.nazsuk.ga'},
    {isp: 'Hamrah Aval', ip: 'mci.nazsuk.ga'},
    {isp: 'ADSL', ip: 'adsl.nazsuk.ga'}
]

// Random String generator
let makeid = (length)=> {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

let fixedCfg = [];

btnElem.addEventListener('click', ()=> {
    let userCfg = inputElem.value;
    try {
        let cfgObj = JSON.parse(atob(userCfg.trim().substring(8)));
        addreses.forEach(adds => {
            let tempObj = { ...cfgObj };
            tempObj.ps = `${tempObj.ps} [${adds.isp}]`;
            tempObj.add = adds.ip;
            tempObj.host = `${makeid(8)}.nazsuk.ga`;
            tempObj.sni = '';
            fixedCfg.push(tempObj);
            tempObj = '';
            console.log(fixedCfg);
        });
    
        let fixedCfgText = '';
        fixedCfg.forEach(cfg => {
            fixedCfgText += `vmess://${btoa(JSON.stringify(cfg))}\n\n`;
        });
        navigator.clipboard.writeText(fixedCfgText).then(()=> {
            alert("کانفیگ ها با موفقیت در کلیپ بورد ذخیره شدند.")
        })
    
        fixedCfg = [];
        fixedCfgText = '';    
    } catch (error) {
        console.log(error);
        alert("عملیات موفق نبود، به نظر میرسد لینکی که وارد کرده اید ناقص یا اشتباه است.")
    }
});