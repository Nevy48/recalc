import core from '../src/core.js'

//Test de Substract
describe('Subtract', () => {
    test('Deberia 2 - 2 = 0', () => {
        expect(core.sub(2, 2)).toBe(0); 
    });

    test('Deberia 6 - 4 = 2', () => {
        expect(core.sub(6, 4)).toBe(2); 
    });

	test('Deberia 2 - 4 = Negativo', () => {
		expect(core.sub(2, 4)).toBeLessThan(0);
	});
    test('Deberia lanzar error al intentar usar un parámetro que no es un número', () => {
        expect(() => core.sub('B', 10)).toThrow('Uno de los parámetros no es un número');
    });
});

//Test de Add
describe('Add', () => {
	test('Deberia 2 + 2 = 4', () => {
		expect(core.add(2, 2)).toBe(4);
	});

	test('Deberia 6 + 4 = 10', () => {
		expect(core.add(6, 4)).toBe(10);
	});
    test('Deberia lanzar error al intentar usar un parámetro que no es un número', () => {
        expect(() => core.add('a', 2)).toThrow('Uno de los parámetros no es un número');
    });
});

//Test de Multiply
describe('Multiply', () => {
    test('Deberia 2 * 2 = 4', () => {
        expect(core.mul(2, 2)).toBe(4); 
    });

    test('Deberia 5 * 3 = 15', () => {
        expect(core.mul(5, 3)).toBe(15); 
    });
    test('Deberia 0 * 5 = 0', () => {
        expect(core.mul(0, 5)).toBe(0); 
    });
    test('Deberia -3 * 4 = -12', () => {
        expect(core.mul(-3, 4)).toBe(-12); 
    });
    test('Deberia lanzar error al intentar usar un parámetro que no es un número', () => {
        expect(() => core.mul('a', 2)).toThrow('Uno de los parámetros no es un número');
    });
    test('Deberia -5 * -8 = 40', () => {
        expect(core.mul(-5, -8)).toBe(40); 
});


 //Test de Division
 describe('Division', () => {
    test('Deberia 2 / 2 = 1', () => {
        expect(core.div(2,2)).toBe(1);
    });

    test ('Deberia 6 / 2 = 3', () => {
        expect(core.div(6,2)).toBe(3);
    });
    test('Deberia 10 / 5 = 2', () => {
        expect(core.div(10,5)).toBe(2);
    });
    test('Deberia lanzar un error al dividir por 0', () => {
        expect(() => { core.div(2,0) }).toThrow('No se puede dividir por 0');
    });
    test('Deberia lanzar error al intentar usar un parámetro que no es un número', () => {
        expect(() => core.div('a', 2)).toThrow('Uno de los parámetros no es un número');
    });
});


//Test de Potencia
describe('Pow', () => {
    test('Deberia 2 * 2 = 4', () => {
        expect(core.pow(2)).toBe(4); 
    });

    test('Deberia 5 * 5 = 25', () => {
        expect(core.pow(5)).toBe(25); 
    });

    test('Deberia 7 * 7 = 49', () => {
        expect(core.pow(7)).toBe(49); 
    });

    test('Deberia 10 * 10 = 100', () => {
        expect(core.pow(10)).toBe(100); 
    });

    test('Deberia 4 * 4 = 16', () => {
        expect(core.pow(4)).toBe(16); 
    });

	test('Deberia dar como resultado un numero positivo', () => {
		expect(core.pow(-5)).toBeGreaterThan(0);
	});

    test('Deberia lanzar error al intentar usar un parámetro que no es un número', () => {
        expect(() => core.pow('a')).toThrow('El parámetro no es un número');
    });
})});

//Test de Raiz Cuadrada
describe('Sqrt', () => {
    test('Deberia √16 = 4', () => {
        expect(core.sqrt(16)).toBe(4); 
    });

    test('Deberia √625 = 25', () => {
        expect(core.sqrt(625)).toBe(25); 
    });

    test('Deberia √2401 = 49', () => {
        expect(core.sqrt(2401)).toBe(49); 
    });

    test('Deberia √10000 = 100', () => {
        expect(core.sqrt(10000)).toBe(100); 
    });

    test('Deberia √256 = 16', () => {
        expect(core.sqrt(256)).toBe(16); 
    });

    test('Deberia dar como resultado un numero positivo', () => {
        expect(core.sqrt(25)).toBeGreaterThan(0);
    });

    test('Deberia lanzar error al intentar usar un parámetro que no es un número', () => {
        expect(() => core.sqrt('a')).toThrow('El parámetro no es un número');
    });
});