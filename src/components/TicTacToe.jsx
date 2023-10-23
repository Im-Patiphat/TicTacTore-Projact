import { useState ,useEffect } from 'react'
import Board from './Board'
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';

// กดหนดผู้เล่น X and O
const PLAYER_X = 'X';
const PLAYER_O = 'O';

const winningCombinations = [
    // เส้นที่ขีดตอนผู้เล่นชนะ
    //row
    {combo: [0,1,2] , strikeClass:"strike-row-1" },
    {combo: [3,4,5] , strikeClass:"strike-row-2" },
    {combo: [6,7,8] , strikeClass:"strike-row-3" },
    //columns
    {combo: [0,3,6] , strikeClass:"strike-column-1" },
    {combo: [1,4,7] , strikeClass:"strike-column-2" },
    {combo: [2,5,8] , strikeClass:"strike-column-3" },
    //diagonals
    {combo: [0,4,8] , strikeClass:"strike-diagonal-1" },
    {combo: [2,4,6] , strikeClass:"strike-diagonal-2" },
    
]; 


const checkWinner = (tiles,setStrikeClass, setGameState) => {
    //เช็คผู้ชนะ โดยใช้ลูป for...of  
    //console.log("check Winner");
    for(const {combo, strikeClass} of winningCombinations){
        //
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];
        if(tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3 ){
            //ตรวจสอบว่า tileValue1 ไม่เท่ากับ null และ ตรวจสอบว่า tileValue1 เท่ากับ tileValue2 และ ตรวจสอบว่า tileValue1 เท่ากับ tileValue3
            //ถ้าทั้งสามเงื่อนไขนี้เป็นจริง ในรอบนี้ของลูป แสดงว่าค่าที่ถูกดึงมาจาก tiles ที่อยู่ที่ combo[0], combo[1], และ combo[2] มีค่าเท่ากันและไม่ใช่ค่าว่าง (null)  
            setStrikeClass(strikeClass);
            if (tileValue1 === PLAYER_X ){
                //เพื่อตรวจสอบว่า tileValue1 เท่ากับ PLAYER_X หรือไม่ ถ้าเป็นเท็จ แสดงว่าผู้เล่น O ชนะ 
                //และรหัสสถานะของเกมถูกตั้งเป็น playerOWins ถ้าเงื่อนไขเป็นจริง แสดงว่าผู้เล่น X ชนะ และรหัสสถานะของเกมถูกตั้งเป็น playerXWins.
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
    //เพื่อตรวจสอบค่า areAllTilesFilledIn ถ้าค่านี้เป็น true คือทุกช่องในตารางถูกกรอกแล้ว แสดงว่าเกมจบเสมอ (draw) 
    if (areAllTilesFilledIn) {
        setGameState(GameState.draw)
    }
}

const TicTacToe = () => {
    const [tiles,setTiles] = useState(Array(9).fill(null));
    const [playerTurn , setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass , setStrikeClass] = useState();
    const [gameState , setGameState] = useState(GameState.inProgress)


    const handleTileClick = (index) => {
        //console.log(index)
        if(gameState !== GameState.inProgress){
            return;
        }

        if (tiles[index] !== null ){
            return;
        }

        const newTile = [...tiles];
        newTile[index] = playerTurn;
        setTiles(newTile);
        if(playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        } else {
            setPlayerTurn(PLAYER_X);
        }
    };
    const handleReset = () => {
        //console.log("reset")
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X)
        setStrikeClass(null)
    };

    useEffect(() => {
        checkWinner(tiles,setStrikeClass, setGameState);
    }, [tiles]);
    
    return (
    <div>
      <h1>Tic Tac Toe</h1>
      
      <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} strikeClass={strikeClass} />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  )
}

export default TicTacToe
