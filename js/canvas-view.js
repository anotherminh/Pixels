(function () {
  if (typeof window.Canvas === 'undefined') {
    window.Canvas = {};
  }

  View = Canvas.View = function (canvasObj, $canvas, $palette) {
    this.canvasObj = canvasObj;
    this.$canvas = $canvas;
    this.$palette = $palette;
    this.selectedColor = "red";
    this.setupCanvas();

    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var that = this;
    that.$palette.on("click", ".swatch", (function (event) {
         var $selectedColor = $(event.currentTarget);
         var selectedClass = $selectedColor.attr('class');
         that.selectedColor = selectedClass.split(" ")[0];
       }).bind(that));

    that.$canvas.on("click", ".cell", (function (event) {
      var $selectedCell = $(event.currentTarget);
      $selectedCell.css('background', that.selectedColor);
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
})();
