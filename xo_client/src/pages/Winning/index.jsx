import Confetti from 'react-confetti';
import styles from './style.module.scss';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store';
import Frame from '../../components/Frame';
import X_index from '../../components/XO/X_index';
import O_index from '../../components/XO/O_index';

export default function Winning() {
  const nav = useNavigate();
  const { game } = useGameStore(state => ({ game: state.game }));
  const { restartGame } = useGameStore();

  const restart = () => {
    restartGame();
    nav('/game');
  };

  return (
    <div className={styles.winning}>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <h2>{game.winner === "Draw" ? "Draw!" : `${game.winner} wins!`}</h2>
      <Frame>
        <div className={styles.board}>
          {game.board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.board_row}>
              {row.map((cell, cellIndex) => (
                <Frame key={cellIndex}>
                  <div className={cell.isWin ? styles.square_frame : styles.gray}>
                    {cell.value === "X" ? <X_index isActive={cell.isWin? cell.isWin: false} /> :
                     cell.value === "O" ? <O_index isActive={cell.isWin? cell.isWin: false} /> : ""}
                  </div>
                </Frame>
              ))}
            </div>
          ))}
        </div>
      </Frame>
      <Button handleClick={restart}>Play Again</Button>
      <Button handleClick={() => nav('/menu')}>Back to Menu</Button>
    </div>
  );
}