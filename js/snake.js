Game.snake = {
    Game: Game,
    cells: [],
    moving: false,
    directions: {
        up: {row: -1, coll: 0, angle: 0},
        down: {row: 1, coll: 0, angle: 180},
        left: {row: 0, coll: -1, angle: 270},
        right: {row: 0, coll: 1, angle: 90},
    },
    direction: null,

    create() {
        let startSells = [{row: 7, col: 7}, {row: 8, col: 7}];
        this.direction = this.directions.up;
        for (let startCell of startSells) {
            this.cells.push(this.Game.board.getCell(startCell));
        }
    },
    start(keyCode) {
        switch (keyCode) {
            case 37:
                if (this.direction.angle !== 90) {
                    this.direction = this.directions.left;
                }
                break;
            case 38:
                if (this.direction.angle !== 180) {
                    this.direction = this.directions.up;
                }
                break;
            case 39:
                if (this.direction.angle !== 270) {
                    this.direction = this.directions.right;
                }
                break;
            case 40:
                if (this.direction.angle !== 0) {
                    this.direction = this.directions.down;
                }
                break;
        }
        if (!this.moving) {
            this.Game.onSnakeStart();
        }
        this.moving = true;
    },
    renderHead() {
        let head = this.cells[0];
        let halfSize = this.Game.sprites.head.width / 2;

        this.Game.ctx.save();

        this.Game.ctx.translate(head.x, head.y);
        this.Game.ctx.translate(halfSize, halfSize);

        this.Game.ctx.rotate(this.direction.angle * Math.PI / 180);
        this.Game.ctx.drawImage(this.Game.sprites.head, -halfSize, -halfSize);

        this.Game.ctx.restore();
    },
    renderBody() {
        for (let i = 1; i < this.cells.length; i++) {
            this.Game.ctx.drawImage(this.Game.sprites.body, this.cells[i].x, this.cells[i].y);
        }
    },
    render() {
        this.renderHead();
        this.renderBody();
    },
    move() {
        if (this.moving) {
            let cell = this.getNextCell();
            if (!cell || this.hasCell(cell) || this.Game.board.isBombCell(cell)) {
                this.Game.stop();
            }
            if (cell) {
                this.cells.unshift(cell);
                if (!this.Game.board.isFoodCell(cell)) {
                    this.cells.pop();
                } else {
                    this.Game.board.createCellObject('hasFood');
                    this.Game.onSnakeEat();
                }
            }
        }
    },
    hasCell(cell) {
        return this.cells.find(part => part === cell);
    },
    getNextCell() {
        let head = this.cells[0];

        let row = head.row + this.direction.row;
        let col = head.col + this.direction.coll;
        return this.Game.board.getCell({row, col});
    }
}