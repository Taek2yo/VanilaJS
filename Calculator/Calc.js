document.addEventListener("DOMContentLoaded", function () {
  // 디스플레이 요소와 현재 입력 값을 저장하는 변수
  const display = document.querySelector(".display p");
  let currentInput = "";

  // 숫자, 연산자, +/- 버튼에 대한 이벤트 리스너 등록
  const buttons = document.querySelectorAll(".num_btn, .func_btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      handleButtonClick(button.value);
    });
  });

  // = 버튼에 대한 이벤트 리스너 등록
  const equalButton = document.querySelector(".func_btn[value='=']");
  equalButton.addEventListener("click", function () {
    calculateResult();
  });

  // C 버튼에 대한 이벤트 리스너 등록
  const clearButton = document.querySelector(".func_btn[value='C']");
  clearButton.addEventListener("click", function () {
    clearDisplay();
  });

  // +/- 버튼에 대한 이벤트 리스너 등록
  const plusMinusButton = document.querySelector(".func_btn[value='+/-']");
  plusMinusButton.addEventListener("click", function () {
    toggleSign();
  });

  // 숫자, 연산자, +/- 버튼을 클릭했을 때 호출되는 함수
  function handleButtonClick(value) {
    if (value === "=") {
      calculateResult();
    } else if (value === "+/-") {
      toggleSign();
    } else {
      currentInput += value;
      updateDisplay();
    }
  }

  // = 버튼을 클릭했을 때 호출되는 함수
  function calculateResult() {
    try {
      const result = Function('"use strict"; return (' + currentInput + ')')();
      display.textContent = result;
      currentInput = result.toString();
    } catch (error) {
      display.textContent = "Error";
    }
  }
  

  function clearDisplay() {
    display.textContent = "0";
    currentInput = "";
  }

  function toggleSign() {
    // 현재 입력 값이 비어 있지 않은 경우에만 부호를 변경
    if (currentInput !== "") {
      // 현재 입력 값이 음수인지 확인
      if (currentInput.startsWith("-")) {
        // 음수일 경우 부호를 제거
        currentInput = currentInput.slice(1);
      } else {
        // 양수일 경우 부호를 추가
        currentInput = "-" + currentInput;
      }

      updateDisplay();
    }
  }

  function updateDisplay() {
    display.textContent = currentInput;
  }
});
