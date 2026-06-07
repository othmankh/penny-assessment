import { useEffect } from 'react';
import { GameOver } from '@/components/game/GameOver';
import { GameScreen } from '@/components/screens/GameScreen';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { GameStatus } from '@/game/models/GameState';
import { useGameStore } from '@/store/useGameStore';

export function App() {
  const {
    currentHand,
    status,
    score,
    history,
    drawPile,
    discardPile,
    reshuffleCount,
    gameOverReason,
    leaderboard,
    startGame,
    placeBet,
    exitGame,
    loadLeaderboard,
  } = useGameStore();

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  if (status === GameStatus.Idle) {
    return <LandingScreen leaderboard={leaderboard} onStartGame={startGame} />;
  }

  if (status === GameStatus.GameOver) {
    return (
      <main className="flex min-h-screen items-center px-6">
        <GameOver score={score} rounds={history.length} reason={gameOverReason} onRestart={startGame} onExit={exitGame} />
      </main>
    );
  }

  return (
    <GameScreen
      score={score}
      currentHand={currentHand}
      history={history}
      drawPileCount={drawPile.length}
      discardPileCount={discardPile.length}
      reshuffleCount={reshuffleCount}
      onBet={placeBet}
      onExit={exitGame}
    />
  );
}
