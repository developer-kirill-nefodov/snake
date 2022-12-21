Game.board = {
    Game: Game,
    size: 15,
    cells: [],

    create() {
        this.createCells();
    },
    createCells() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.cells.push(this.createCell(row, col));
            }
        }
    },
    getRandomAvailableCell() {
        let pool = this.cells.filter((cell) => (
            !this.Game.snake.hasCell(cell) && !cell.hasFood && !cell.hasBomb
        ))
        return pool[Game.random(0, pool.length - 1)];
    },
    createCell(row, col) {
        let cellSize = this.Game.sprites.cell.width + 1;
        let offsetX = (this.Game.width - cellSize * this.size) / 2;
        let offsetY = (this.Game.height - cellSize * this.size) / 2;

        return {
            row: row,
            col: col,
            x: cellSize * col + offsetX,
            y: cellSize * row + offsetY,
            hasFood: false,
            hasBomb: false,
        }
    },
    createCellObject(type) {
        let cell = this.cells.find(cell => cell[type]);
        if(cell) {
            cell[type] = false;
        }

        cell = this.getRandomAvailableCell();
        cell[type] = true;
    },
    getCell({row, col}) {
        return this.cells.find(cell => (
            cell.row === row && cell.col === col
        ))
    },
    isFoodCell(cell) {
        return cell.hasFood
    },
    isBombCell(cell) {
        return cell.hasBomb
    },
    renderHood(cell) {
        this.Game.ctx.drawImage(this.Game.sprites.food, cell.x, cell.y);
    },
    render() {
        this.cells.forEach(cell => {
            this.Game.ctx.drawImage(this.Game.sprites.cell, cell.x, cell.y);
            if (cell.hasFood) {
               this.renderHood(cell);
            }
            if (cell.hasBomb) {
                this.Game.ctx.drawImage(this.Game.sprites.bomb, cell.x, cell.y);
            }
        })
    },

}