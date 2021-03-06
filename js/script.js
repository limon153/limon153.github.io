$(function() {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var firstNumberInput = $('input.first-number-input');
  var secondNumberInput = $('input.second-number-input');

  // Initialize numbers
  var num1 = Math.floor(Math.random()*4 + 6);
  var result = Math.floor(Math.random()*4 + 11);
  var num2 = result - num1;

  // Show numbers
  $('#first-number').text(num1);
  $('#second-number').text(num2);

  // Initialize variables for arrows
  var arrowStartX = 10.5;

  // Control position for quadraticCurveTo function
  var controlX = 0;
  var controlY = 0;

  // Length of arrow
  var path = 0;

  // Check if second arrow already exists
  var isSecondArrowExists = false;


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


  // Inital drawing of first arrow and positioning of firs number input
  drawArrow(num1);
  $('.first-number-input').removeClass('hidden');
  $('.first-number-input').css('top', (controlY - 10) + 'px');
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

  // Check first input and create second arrow
  firstNumberInput.on('input keyup', function() {

    if (firstNumberInput.val() != num1 && firstNumberInput.val().length != 0) {
      // Wrong number
      firstNumberInput.css('color', 'red');
      $('#first-number').css('background-color', 'orange');
    } else {
      // Correct number or empty input
      console.log(firstNumberInput.val());
      firstNumberInput.css('color', 'black');
      $('#first-number').css('background-color', 'inherit');

      if (!isSecondArrowExists && firstNumberInput.val() == num1) {
        // Correct number
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

  // Check second input and show input for final result
  secondNumberInput.on('input keyup', function() {
    if (secondNumberInput.val() != num2 && secondNumberInput.val().length != 0) {
      // Wrong number
      secondNumberInput.css('color', 'red');
      $('#second-number').css('background-color', 'orange');
    } else {
      // Correct number or empty input
      secondNumberInput.css('color', 'black');
      $('#second-number').css('background-color', 'inherit');
      if (secondNumberInput.val() == num2) {
        // Correct number
        $("span.second-number-input").text(secondNumberInput.val());
        secondNumberInput.addClass('hidden');
        $('#result-input').removeClass('hidden');
        $('#result').addClass('hidden');
      }
    }
  });

  // Check final result
  $('#result-form').submit(function(e) {
    if ($('#result-input').val() != result && $('#result-input').val().length != 0) {
      // Wrong answer
      $('#result-input').css('color', 'red');
    } else if($('#result-input').val() == result) {
      // Correct answer
      $("#result").text($('#result-input').val());
      $('#result-input').addClass('hidden');
      $('#result').removeClass('hidden');
    }
    e.preventDefault();
  });

  // Make text black when input is cleared
  $('#result-form').on('input keyup', function() {
    if ($('#result-input').val().length == 0) {
      $('#result-input').css('color', 'black');
    }
  });
});
