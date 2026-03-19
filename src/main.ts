import { AiAlphaBeta } from "./game/ai_alphabeta";
import { AiMinMax } from "./game/ai_minmax";
import { GameManager } from "./game/board";

const boardEl = document.getElementById("cells") as HTMLDivElement | null;

if (boardEl) {
  initGamePage();
}

function initGamePage() {
  const params = new URLSearchParams(window.location.search);

  const cellsParam = Number(params.get("cells"));
  const cells =
    Number.isInteger(cellsParam) && cellsParam >= 15 && cellsParam <= 25
      ? cellsParam
      : 15;

  const starter = params.get("starter") === "ai" ? "ai" : "human";
  const algorithm =
    params.get("algorithm") === "alphabeta" ? "alphabeta" : "minimax";

  const aiFirst = starter === "ai";
  const ai =
    algorithm === "alphabeta" ? new AiAlphaBeta() : new AiMinMax();

  const manager = new GameManager(cells, aiFirst, ai);

  const bankScoreEl = document.getElementById("bankScore") as HTMLSpanElement;
  const totalScoreEl = document.getElementById("totalScore") as HTMLSpanElement;
  const currentTurnEl = document.getElementById("currentTurn") as HTMLSpanElement;
  const nextInlineEl = document.getElementById("nextInline") as HTMLSpanElement;
  const startFirstEl = document.getElementById("startFirst") as HTMLSpanElement;
  const startSecondEl = document.getElementById("startSecond") as HTMLSpanElement;
  const gameMessageEl = document.getElementById("gameMessage") as HTMLParagraphElement;

  function isAiTurn(): boolean {
    return (
      (manager.aiFirst && manager.turn % 2 === 1) ||
      (!manager.aiFirst && manager.turn % 2 === 0)
    );
  }

  function currentPlayerLabel(): string {
    return isAiTurn() ? "Computer" : "Human";
  }

  function nextPlayerLabel(): string {
    return isAiTurn() ? "Human" : "Computer";
  }

  function renderStatus() {
    bankScoreEl.textContent = String(manager.bank);
    totalScoreEl.textContent = String(manager.points);
    currentTurnEl.textContent = currentPlayerLabel();
    nextInlineEl.textContent = nextPlayerLabel();

    startFirstEl.textContent = manager.aiFirst ? "" : "*";
    startSecondEl.textContent = manager.aiFirst ? "*" : "";
  }

  function renderBoard() {
    boardEl.innerHTML = "";

    manager.board.forEach((num, index) => {
      const cellBtn = document.createElement("button");
      cellBtn.className = "cell";
      cellBtn.textContent = String(num);

      const canClick =
        !isAiTurn() &&
        manager.isEnd() === false &&
        index < manager.boardLength - 1;

      cellBtn.disabled = !canClick;
      cellBtn.style.cursor = canClick ? "pointer" : "default";
      cellBtn.title =
        index < manager.boardLength - 1
          ? `Use pair ${manager.board[index]} and ${manager.board[index + 1]}`
          : "Last cell cannot be selected";

      cellBtn.addEventListener("click", () => {
        if (!canClick) return;

        manager.replace(index);
        renderAll();

        if (showEndIfNeeded()) return;

        if (isAiTurn()) {
          window.setTimeout(() => {
            manager.tick();
            renderAll();
            showEndIfNeeded();
          }, 250);
        }
      });

      boardEl.appendChild(cellBtn);
    });
  }

  function showEndIfNeeded(): boolean {
    const endState = manager.isEnd();

    if (endState === false) {
      gameMessageEl.textContent = "";
      return false;
    }

    if (endState === "AI_WIN") {
      gameMessageEl.textContent = "Game over: Computer wins!";
    } else if (endState === "USER_WIN") {
      gameMessageEl.textContent = "Game over: Human wins!";
    } else {
      gameMessageEl.textContent = "Game over: Draw!";
    }

    return true;
  }

  function renderAll() {
    renderStatus();
    renderBoard();
  }

  renderAll();

  if (isAiTurn()) {
    window.setTimeout(() => {
      manager.tick();
      renderAll();
      showEndIfNeeded();
    }, 250);
  }
}