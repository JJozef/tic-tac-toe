/* eslint-disable multiline-ternary */
'use client'
import { useState } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { calculateWinner } from './components/CalculateWinner'
import WinnerShow from './components/WinnerAlert'
import Square from './components/Square'
import FooterPage from './components/Footer'

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [startPlayer, setStartPlayer] = useState(null)

  function handleClick(i) {
    const newBoard = board.slice()
    if (winner || newBoard[i]) {
      return
    }
    newBoard[i] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)
    setWinner(calculateWinner(newBoard))
  }

  function handleReset() {
    setBoard(Array(9).fill(null))
    setXIsNext(startPlayer === 'X')
    setWinner(null)
  }

  function handleSelectPlayer() {
    setStartPlayer(null)
    handleReset()
  }

  function handleSelectStart(player) {
    setStartPlayer(player)
    handleReset()
    setXIsNext(player === 'X')
  }

  function renderSquare(i) {
    return <Square value={board[i]} onClick={() => handleClick(i)} />
  }

  function isBoardFull() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return false
      }
    }
    return true
  }

  let status
  if (winner) {
    status = (
      <WinnerShow
        winner={winner}
        handleReset={handleReset}
        handleSelectPlayer={handleSelectPlayer}
      />
    )
  } else if (isBoardFull()) {
    status = (
      <WinnerShow
        winner='='
        handleReset={handleReset}
        handleSelectPlayer={handleSelectPlayer}
      />
    )
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className='flex flex-col items-center justify-between min-h-screen bg-black bg-opacity-90 text-center'>
      <div className='w-auto mb-5 mt-7'>
        <h1 className='text-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-600 to-orange-600'>
          Tic Tac Toe
        </h1>
      </div>
      <div className=''>
        {startPlayer === null ? (
          <div className='bg-neutral-800 bg-opacity-30 rounded-md px-10 py-10'>
            <h2 className='text-2xl mb-4 text-white uppercase font-medium text-center'>
              Select start Player
            </h2>
            <div className='flex justify-center space-x-4 text-xl'>
              <button
                className='bg-neutral-700 text-white rounded-md px-4 py-2 font-bold'
                onClick={() => handleSelectStart('X')}
              >
                X
              </button>
              <button
                className='bg-neutral-700 text-white rounded-md px-4 py-2 font-bold'
                onClick={() => handleSelectStart('O')}
              >
                O
              </button>
            </div>
          </div>
        ) : (
          <div className='w-auto bg-neutral-800 bg-opacity-30 rounded-md p-8'>
            <div className='font-bold text-2xl mb-4 text-white text-center'>
              {status}
            </div>
            <LazyMotion features={domAnimation}>
              <m.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col space-y-4 justify-center'
                variants={{
                  open: {
                    clipPath: 'inset(0% 0% 0% 0% round 10px)',
                    transition: {
                      type: 'spring',
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                <div className='flex space-x-4 justify-center'>
                  {renderSquare(0)}
                  {renderSquare(1)}
                  {renderSquare(2)}
                </div>
                <div className='flex space-x-4 justify-center'>
                  {renderSquare(3)}
                  {renderSquare(4)}
                  {renderSquare(5)}
                </div>
                <div className='flex space-x-4 justify-center'>
                  {renderSquare(6)}
                  {renderSquare(7)}
                  {renderSquare(8)}
                </div>
              </m.div>
            </LazyMotion>
          </div>
        )}
      </div>
      <FooterPage />
    </div>
  )
}
