import { Ai, type AiMove } from "./ai";
import type { GameManager } from "./board";

const MAX_DEPTH = 5; // maksimālais dziļums, līdz kuram izpilda AlphaBeta algoritmu

/**
 * Eksperimentu statistika, kura glabā ģenerēto un novērtēto mezglu skaitu
 */
type SearchStats = {
	generated: number;
	evaluated: number;
}

/**
 * Funkcija, kas nosaka, vai tagad ir MI gājiens
 */
function isAiTurn(manager: GameManager): boolean {
	return (
		(manager.aiFirst && manager.turn % 2 === 1) ||
		(!manager.aiFirst && manager.turn % 2 === 0)
	);
}

/**
 * Vienkārša heuristika, kas novērtē spēles stāvokli.
 * Pozitīvs rezultāts ir labvēlīgs MI, negatīvs - lietotājam.
 */
function heuristic(manager: GameManager): number {
	const pointsGood = manager.points % 2 === 0 ? 1 : -1;
	const bankGood = manager.bank % 2 === 0 ? 1 : -1;
	const favorAi = manager.aiFirst ? 1 : -1;
	return favorAi * (pointsGood + bankGood) * 10;
}

/**
 * Funkcija, kas nosaka, vai spēle ir beigusies un atgriež gala rezultātu.
 * @param depth izmantojam, lai dotu priekšroku ātrākiem uzvaras gājieniem un ilgākiem zaudējuma gājieniem
 */
function terminalScore(manager: GameManager, depth: number): number | null {
	const endState = manager.isEnd();
	if (endState === "AI_WIN") return 1000 - depth;
	if (endState === "USER_WIN") return -1000 + depth;
	if (endState === "DRAW") return 0;

	return null;
}

function alphaBeta(
	manager: GameManager,
	depth: number,
	alpha: number,
	beta: number,
	stats: SearchStats
): number {
	/* 	katru reizi, kad izsauc alphaBeta(), skaitām, ka
		šo virsotni esam novērtējuši */
	stats.evaluated++;

	const end = terminalScore(manager, depth);
	if (end !== null) return end;

	if (depth === 0) return heuristic(manager);

	if (isAiTurn(manager)) {
		let value = -Infinity;
		for (let i = 0; i < manager.boardLength - 1; i++) {
			const simulator = manager.clone();
			simulator.replace(i);

			/* 	katru reizi, kad izveidojam jaunu simulatoru, skaitām, ka
				esam ģenerējuši jaunu mezglu */
			stats.generated++;

			const score = alphaBeta(simulator, depth - 1, alpha, beta, stats);
			value = Math.max(value, score);

			alpha = Math.max(alpha, value);
			if (alpha >= beta) break;
		}

		return value;
	} else {
		let value = Infinity;
		for (let i = 0; i < manager.boardLength - 1; i++) {
			const simulator = manager.clone();
			simulator.replace(i);

			stats.generated++;

			const score = alphaBeta(simulator, depth - 1, alpha, beta, stats);
			value = Math.min(value, score);
			
			beta = Math.min(beta, value);
			if (beta <= alpha) break;
		}

		return value;
	}
}

export class AiAlphaBeta extends Ai {
	generatedNodes = 0;
	evaluatedNodes = 0;
	lastMoveTime = 0;

	evaluate(manager: GameManager): AiMove {
		const stats: SearchStats = { generated: 0, evaluated: 0 };

		const startTime = performance.now();

		let bestIndex = 0;
		let bestScore = -Infinity;

		let alpha = -Infinity;
		let beta = Infinity;

		for (let i = 0; i < manager.boardLength - 1; i++) {
			const simulator = manager.clone();
			simulator.replace(i);

			stats.generated++;

			const score = alphaBeta(simulator, MAX_DEPTH - 1, alpha, beta, stats);

			if (score > bestScore) {
				bestScore = score;
				bestIndex = i;
			}

			alpha = Math.max(alpha, bestScore);
		}

		this.generatedNodes = stats.generated;
		this.evaluatedNodes = stats.evaluated;

		this.lastMoveTime = performance.now() - startTime;

		console.log(
			"AlphaBeta ģenerētie mezgli:", this.generatedNodes,
			"novērtētie mezgli:", this.evaluatedNodes,
			"laiks:", this.lastMoveTime.toFixed(2), "ms"
		);

		return { index: bestIndex };
	}
}
