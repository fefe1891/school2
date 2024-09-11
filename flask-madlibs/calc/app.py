from flask import Flask, request
import re
from operations import add, sub, mult, div

app = Flask(__name__)


@app.route('/add')
def add_route():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    
    result = add(a, b)
    return str(result)



@app.route('/sub')
def sub_route():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    
    result = sub(a, b)
    return str(result)



@app.route('/mult')
def mult_route():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    
    result = mult(a, b)
    return str(result)



@app.route('/div')
def div_route():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    
    
    if b == 0:
        return "Error: division by zero is undefind"
    
    result = div(a, b)
    return str(result)



operations = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}


@app.route('/math/<operation>')
def do_math(operation):
    if operation not in operations:
        return "Invalid operation. Please choose from add, sub, mul, div", 400
    
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    
    if operation == 'div' and b == 0:
        return "Error: division by zero is undefind"
    
    result = operations[operation](a, b)
    return str(result)