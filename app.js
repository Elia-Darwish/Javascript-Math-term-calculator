



(function (global) {


    // check if a character is a number
    const isNumber = function (char) {
        return ((char == '.' || char == '0') || (!!Number(char)));
    }


    // check if the character is a valid operator
    const isOperator = function (char) {
        const operators = ['+', '-', '/', '*', '%'];
        return operators.includes(char);
    }


    // read the number from the expression starting from given index
    const readNumber = function (exp, i) {
        let num = '';
        while (isNumber(exp[i])) {
            num += exp[i];
            i++;
        }
        return num;
    }


    // convert the math expression to reverse polish notation !!
    const expToRpn = function (exp) {
        const precedence = {
            '(': 0,
            '-': 3,
            '+': 3,
            '*': 6,
            '/': 6,
            '%': 6
        };

        let finalStack = [];
        let operatorStack = [];

        let i = 0;

        while (i < (exp.length)) {

            let char = exp[i];

            if (isNumber(char)) {
                let num = readNumber(exp, i);
                finalStack.push(num);
                i += num.length;
                continue;
            }

            if (isOperator(char)) {
                let stackTop = operatorStack[operatorStack.length - 1];
                while (precedence[char] < precedence[stackTop]) {
                    finalStack.push(operatorStack.pop());
                    stackTop = operatorStack[operatorStack.length - 1];
                }
                operatorStack.push(char);
                i++;
                continue;
            }

            if (char == '(') {
                operatorStack.push(char);
                i++;
                continue;
            }

            if (char == ')') {
                let operator;
                do {
                    operator = operatorStack.pop();
                    if (operator == '(') {
                        break;
                    }
                    finalStack.push(operator);
                } while (operator);
                i++;
                continue;
            }
            i++;
        }

        while (operator = operatorStack.pop()) {
            finalStack.push(operator);
        }
        
        return finalStack;
    }


    // calculate the rpn stack
    const calculateRpn = function (rpnExp) {
        let stack = [];
        for (let item of rpnExp) {
            if (isOperator(item)) {

                let a = Number(stack.pop());
                let b = Number(stack.pop());

                switch (item) {
                    case '+':
                        stack.push(b + a);
                        break;
                    case '-':
                        stack.push(b - a);
                        break;
                    case '*':
                        stack.push(b * a);
                        break;
                    case '/':
                        stack.push(b / a);
                        break;
                    case '%':
                        stack.push(b % a);
                        break;
                }

            } else {
                stack.push(item);
            }
        }

        return stack[0];
    }


    function Term(exp) {
        return new Term.init(exp);
    }



    Term.prototype = {

        evaluate: function() {

            if (calculateRpn(expToRpn(this.expression)) || calculateRpn(expToRpn(this.expression)) == 0) {
                this.result = calculateRpn(expToRpn(this.expression));
                return this.result;
            } else {
                throw new Error('Math Expression is not valid');
            }
            
        },

        toPostfix: function() {
            this.postfix = expToRpn(this.expression).join('');
            return this.postfix;
        }

    }



    Term.init = function (exp) {
        this.expression = exp || '';
        this.postfix = '';
        this.result = 0;
    }

    Term.init.prototype = Term.prototype;
    global.Math.term = Term;


}(window));