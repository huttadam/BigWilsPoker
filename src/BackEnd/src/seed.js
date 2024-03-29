import { dbClose } from './db.js';
import  playerModel from './models/playerModel.js'
import gameModel from './models/GameModel.js';


const playersArr = [
    { f_name: "Nathan", l_name: "Wilson", n_name: "Big Wils", password: "password123", mobile: "0411222333", admin: true },
    { f_name: "Player1", l_name: "one", n_name: "p1", mobile: "0411111111", gamesPlayed: 10, wins: 3, seconds: 1, quadWins: 1},
    { f_name: "Player2", l_name: "two", n_name: "p2", mobile: "0422222222", gamesPlayed: 10, wins: 5, seconds: 2, quadWins: 0},
    { f_name: "Player3", l_name: "three", n_name: "p3", mobile: "0433333333", gamesPlayed: 15, wins: 1,seconds: 6, quadWins: 0},
    { f_name: "Player4", l_name: "four", n_name: "p4", mobile: "0444444444", gamesPlayed: 15, wins:4, seconds: 6, quadWins: 0},
    { f_name: "Player5", l_name: "five", n_name: "p5", mobile: "0455555555", gamesPlayed: 6, wins: 2, seconds: 7, quadWins:2 },
    { f_name: "Player6", l_name: "six", n_name: "p6", mobile: "0466666666" , gamesPlayed: 12, wins: 0, seconds: 2,quadWins: 0},
    { f_name: "Player7", l_name: "seven", n_name: "p7", mobile: "0477777777", gamesPlayed: 3, wins:1, seconds:1, quadWins:0},
    { f_name: "Player8", l_name: "eight", n_name: "p8", mobile: "0488888888" , gamesPlayed: 4, wins: 1, seconds: 0, quadWins: 1},
    { f_name: "Player9", l_name: "nine", n_name: "p9", mobile: "0499999999" , gamesPlayed: 5, wins: 0, seconds:0, quadWins: 0},
    { f_name: "Player10", l_name: "ten", n_name: "p10", mobile: "0410101010" , gamesPlayed: 2, wins:1, seconds:4, quadWins:0},
    { f_name: "Player11", l_name: "eleven", n_name: "p11", mobile: "0411111112", gamesPlayed: 3, wins: 2, seconds: 2, quadWins:0},
    { f_name: "Player12", l_name: "twelve", n_name: "p12", mobile: "0412121212", gamesPlayed: 1, wins: 1, seconds: 1, quadWins: 1}
];

await playerModel.deleteMany()
console.log('Players deleted')
const insertedPlayers = await playerModel.insertMany(playersArr)
console.log('Players Added')

const games = [
    {
        date: "2024/06/28" ,
        playersPlaying:[insertedPlayers[12],insertedPlayers[11],insertedPlayers[10],insertedPlayers[9],insertedPlayers[8],insertedPlayers[5],insertedPlayers[6],insertedPlayers[7]],
        isFinished: false,
},
    {
        date: "2024/05/28" ,
        playersPlaying:[insertedPlayers[4],insertedPlayers[5],insertedPlayers[6],insertedPlayers[7],insertedPlayers[8],insertedPlayers[9],insertedPlayers[10],insertedPlayers[11]],
        isFinished: false,
},

    {
    date: "2024/04/28" ,
    playersPlaying:[insertedPlayers[0],insertedPlayers[1],insertedPlayers[2],insertedPlayers[3],insertedPlayers[4],insertedPlayers[5],insertedPlayers[6],insertedPlayers[7]],
    isFinished: true,
    winner: insertedPlayers[0],
    runnerUp:insertedPlayers[1],
    firstEliminated:insertedPlayers[6],
    secondEliminated: insertedPlayers[7]
},
    {
    date: "2024/03/28",
    playersPlaying:[insertedPlayers[1],insertedPlayers[8],insertedPlayers[2],insertedPlayers[6],insertedPlayers[4],insertedPlayers[5],insertedPlayers[10],insertedPlayers[11]],
    isFinished: true,
    winner: insertedPlayers[4],
    runnerUp:insertedPlayers[1],
    firstEliminated:insertedPlayers[5],
    secondEliminated: insertedPlayers[11]
},
    {
    date: "2024/02/28",
    playersPlaying:[insertedPlayers[4], insertedPlayers[6], insertedPlayers[8], insertedPlayers[10], insertedPlayers[5], insertedPlayers[2],insertedPlayers[9], insertedPlayers[7]],
    isFinished: true, 
    winner: insertedPlayers[8],
    runnerUp:insertedPlayers[4],
    firstEliminated:insertedPlayers[6],
    secondEliminated: insertedPlayers[10]
}
];

await gameModel.deleteMany()
console.log('Games deleted')
await gameModel.insertMany(games)
console.log('Games Added')



dbClose()