const { seed } = require('../src/seed.js')
const {
    createHistoryEntry,
    History,
    Operation,
    buscarPorID,
    deleteHistory,
    getFullHistory
} = require('../src/models.js')

beforeEach(async () => {
    await seed()
})

describe("History", () => {
    test("Deberia poder crear una resta en el history", async () => {
        await createHistoryEntry({
            firstArg: 2,
            secondArg: 2,
            result: 0,
            operationName: "SUB",
            error:""
        })

        const histories = await History.findAll({
            include: [Operation]
        })

        expect(histories.length).toEqual(1)
        expect(histories[0].firstArg).toEqual(2)
        expect(histories[0].result).toEqual(0)
        expect(histories[0].Operation.name).toEqual("SUB")
        expect(histories[0].error).toEqual("")
    })
})

describe("History", () => {
    test("Debería devolver un mensaje de historial borrado", async() => {
        await createHistoryEntry({
            firstArg: 10,
            secondArg: 5,
            result: 5,
            operationName: "SUB"
        });
        await createHistoryEntry({
            firstArg: 4,
            secondArg: 2,
            result: 2,
            operationName: "SUB"
        });
        const histories_deleted = await deleteHistory();
        const histories = await getFullHistory();
        expect(histories_deleted).toEqual(2);
        expect(histories.length).toEqual(0);
    });
});

describe("History", () => {
    test("Debería devolver todo el historial", async() => {
        await createHistoryEntry({
            firstArg: 20,
            secondArg: 9,
            result: 11,
            operationName: "SUB"
        });

        await createHistoryEntry({
            firstArg: 56,
            secondArg: 5,
            result: 51,
            operationName: "SUB"
        });

        const histories = await getFullHistory();
        expect(histories.length).toEqual(2);
        expect(histories[0].firstArg).toEqual(20);
        expect(histories[0].secondArg).toEqual(9);
        expect(histories[0].result).toEqual(11);

  });
});

//Hacer un endpoint para obtener una entrada del historial por id, con el test correspondiente
describe("History", () => {
    test("Debería devolver correctamente una entrada del historial buscandola por ID", async() => {
        await createHistoryEntry({
            firstArg: 20,
            secondArg: 9,
            result: 11,
            operationName: "SUB"
            });
            
        await createHistoryEntry({
            firstArg: 56,
            secondArg: 5,
            result: 51,
            operationName: "SUB"
            });
        
        //Lo que se pretende en el test es que devuelva la segunda entrada, no la primera
        const histories = await getFullHistory();
        const historyId = histories[1].id;
        const entrada = await buscarPorID(historyId);
        expect(entrada.id).toEqual(historyId);
        expect(entrada.firstArg).toEqual(56);
        expect(entrada.secondArg).toEqual(5);
        expect(entrada.result).toEqual(51);  
    });
});

describe("History", () => {
    test("El segundo parametro deberia guardarse en la base de datos", async () => {
        await createHistoryEntry({
            firstArg: 8,
            secondArg: 4,
            result: 4,
            operationName: "SUB",
            error:""
        })

        const histories = await History.findAll({
            include: [Operation]
        })

        expect(histories.length).toEqual(1)
        expect(histories[0].result).toEqual(4)
    })
})