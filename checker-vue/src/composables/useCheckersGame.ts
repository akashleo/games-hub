import { ref, computed, reactive } from 'vue'

export interface Piece {
  color: 'red' | 'black'
  isKing: boolean
}

export interface Square {
  row: number
  col: number
}

export interface Move {
  row: number
  col: number
  isCapture?: boolean
  capturedPieces?: Square[]
}

export function useCheckersGame() {
  // Game state
  const board = ref<(Piece | null)[][]>([])
  const currentPlayer = ref<'red' | 'black'>('black')
  const selectedSquare = ref<Square | null>(null)
  const validMoves = ref<Move[]>([])
  const mustCaptureSquares = ref<Square[]>([])
  const gameWinner = ref<string | null>(null)
  const gameStatus = ref<string>('')

  // Initialize the board
  const initializeBoard = () => {
    const newBoard: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null))
    
    // Place black pieces (top 3 rows, dark squares only)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          newBoard[row][col] = { color: 'black', isKing: false }
        }
      }
    }
    
    // Place red pieces (bottom 3 rows, dark squares only)
    for (let row = 5; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          newBoard[row][col] = { color: 'red', isKing: false }
        }
      }
    }
    
    board.value = newBoard
  }

  // Check if a square is valid (on board and dark)
  const isValidSquare = (row: number, col: number): boolean => {
    return row >= 0 && row < 8 && col >= 0 && col < 8 && (row + col) % 2 === 1
  }

  // Check if a square is empty
  const isEmpty = (row: number, col: number): boolean => {
    return isValidSquare(row, col) && board.value[row][col] === null
  }

  // Get piece at square
  const getPiece = (row: number, col: number): Piece | null => {
    if (!isValidSquare(row, col)) return null
    return board.value[row][col]
  }

  // Get possible moves for a piece (without considering captures)
  const getPossibleMoves = (row: number, col: number): Move[] => {
    const piece = getPiece(row, col)
    if (!piece) return []

    const moves: Move[] = []
    const directions = piece.isKing ? 
      [[-1, -1], [-1, 1], [1, -1], [1, 1]] : // Kings can move in all directions
      piece.color === 'black' ? 
        [[1, -1], [1, 1]] : // Black pieces move down
        [[-1, -1], [-1, 1]]   // Red pieces move up

    for (const [rowDir, colDir] of directions) {
      const newRow = row + rowDir
      const newCol = col + colDir

      if (isEmpty(newRow, newCol)) {
        moves.push({ row: newRow, col: newCol })
      }
    }

    return moves
  }

  // Get possible captures for a piece
  const getPossibleCaptures = (row: number, col: number, visited: Set<string> = new Set()): Move[] => {
    const piece = getPiece(row, col)
    if (!piece) return []

    const captures: Move[] = []
    const directions = piece.isKing ? 
      [[-1, -1], [-1, 1], [1, -1], [1, 1]] : // Kings can capture in all directions
      piece.color === 'black' ? 
        [[1, -1], [1, 1]] : // Black pieces move down
        [[-1, -1], [-1, 1]]   // Red pieces move up

    for (const [rowDir, colDir] of directions) {
      const captureRow = row + rowDir
      const captureCol = col + colDir
      const landingRow = row + (rowDir * 2)
      const landingCol = col + (colDir * 2)

      const capturedPiece = getPiece(captureRow, captureCol)
      
      if (capturedPiece && 
          capturedPiece.color !== piece.color && 
          isEmpty(landingRow, landingCol) &&
          !visited.has(`${captureRow}-${captureCol}`)) {
        
        // This is a valid capture
        const capturedPieces = [{ row: captureRow, col: captureCol }]
        
        // Check for additional captures from the landing position
        const visitedCopy = new Set(visited)
        visitedCopy.add(`${captureRow}-${captureCol}`)
        
        // Temporarily place the piece at the landing position to check for more captures
        const originalPiece = board.value[row][col]
        const originalCaptured = board.value[captureRow][captureCol]
        
        board.value[row][col] = null
        board.value[captureRow][captureCol] = null
        board.value[landingRow][landingCol] = originalPiece
        
        const additionalCaptures = getPossibleCaptures(landingRow, landingCol, visitedCopy)
        
        // Restore the board
        board.value[row][col] = originalPiece
        board.value[captureRow][captureCol] = originalCaptured
        board.value[landingRow][landingCol] = null
        
        if (additionalCaptures.length > 0) {
          // Add moves that include the additional captures
          for (const additionalCapture of additionalCaptures) {
            captures.push({
              row: additionalCapture.row,
              col: additionalCapture.col,
              isCapture: true,
              capturedPieces: [...capturedPieces, ...(additionalCapture.capturedPieces || [])]
            })
          }
        } else {
          // Just this single capture
          captures.push({
            row: landingRow,
            col: landingCol,
            isCapture: true,
            capturedPieces
          })
        }
      }
    }

    return captures
  }

  // Check if any captures are available for the current player
  const getAvailableCaptures = (): { squares: Square[], captures: Move[] } => {
    const squares: Square[] = []
    const allCaptures: Move[] = []

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = getPiece(row, col)
        if (piece && piece.color === currentPlayer.value) {
          const captures = getPossibleCaptures(row, col)
          if (captures.length > 0) {
            squares.push({ row, col })
            allCaptures.push(...captures)
          }
        }
      }
    }

    return { squares, captures: allCaptures }
  }

  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    if (gameWinner.value) return

    const piece = getPiece(row, col)
    
    // If clicking on a piece of the current player
    if (piece && piece.color === currentPlayer.value) {
      // Check if captures are mandatory
      const { squares: captureSquares } = getAvailableCaptures()
      
      if (captureSquares.length > 0 && !captureSquares.some(s => s.row === row && s.col === col)) {
        gameStatus.value = 'You must capture when possible!'
        return
      }
      
      selectedSquare.value = { row, col }
      
      // Get available moves for this piece
      const captures = getPossibleCaptures(row, col)
      const regularMoves = captures.length > 0 ? [] : getPossibleMoves(row, col)
      
      validMoves.value = [...captures, ...regularMoves]
      mustCaptureSquares.value = captureSquares
      gameStatus.value = ''
      return
    }
    
    // If no piece is selected, do nothing
    if (!selectedSquare.value) return
    
    // Check if this is a valid move
    const move = validMoves.value.find(m => m.row === row && m.col === col)
    if (!move) return
    
    // Execute the move
    executeMove(selectedSquare.value, move)
  }

  // Execute a move
  const executeMove = (from: Square, move: Move) => {
    const piece = getPiece(from.row, from.col)
    if (!piece) return

    // Move the piece
    board.value[from.row][from.col] = null
    board.value[move.row][move.col] = piece

    // Handle captures
    if (move.isCapture && move.capturedPieces) {
      for (const captured of move.capturedPieces) {
        board.value[captured.row][captured.col] = null
      }
    }

    // Check for king promotion
    if (!piece.isKing) {
      if ((piece.color === 'black' && move.row === 7) || 
          (piece.color === 'red' && move.row === 0)) {
        piece.isKing = true
      }
    }

    // Clear selection and valid moves
    selectedSquare.value = null
    validMoves.value = []
    mustCaptureSquares.value = []
    gameStatus.value = ''

    // Check for additional captures with the same piece
    if (move.isCapture) {
      const additionalCaptures = getPossibleCaptures(move.row, move.col)
      if (additionalCaptures.length > 0) {
        selectedSquare.value = { row: move.row, col: move.col }
        validMoves.value = additionalCaptures
        gameStatus.value = 'Continue capturing!'
        return
      }
    }

    // Switch players
    currentPlayer.value = currentPlayer.value === 'red' ? 'black' : 'red'
    
    // Check for game over
    checkGameOver()
  }

  // Check if the game is over
  const checkGameOver = () => {
    const { squares: captureSquares } = getAvailableCaptures()
    let hasValidMoves = captureSquares.length > 0

    if (!hasValidMoves) {
      // Check for regular moves
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = getPiece(row, col)
          if (piece && piece.color === currentPlayer.value) {
            const moves = getPossibleMoves(row, col)
            if (moves.length > 0) {
              hasValidMoves = true
              break
            }
          }
        }
        if (hasValidMoves) break
      }
    }

    if (!hasValidMoves || redPieces.value === 0 || blackPieces.value === 0) {
      const winner = redPieces.value === 0 ? 'Black' : 
                    blackPieces.value === 0 ? 'Red' : 
                    currentPlayer.value === 'red' ? 'Black' : 'Red'
      gameWinner.value = winner
    }
  }

  // Count pieces
  const redPieces = computed(() => {
    let count = 0
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = getPiece(row, col)
        if (piece && piece.color === 'red') count++
      }
    }
    return count
  })

  const blackPieces = computed(() => {
    let count = 0
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = getPiece(row, col)
        if (piece && piece.color === 'black') count++
      }
    }
    return count
  })

  // Reset game
  const resetGame = () => {
    currentPlayer.value = 'black'
    selectedSquare.value = null
    validMoves.value = []
    mustCaptureSquares.value = []
    gameWinner.value = null
    gameStatus.value = ''
    initializeBoard()
  }

  // Initialize the game
  initializeBoard()

  return {
    board,
    currentPlayer,
    selectedSquare,
    validMoves,
    mustCaptureSquares,
    gameWinner,
    gameStatus,
    handleSquareClick,
    resetGame,
    redPieces,
    blackPieces
  }
}