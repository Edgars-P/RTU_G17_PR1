import { Ai, type AiMove } from "./ai";
import type { GameManager } from "./board";
import { buildGameTree, countNodes, type TreeNode } from "./tree";

const MAX_DEPTH = 4; // maksimālais dziļums, līdz kuram izpilda AlphaBeta algoritmu

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

function alphaBetaNode(
	node: TreeNode,
	depth: number,
	alpha: number,
	beta: number,
	stats: { evaluated: number }
): number {
	/* 	katru reizi, kad izsauc alphaBeta(), skaitām, ka
		šo virsotni esam novērtējuši */
	stats.evaluated++;

	node.alpha = alpha;
	node.beta = beta;

	const end = terminalScore(node.manager, depth);
	if (end !== null) {
		node.score = end;
		return node.score;
	}

	if (node.children.length === 0) {
		node.score = heuristic(node.manager);
		return node.score;
	}

	if (isAiTurn(node.manager)) {
		let value = -Infinity;
		for (const child of node.children) {
			const score = alphaBetaNode(child, depth - 1, alpha, beta, stats);

			value = Math.max(value, score);
			alpha = Math.max(alpha, value);

			/* alpha-beta nogriešana */
			if (alpha >= beta) {
				const currentIndex = node.children.indexOf(child);

				for (let i = currentIndex + 1; i < node.children.length; i++) {
					node.children[i].pruned = true;
				}

				break;
			}
		}

		node.score = value;
		return value;
	} else {
		let value = Infinity;
		for (const child of node.children) {
			const score = alphaBetaNode(child, depth - 1, alpha, beta, stats);

			value = Math.min(value, score);
			beta = Math.min(beta, value);

			if (beta <= alpha) {
				const currentIndex = node.children.indexOf(child);

				for (let i = currentIndex + 1; i < node.children.length; i++) {
					node.children[i].pruned = true;
				}

				break;
			}
		}

		node.score = value;
		return value;
	}
}

export class AiAlphaBeta extends Ai {
	generatedNodes = 0;
	evaluatedNodes = 0;
	lastMoveTime = 0;

	evaluate(manager: GameManager): AiMove {
		const startTime = performance.now();

		const root = buildGameTree(manager, MAX_DEPTH);
		this.lastTree = root;

		const stats = { evaluated: 0 };

		let bestIndex = 0;
		let bestScore = -Infinity;

		let alpha = -Infinity;
		let beta = Infinity;

		for (const child of root.children) {
			const score = alphaBetaNode(child, MAX_DEPTH - 1, alpha, beta, stats);

			if (score > bestScore) {
				bestScore = score;
				bestIndex = child.moveIndex ?? 0;
			}

			alpha = Math.max(alpha, bestScore);
		}

		this.generatedNodes = countNodes(root) - 1;		// skaitām bez saknes
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
