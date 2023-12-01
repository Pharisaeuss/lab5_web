class Test {
  constructor() {
      this.PIB = '';
      this.group = '';
      this.ocinka = 0;
      this.answerQuestion = 1;
  }

  start() {
      document.getElementById('button_pochati').hidden = true;
      document.getElementById('registr').hidden = false;
  }

  blank() {
      this.PIB = document.getElementById('area1').value;
      this.group = document.getElementById('area2').value;

      if (this.PIB !== '' && this.group !== '') {
          this.startTest();
      }

      console.log(this.PIB);
      console.log(this.group);
  }

  startTest() {
      document.getElementById('registr').hidden = true;
      document.getElementById('test').hidden = false;
      document.getElementById('test').classList.add('newFlexClass');
      document.getElementById('Pitannya1').hidden = false;
  }

  checkAnswer(i) {
      let res = 0;

      switch (i) {
        case 1:
          if (document.getElementById("pick11").checked) {
              res = 1;
          }
          break;
      case 2:
          if (document.getElementById("pick21").checked && document.getElementById("pick23").checked) {
              res = 1;
          }
          break;
      case 3:
          if (document.getElementById("pick31").checked && document.getElementById("pick32").checked && document.getElementById("pick33").checked) {
              res = 1;
          }
          break;
      case 4:
          if (document.getElementById("select1").value == 'pick42') {
              res = 1;
          }
          break;
      case 5:
          if (document.getElementById("pick53").checked) {
              res = 1;
          }
          break;
          case 6:
            if (
              document.getElementById("Paddingontainer").contains(document.getElementById("drag1")) &&
              document.getElementById("ContentContainer").contains(document.getElementById("drag2")) &&
              document.getElementById("MarginContainer").contains(document.getElementById("drag3"))
            ) {
              res = 1; 
            }
            break;
      case 7:
          if (document.getElementById("pick71").checked) {
              res = 1;
          }
          break;
      case 8:
          if (document.getElementById("pick82").checked) {
              res = 1;
          }
          break;
      case 9:
          if (document.getElementById("pick91").checked) {
              res += 0.25;
          }
          if (document.getElementById("pick92").checked) {
              res += 0.25;
          }
          if (document.getElementById("pick94").checked) {
              res += 0.25;
          }
          if (document.getElementById("pick96").checked) {
              res += 0.25;
          }
          break;
      case 10:
          if (document.getElementById("pick101").checked) {
              res = 1;
          }
          break;
      }

      return res;
  }

  nextQuestion() {
      if (this.answerQuestion === 10) {
          document.getElementById('Pitannya10').hidden = true;
          document.getElementById('next__button').hidden = true;
          document.getElementById('resultTest').hidden = false;
      } else {
          document.getElementById('Pitannya' + (this.answerQuestion + 1)).hidden = false;
          document.getElementById('Pitannya' + this.answerQuestion).hidden = true;
      }

      this.ocinka += this.checkAnswer(this.answerQuestion);
      console.log(this.ocinka);
      this.answerQuestion++;

      if (this.answerQuestion === 11) {
          document.getElementById('resultTest').classList.add('newFlexClass');
          document.getElementById('PIBuchnya').textContent += this.PIB;
          document.getElementById('resGroup').textContent += this.group;
          document.getElementById('resRating').textContent += this.ocinka;
      }
    
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);

  const dropContainerId = ev.target.id;
  const dropContainer = document.getElementById(dropContainerId);

  const existingElement = dropContainer.querySelector('#' + data);
  if (existingElement) {
      return;
  }

  dropContainer.appendChild(draggedElement);
}

const testInstance = new Test();

document.getElementById('button_pochati').addEventListener('click', function() {
  testInstance.start();
});

document.getElementById('registr__button').addEventListener('click', function() {
  testInstance.blank();
});

document.getElementById('next__button').addEventListener('click', function() {
  testInstance.nextQuestion();
});