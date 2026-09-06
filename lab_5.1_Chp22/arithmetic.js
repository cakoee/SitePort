let answer = 0;

    function when_clicked(){

        operation = document.getElementById("operation").value;

        num1 = parseInt(document.getElementById("input1").value);
        num2 = parseInt(document.getElementById("input2").value);

        if (operation == "+") {

            answer = num1 + num2;
        }

        if (operation == "-") {

            answer = num1 - num2;
        }

        if (operation == "*") {

            answer = num1 * num2;
        }

        if (operation == "/") {

            answer = num1 / num2;
        }

        if (operation == "%") {

            answer = num1 % num2;
        }

        document.getElementById("answer_box").value = answer;

    };
