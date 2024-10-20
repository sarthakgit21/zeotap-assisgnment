const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const parseRule = (rule) => {
  const tokens = rule.match(/([a-zA-Z]+|\d+|[><=!]+|AND|OR|\(|\)|'[^']*')/g);
  const stack = [];
  const output = [];

  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token === "AND" || token === "OR") {
      while (
        stack.length &&
        (stack[stack.length - 1] === "AND" || stack[stack.length - 1] === "OR")
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    } else if (token.match(/^[a-zA-Z]+$/)) {
      const operator = tokens[++i];
      const value = tokens[++i];

      if (!operator || !value) {
        throw new Error("Invalid expression: Missing operator or value.");
      }

      output.push(new Node("operand", `${token} ${operator} ${value}`));
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      if (stack.length === 0) {
        throw new Error("Mismatched parentheses.");
      }
      stack.pop();
    } else {
      throw new Error(`Unknown token: ${token}`);
    }

    i++;
  }

  while (stack.length) {
    const operator = stack.pop();
    if (operator === "(") {
      throw new Error("Mismatched parentheses.");
    }
    output.push(operator);
  }

  const astStack = [];

  output.forEach((token) => {
    if (token instanceof Node) {
      astStack.push(token);
    } else if (token === "AND" || token === "OR") {
      const right = astStack.pop();
      const left = astStack.pop();
      astStack.push(new Node("operator", token, left, right));
    }
  });

  if (astStack.length !== 1) {
    throw new Error("Invalid expression.");
  }

  return astStack.pop();
};

const evaluateRule = (ast, data) => {
  if (!ast) return true;

  if (ast.type === "operand") {
    const [attribute, operator, value] = ast.value.split(" ");
    const userValue = data[attribute];

    if (operator === ">") {
      return userValue > parseFloat(value);
    } else if (operator === "<") {
      return userValue < parseFloat(value);
    } else if (operator === "=" || operator === "===") {
      return userValue === value.replace(/'/g, ""); // Remove quotes for comparison
    } else {
      throw new Error(`Unknown operator: ${operator}`);
    }
  }

  const leftEval = evaluateRule(ast.left, data);
  const rightEval = evaluateRule(ast.right, data);

  if (ast.value === "AND") {
    return leftEval && rightEval;
  } else if (ast.value === "OR") {
    return leftEval || rightEval;
  }

  return true;
};

// API to parse the rule and return AST
app.post("/api/parse-rule", (req, res) => {
  try {
    const { rule } = req.body;
    const ast = parseRule(rule);
    res.json(ast);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API to evaluate rule eligibility
app.post("/api/rules/evaluate_rule", (req, res) => {
  try {
    const { asts, data } = req.body;

    let result = true;
    for (const ast of asts) {
      result = result && evaluateRule(ast, data);
    }

    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
