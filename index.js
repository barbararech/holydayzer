import express from 'express';
import cors from 'cors';

const server = express();
server.listen(5000);
server.use(cors());

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

// holidays
const hoje = new Date().toLocaleDateString();

server.get("/holidays", (req, res) => {
    res.send(holidays);
})

// is-today-holiday
const dates = holidays.map((holiday) => holiday.date);
const datesName = holidays.map((holiday) => holiday.name);
let index = 0;

server.get("/is-today-holiday", (req, res) => {

    if(dates.includes(hoje)){
        index = dates.indexOf(hoje);
        res.send(`Sim, hoje é ${datesName[index]}`);
    } else{
        res.send("Não, hoje não é feriado");
    }
})

// Bônus
server.get('/holidays/:idHoliday', (req, res) => {
    const id = req.params.idHoliday;
    let monthHolidays = [];

    for(let i=0;i<dates.length;i++){
        if(parseInt(id)<10){
            if(id[0] === dates[i][0] && dates[i][1] === "/"){
                monthHolidays.push(holidays[i]);
            }
        }else if(id[0] === dates[i][0] && id[1] === dates[i][1]){
            monthHolidays.push(holidays[i]);
        }
    }

    if(parseInt(id)>12 || parseInt(id)===0){
        return res.send("Mês inválido!");
    } else if(monthHolidays.length === 0){
        return res.send("Não há feriados neste mês!");
    }    

    res.send(monthHolidays);
  });
