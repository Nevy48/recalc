const request = require('supertest');
const api = require('../src/api.js');
const { seed } = require('../src/seed.js')

beforeEach(async () => {
    await seed()
})

describe("API substract", () => {
    test("Deberia responder con un 200 ok", async () => {
        const app = await api.build()

        return request(app)
            .get('/api/v1/sub/2/1')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toEqual(1);
            });
    });
});

describe("API add", () => {
    test("Debería responder con un 200 ok", async () => {
        const app = await api.build();

        return request(app)
            .get('/api/v1/add/2/1')
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toEqual(3);
            });
    });

    //En el endpoint de suma, probar que si el segundo parámetro es negativo, 
    //el resultado sea menor al primer parámetro y que el endpoint devuelva un status 200.
    test("Debería responder con un 200 ok y el resultado menor al primer parámetro si el segundo parámetro es negativo", async () => {
        const app = await api.build();

        return request(app)
            .get('/api/v1/add/5/-3')
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toBeLessThan(5);
            });
    });

    //Testear que haciendo una request al endpoint de suma con 0.1 y 0.2 el resultado sea 0.3.
    test("Debería responder con un 200 ok y el resultado 0.3 si el primer parámetro es 0.1 y el segundo 0.2", async () => {
        const app = await api.build();

        return request(app)
            .get('/api/v1/add/0.1/0.2')
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toBeCloseTo(0.3, 2);
            });
    });
});

    //En el endpoint de multiplicación, probar que si ambos parámetros tienen decimales,
    //el resultado sea con decimales y que el endpoint devuelva un status 200.
    
    describe("API mul", () => {
        test("Debería responder con un 200 ok", async () => {
            const app = await api.build();
    
            return request(app)
                .get('/api/v1/mul/2/1')
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .then((res) => {
                    expect(res.body.result).toEqual(2);
                });
        });

        function tieneDecimales(num) {
            return num % 1 !== 0;
        }

        test("Debería responder con un 200 ok y si el resultado da decimales, teniendo ambos parámetros con decimales", async () => {
            const app = await api.build();
        
            return request(app)
                .get('/api/v1/mul/1.5/2.5')
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .then((res) => {
                    expect(tieneDecimales(res.body.result)).toBeTruthy();
                });
        });
});

describe("API pow", () => {
    test("Debería responder con un 400 error", async () => {
        const app = await api.build();

        return request(app)
        .get('/api/v1/pow/P')
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then((res) => {
            expect(res.body.message).toEqual("El parámetro no es un número");
        });
    });
});

describe("API div", () => {
    test("Debería responder con un 400 error", async () => {
      const app = await api.build();
  
      return request(app)
        .get('/api/v1/div/1/0')
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then((res) => {
          expect(res.body.message).toEqual("Error: No se puede dividir por 0");
        });
    });
  });

describe("API sqrt", () => {
    test("Debería responder con un 200 ok", async () => {
        const app = await api.build();

        return request(app)
        .get('/api/v1/sqrt/4')
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then((res) => {
            expect(res.body.result).toEqual(2);
        });
    });
});