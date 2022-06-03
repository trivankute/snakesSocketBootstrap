const {GRID_SIZE} = require('./constants')

function createGameState()
{
    return {
        players: [{
            pos:{
                x:3,y:10
            },
            vel:{
                x:1,y:0
            },
            snake:[
                {x:1,y:10},{x:2,y:10},{x:3,y:10}
            ]
        },
        {
            pos:{
                x:18,y:10
            },
            vel:{
                x:-1,y:0
            },
            snake:[
                {x: 20, y: 10},
                {x: 19, y: 10},
                {x: 18, y: 10},
                ]
        }
    ],
        food:{
        },
        gridSize:GRID_SIZE
    }
}

function gameLoop(state){
    if(!state)
    {
        return
    }
    const playerOne = state.players[0]
    const playerTwo = state.players[1]

    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;

    playerTwo.pos.x += playerTwo.vel.x;
    playerTwo.pos.y += playerTwo.vel.y;

    if(playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE ||
        playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE)
        {
            return 2;
        }
    
    if(playerTwo.pos.x < 0 || playerTwo.pos.x > GRID_SIZE ||
        playerTwo.pos.y < 0 || playerTwo.pos.y > GRID_SIZE)
        {
            return 1;
        }
    
    if(state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y)
    {
        playerOne.snake.push({ ...playerOne.pos })
        playerOne.pos.x += playerOne.vel.x
        playerOne.pos.y += playerOne.vel.y
        randomFood(state);
    }

    if(state.food.x === playerTwo.pos.x && state.food.y === playerTwo.pos.y)
    {
        playerTwo.snake.push({ ...playerTwo.pos })
        playerTwo.pos.x += playerTwo.vel.x
        playerTwo.pos.y += playerTwo.vel.y
        randomFood(state);
    }


    if(playerOne.vel.x || playerOne.vel.y)
    {
        for(let cell of playerOne.snake)
        {
            if(cell.x === playerOne.pos.x && cell.y === playerOne.pos.y)
                return 2;
        }
        // push object vao la co cai dia. chi? trong do ay
        playerOne.snake.push({ ...playerOne.pos });
        playerOne.snake.shift()
    }

    if(playerTwo.vel.x || playerTwo.vel.y)
    {
        for(let cell of playerTwo.snake)
        {
            if(cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y)
                return 1;
        }
        // push object vao la co cai dia. chi? trong do ay
        playerTwo.snake.push({ ...playerTwo.pos });
        playerTwo.snake.shift()
    }

    return false;
}

function randomFood(state)
{
    food = {x:Math.floor(Math.random()*GRID_SIZE), y:Math.floor(Math.random()*GRID_SIZE)}

    for(let cell0 of state.players[0].snake)
    {
        if(cell0.x === food.x && cell0.y === food.y )
            randomFood(state)
        else
            state.food = food
    }
    for(let cell1 of state.players[1].snake)
        {
            if( cell1.x === food.x && cell1.y === food.y)
                randomFood(state)
            else
                state.food = food
        }
    
}

function getUpdatedVelocity(key,vel)
{
    if(key==='w' && vel.y != 1 && vel.x != 0) {vel.y = -1,vel.x = 0}
    if(key==='s' && vel.y != -1 &&vel.x != 0) {vel.y = 1,vel.x = 0}
    if(key==='a' && vel.x != 1 && vel.y != 0) {vel.x = -1,vel.y = 0}
    if(key==='d'&& vel.x != -1 && vel.y != 0) {vel.x = 1,vel.y = 0}
}

function initGame()
{
    const state = createGameState()
    randomFood(state)
    return state
}
module.exports = {
    initGame,
    gameLoop,
    getUpdatedVelocity
}