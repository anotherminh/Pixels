(function () {
  if (typeof window.Pixels === 'undefined') {
    window.Pixels = {};
  }

  Board = Pixels.Board = function (options) {
    this.width = (Math.round(options.width / 10) * 10);
    this.height = (Math.round(options.height / 10) * 10);
    this.numOfCells = (this.width * this.height / 100);
    this.cellBackgroundColor = options.cellBackgroundColor;
    // this.borderColor = options.borderColor;
    // this.borderThickness = options.borderThickness;

    this.cells = [];
    this.makeCells();
  };

  Cell = Pixels.Cell = function (color, idx) {
    this.color = color;
    this.idx = idx;
  };

  Cell.SIZE = 10;

  Board.prototype.makeCells = function () {
    var that = this;
    for (var i = 0; i < that.numOfCells; i++) {
      var newCell = new Cell(this.cellBackgroundColor, i);
      that.cells.push(newCell);
    }
    return that.cells;
  };
})();
