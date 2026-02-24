class GameManager {
	board: number[];
	boardLength: number;

	points: number;
	bank: number;

	turn: number;

	aiFirst: boolean;

	// Izveido spēles lauku
	constructor(length: number, aiFirst: boolean = false) {
		this.boardLength = length;
		this.board = new Array(length)
			.fill(0)
			.map(() => Math.floor(Math.random() * 10));
		this.points = 0;
		this.bank = 0;
		this.turn = 1;
		this.aiFirst = aiFirst;
	}

	// Notiek pirms/pēc katra gājiena
	// Ja nepieciešams, izpilda AI gājienu.
	tick() {
		if (
			(this.aiFirst && this.turn % 2 === 1) ||
			(!this.aiFirst && this.turn % 2 === 0)
		) {
			// TODO AI gājiens
			this.turn++;
		}
	}

	// Izvēlas skaitļus kurus aizvietos
	// Gan lietotājs, gan AI izmanto šo funkciju
	replace(index: number) {
		// TODO spēles noteikumi
		this.turn++;
	}

	// Pārbauda vai ir spēles beigas
	isEnd() {
		// TODO spēles beigu noteikumi
	}
}
