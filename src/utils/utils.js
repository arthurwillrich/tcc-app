export function calibrationPoints(webgazer, setCalibrated) {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var numOfCalibrationPoints = 9; // Alterado de 13 para 9

  var calibrationData = {
    points: [],
    index: 0,
    width: width,
    height: height,
    numOfCalibrationPoints: numOfCalibrationPoints,
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black'], // Adicionado
  };

  // Adicionado
  const button = document.createElement('button');
  button.innerHTML = 'Next point';
  button.addEventListener('click', nextPoint);
  document.body.appendChild(button);

  // Cria um ponto de calibração
  function createPoint(x, y, color) {
    var point = document.createElement('div');
    point.style.width = '15px';
    point.style.height = '15px';
    point.style.borderRadius = '50%';
    point.style.backgroundColor = color;
    point.style.position = 'absolute';
    point.style.top = y + 'px';
    point.style.left = x + 'px';
    point.style.display = 'none';
    document.body.appendChild(point);
    calibrationData.points.push(point);
  }

  // Exibe o próximo ponto de calibração
  function nextPoint() {
    if (calibrationData.index < calibrationData.numOfCalibrationPoints) {
      calibrationData.points[calibrationData.index].style.display = 'block';
      webgazer.pause();
      setTimeout(function () {
        calibrationData.points[calibrationData.index].style.display = 'none';
        calibrationData.index++;
        if (calibrationData.index < calibrationData.numOfCalibrationPoints) {
          button.innerHTML = 'Next point (' + calibrationData.colors[calibrationData.index] + ')'; // Adicionado
          webgazer.resume();
        } else {
          button.remove(); // Adicionado
          setCalibrated(true);
          webgazer.resume();
        }
      }, 5000);
    }
  }

  // Inicializa os pontos de calibração
  for (var i = 0; i < calibrationData.numOfCalibrationPoints; i++) {
    var x = Math.round((i + 1) / (calibrationData.numOfCalibrationPoints + 1) * width);
    var y = Math.round((i + 1) / (calibrationData.numOfCalibrationPoints + 1) * height);
    createPoint(x, y, calibrationData.colors[i]); // Alterado
  }
}
