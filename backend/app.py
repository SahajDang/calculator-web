from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

# -------------------------------
# Tokenizer
# -------------------------------
def tokenize(expression):
    token_spec = [
        ('NUMBER',   r'\d+(\.\d+)?'),          # Integers and floats
        ('ID',       r'[a-zA-Z_]\w*'),         # Identifiers
        ('ASSIGN',   r'='),                     # Assignment operator
        ('OP',       r'[+\-*/()]'),             # Arithmetic operators + parentheses
        ('SKIP',     r'[ \t]+'),                # Skip spaces and tabs
        ('MISMATCH', r'.'),                     # Any other character
    ]
    tok_regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in token_spec)
    for mo in re.finditer(tok_regex, expression):
        kind = mo.lastgroup
        value = mo.group()
        if kind == 'NUMBER':
            if '.' in value:
                yield ('num', float(value))
            else:
                yield ('num', int(value))
        elif kind == 'ID':
            yield ('id', value)
        elif kind == 'ASSIGN':
            yield ('assign', value)
        elif kind == 'OP':
            yield ('op', value)
        elif kind == 'SKIP':
            continue
        else:
            raise SyntaxError(f"Bad character: {value}")

# -------------------------------
# Parser
# -------------------------------
class Parser:
    def __init__(self, tokens):
        self.tokens = list(tokens)
        self.pos = 0

    def current(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def eat(self, kind=None, value=None):
        token = self.current()
        if token is None:
            raise SyntaxError("Unexpected end of input")
        if kind and token[0] != kind:
            raise SyntaxError(f"Expected token kind {kind}, got {token}")
        if value and token[1] != value:
            raise SyntaxError(f"Expected token value '{value}', got '{token[1]}'")
        self.pos += 1
        return token

    def parse(self):
        node = self.assignment()
        if self.current() is not None:
            raise SyntaxError(f"Unexpected token after expression: {self.current()}")
        return node

    def assignment(self):
        # Assignment: id '=' expr
        if self.current() and self.current()[0] == 'id':
            name = self.eat('id')[1]
            if self.current() and self.current()[0] == 'assign':
                self.eat('assign')
                expr = self.expr()
                return ('assign', name, expr)
            else:
                # Single variable reference
                return ('var', name)
        return self.expr()

    def expr(self):
        node = self.term()
        while self.current() and self.current()[0] == 'op' and self.current()[1] in ('+', '-'):
            op = self.eat('op')[1]
            node = ('binop', op, node, self.term())
        return node

    def term(self):
        node = self.factor()
        while self.current() and self.current()[0] == 'op' and self.current()[1] in ('*', '/'):
            op = self.eat('op')[1]
            node = ('binop', op, node, self.factor())
        return node

    def factor(self):
        token = self.current()
        if token is None:
            raise SyntaxError("Unexpected end of input")
        if token[0] == 'num':
            self.eat('num')
            return ('num', token[1])
        elif token[0] == 'id':
            return ('var', self.eat('id')[1])
        elif token[0] == 'op' and token[1] == '(':
            self.eat('op', '(')
            node = self.expr()
            self.eat('op', ')')
            return node
        else:
            raise SyntaxError(f"Unexpected token: {token}")

# -------------------------------
# Evaluator
# -------------------------------
class Evaluator:
    def __init__(self):
        self.env = {}

    def eval(self, node):
        if node[0] == 'num':
            return node[1]
        elif node[0] == 'var':
            name = node[1]
            if name in self.env:
                return self.env[name]
            raise NameError(f"Undefined variable: {name}")
        elif node[0] == 'assign':
            _, name, expr = node
            value = self.eval(expr)
            self.env[name] = value
            return value
        elif node[0] == 'binop':
            _, op, left, right = node
            lval = self.eval(left)
            rval = self.eval(right)
            if op == '+':
                return lval + rval
            elif op == '-':
                return lval - rval
            elif op == '*':
                return lval * rval
            elif op == '/':
                if rval == 0:
                    raise ZeroDivisionError("Division by zero is not allowed")
                return lval / rval
        else:
            raise ValueError(f"Unknown AST node: {node}")

# -------------------------------
# Flask API Endpoint
# -------------------------------
evaluator = Evaluator()

@app.route("/evaluate", methods=["POST"])
def evaluate():
    try:
        data = request.json
        expr = data.get("expression", "")
        tokens = tokenize(expr)
        parser = Parser(tokens)
        ast = parser.parse()
        result = evaluator.eval(ast)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
