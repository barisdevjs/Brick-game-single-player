import Brick from "./brick.js"


export  function buildLevel(game, level) { // we are taking the brick constructor elements  ==>  game` and `level`
    
    let bricks = []
    
    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick === 1) {
                let position = {
                    x: 50 * brickIndex,
                    y: 70 + 24 * rowIndex
                }
                bricks.push(new Brick(game, position))
            }
        })
    })
    return bricks
}

export const level1 = [
    [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1,1], 
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0,1]
    
    
]

export const level2 = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
    Array.from({ length: 16 }, () => 1 * Math.random() > 0.5 ? 1 : 0)
]