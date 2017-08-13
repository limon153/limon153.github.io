$(function() {


  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var firstNumberInput = $('input.first-number-input');
  var secondNumberInput = $('input.second-number-input');


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


  var num1 = 9;
  var num2 = 6;
  var result = num1 + num2;
  $('#first-number').text(num1);
  $('#second-number').text(num2);

  var arrowStartX = 10.5;
  var controlX = 0;
  var controlY = 0;
  var path = 0;
  var isSecondArrowExists = false;
  drawArrow(num1);
  $('.first-number-input').css('top', (controlY) + 'px');
  $('.first-number-input').css('left', (controlX - 7) + 'px');





  function drawArrow(number) {
    var arrowStartY = y + 10;
    path = number * 30;
    controlX = arrowStartX + path / 2;
    controlY = arrowStartY - path * 0.3;

    ctx.beginPath();
    ctx.moveTo(arrowStartX, arrowStartY);
    ctx.quadraticCurveTo(controlX, controlY, arrowStartX + path, arrowStartY);
    ctx.moveTo(arrowStartX + path - 5, arrowStartY - 10);
    ctx.lineTo(arrowStartX + path, arrowStartY);
    ctx.lineTo(arrowStartX + path - 10, arrowStartY - 1);
    ctx.strokeStyle = '#6F3177';
    ctx.lineWidth = 2;
    ctx.stroke();
    arrowStartX += number * 30;
  }

  firstNumberInput.on('input keyup', function() {
    if (firstNumberInput.val() != num1 && firstNumberInput.val().length != 0) {
      console.log(firstNumberInput.val());
      firstNumberInput.css('color', 'red');
      $('#first-number').css('background-color', 'orange');
    } else {
      console.log(firstNumberInput.val());
      firstNumberInput.css('color', 'black');
      $('#first-number').css('background-color', 'inherit');
      if (!isSecondArrowExists && firstNumberInput.val() == num1) {
        $("span.first-number-input").text(firstNumberInput.val());
        firstNumberInput.addClass('hidden');
        secondNumberInput.removeClass('hidden');
        drawArrow(num2);
        $('.second-number-input').css('top',  (controlY - 20) + 'px');
        $('.second-number-input').css('left', (controlX - 7) + 'px');
        isSecondArrowExists = true;
      }
    }
  });

  secondNumberInput.on('input keyup', function() {
    if (secondNumberInput.val() != num2 && secondNumberInput.val().length != 0) {
      secondNumberInput.css('color', 'red');
      $('#second-number').css('background-color', 'orange');
    } else {
      secondNumberInput.css('color', 'black');
      $('#second-number').css('background-color', 'inherit');
      if (secondNumberInput.val() == num2) {
        $("span.second-number-input").text(secondNumberInput.val());
        secondNumberInput.addClass('hidden');
        $('#result-input').removeClass('hidden');
        $('#result').addClass('hidden');
      }
    }
  });

  $('#result-form').submit(function(e) {
    if ($('#result-input').val() != result && $('#result-input').val().length != 0) {
      $('#result-input').css('color', 'red');
    } else {
      $('#result-input').css('color', 'black');
      if ($('#result-input').val() == result) {
        $("#result").text($('#result-input').val());
        $('#result-input').addClass('hidden');
        $('#result').removeClass('hidden');
      }
    }
    e.preventDefault();
  });
});
