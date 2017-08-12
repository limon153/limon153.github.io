$(function() {


  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var firstNumberInput = $('#first-number-input');
  var secondNumberInput = $('#second-number-input');


  // Draw axis
  ctx.beginPath();
  ctx.moveTo(10.5, canvas.height - 40.5);
  ctx.lineTo(canvas.width - 10, canvas.height - 40.5);
  ctx.moveTo(canvas.width - 15, canvas.height - 45);
  ctx.lineTo(canvas.width - 10, canvas.height - 40.5);
  ctx.lineTo(canvas.width - 15, canvas.height - 35.5);
  ctx.stroke();

  // Draw axis divisions
  var y = canvas.height - 50.5;
  var i = 0;
  for (var x = 10.5; x < 630; x += 30) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+20);
    if ((x - 10.5) % 150 == 0) {
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(i, x - 5, y+40);
      ctx.lineWidth = 3;
    } else {
      ctx.font = 'normal 13px sans-serif';
      ctx.fillText(i, x - 5, y+40);
    }
    ctx.stroke();
    i++;
  }


  var num1 = 6;
  var num2 = 8;

  var arrowStartX = 10.5;
  var controlX = 0;
  var controlY = 0;
  var path = 0;
  drawArrow(num1);
  firstNumberInput.css('top', (controlY + 10) + 'px');
  firstNumberInput.css('left', (controlX - 7) + 'px');
  drawArrow(num2);
  secondNumberInput.css('top',  (controlY - 10) + 'px');
  secondNumberInput.css('left', (controlX - 7) + 'px');




  function drawArrow(number) {
    // Draw arrow
    var arrowStartY = y + 10;
    path = number * 30;
    controlX = arrowStartX + path / 2;
    controlY = arrowStartY - path * 0.5;

    ctx.beginPath();
    ctx.moveTo(arrowStartX, arrowStartY);
    ctx.quadraticCurveTo(controlX, controlY, arrowStartX + path, arrowStartY);
    ctx.moveTo(arrowStartX + path - 5, arrowStartY - 10);
    ctx.lineTo(arrowStartX + path, arrowStartY);
    ctx.lineTo(arrowStartX + path - 10, arrowStartY - 5);
    ctx.strokeStyle = '#6F3177';
    ctx.lineWidth = 2;
    ctx.stroke();
    arrowStartX += number * 30;
  }



});
