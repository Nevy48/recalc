function add(a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error('Uno de los parámetros no es un número');
    }
	return a + b;
}

function subtract(a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error('Uno de los parámetros no es un número');
    }
    return a - b;
}

function multiply(a, b) {
    if (isNaN(a)) {
        throw new Error("Error: Uno de los parámetros no es un número");
    }
    return a * b;
}

function divide(a, b) {
	if (b === 0) {
		//se verifica que el valor de "b" es 0
		throw new Error("Error: No se puede dividir por 0,");
	}
    if (isNaN(a) || isNaN(b)) {
        throw new Error('Uno de los parámetros no es un número');
    }
	return a / b;
}

function pow(a) {
    if (isNaN(a)) {
        throw new Error("Error: El parámetro no es un número");
    }  
    return a * a;
}

function sqrt(a) {
    if (isNaN(a)) {
        throw new Error("Error: El parámetro no es un número");
    }
    return Math.sqrt(a);
}

export default {
    add: add,
    sub: subtract,
    mul: multiply,
    div: divide,
    pow: pow,
    sqrt: sqrt
}
