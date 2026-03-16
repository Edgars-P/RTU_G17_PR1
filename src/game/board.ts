import type { Ai } from "./ai";

type EndStates = "USER_WIN" | "AI_WIN" | "DRAW";

export class GameManager {
	board: number[];
	boardLength: number;

	points: number;
	bank: number;

	turn: number;

	aiFirst: boolean;
	ai: Ai;

	// Izveido spēles lauku
	constructor(length: number, aiFirst: boolean = false, ai: Ai) {
		this.boardLength = length;
		this.board = new Array(length)
			.fill(0)
			.map(() => Math.floor(Math.random() * 9) + 1);
		this.points = 0;
		this.bank = 0;
		this.turn = 1;
		this.aiFirst = aiFirst;
		this.ai = ai;
	}

	// Izveido jaunu spēles objektu AI simulācijām
	clone(): GameManager {
		const clone = new GameManager(this.boardLength, this.aiFirst, this.ai);
		clone.board = [...this.board];
		clone.points = this.points;
		clone.bank = this.bank;
		clone.turn = this.turn;
		return clone;
	}

	// Notiek pirms/pēc katra gājiena
	// Ja nepieciešams, izpilda AI gājienu.
	tick() {
		if (
			(this.aiFirst && this.turn % 2 === 1) ||
			(!this.aiFirst && this.turn % 2 === 0)
		) {
			const move = this.ai.evaluate(this);
			this.replace(move.index);
		}
	}

	remove(index: number) {
		if (index < 0 || index > this.boardLength) {
			throw new Error("Nepareizs index!");
		}
		// Izdzēš index
		for (let i = index; i < this.boardLength - 1; i++) {
			this.board[i] = this.board[i + 1];
		}
		this.board.pop();
		this.boardLength--;
	}

	// Izvēlas skaitļus kurus aizvietos
	// Gan lietotājs, gan AI izmanto šo funkciju
	replace(index: number) {
		if (index < 0 || index > this.boardLength) {
			throw new Error("Nepareizs index!");
		}

		let num1 = this.board[index];
		let num2 = this.board[index + 1];

		if (num1 + num2 > 7) {
			this.board[index] = 1;
			this.points++;
			this.remove(index + 1);
		} else if (num1 + num2 < 7) {
			this.board[index] = 3;
			this.points--;
			this.remove(index + 1);
		} else {
			this.board[index] = 2;
			this.bank += 1;
			this.remove(index + 1);
		}

		this.turn++;
	}

	// Pārbauda vai ir spēles beigas
	isEnd(): false | EndStates {
		if (this.boardLength <= 1) {
			if (this.bank % 2 == 0 && this.points % 2 == 0) {
				return this.aiFirst ? "AI_WIN" : "USER_WIN";
			} else if (this.bank % 2 == 1 && this.points % 2 == 1) {
				return this.aiFirst ? "USER_WIN" : "AI_WIN";
			} else {
				return "DRAW";
			}
		}
		return false;
	}
}
