(function () {
  if (typeof window.Pixels === 'undefined') {
    window.Pixels = {};
  }

  View = Pixels.View = function (canvasObj, $canvas, $palette) {
    this.canvasObj = canvasObj;
    this.$canvas = $canvas;
    this.$palette = $palette;
    this.selectedColor = "red";
    this.setupCanvas();
    this.setupPalette();

    this.bindEvents();
  };

  View.PALETTE = [
      'red', 'cornflowerblue', 'forestgreen', 'wheat', '#ccc', 'white',
      'black', 'pink', 'purple'
    ];

  View.prototype.bindEvents = function () {
    var mousedown = false;
    var that = this;
    that.$palette.on("click", ".swatch", (function (event) {
         var $selectedColor = $(event.currentTarget);
         that.selectedColor = $selectedColor.data('color');
       }).bind(that));

    that.$canvas.on("mousedown", ".cell", (function (event) {
        mousedown = true;
        var $selectedCell = $(event.currentTarget);
        $selectedCell.css('background', that.selectedColor);
      }).bind(that));

    that.$canvas.on("mouseup", ".cell", (function (event) {
      mousedown = false;
    }).bind(that));

    that.$canvas.on("mouseover", ".cell", (function (event) {
      if (mousedown) {
        var $selectedCell = $(event.currentTarget);
        $selectedCell.css('background', that.selectedColor);
      }
    }).bind(that));
  };

  View.prototype.setupCanvas = function () {
    var that = this;
    var width = that.canvasObj.width;
    var height = that.canvasObj.height;
    // get the big container ('canvas') and set css attributes using the dimensions
    that.$canvas.css({
      'width': (width + ((width/10) * 2)).toString(),
      'height': (height + ((height/10) * 2)).toString(),
      'border': '1px solid black'
    });

    that.canvasObj.cells.forEach (function (cell) {
      $cell = that.$canvas.append("<div class='cell'></div>");
      $cell.data('idx', cell.idx);
      $cell.css('background', cell.color);
    });
  };

  View.prototype.setupPalette = function () {
    var that = this;
    var width = that.canvasObj.width;

    $('.palette').css('width', (width + ((width/10) * 2)).toString());

    View.PALETTE.forEach (function (swatch) {
      $swatch = $("<li class='swatch'></li>");
      $swatch.data('color', swatch);
      $swatch.css('background', swatch);
      that.$palette.append($swatch);
    });
  };
})();
