import express from 'express';
import core from './core.js';

import { createHistoryEntry, deleteHistory, getFullHistory} from './models.js'
import { buscarPorID } from './models.js'

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
    } else {
        const result = core.sub(a, b);

        await createHistoryEntry({ firstArg: a, secondArg: b, result, operationName: "SUB" })
        return res.send({ result });
    }
});


router.get("/add/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
        await createHistoryEntry({ firstArg: a, secondArg: b, result: null, operationName: "ADD" });
    } else {
        const result = core.add(a, b);
        await createHistoryEntry({ firstArg: a, secondArg: b, result: result, operationName: "ADD" });
        return res.send({ result });
    }


});

router.get("/mul/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
        await createHistoryEntry({ firstArg: a, secondArg: b, result: null, operationName: "MUL"});
    } else {
        const result = core.mul(a, b);
        await createHistoryEntry({ firstArg: a, secondArg: b, result: result, operationName: "MUL"});
        return res.send({ result });
    }
});

router.get("/div/:a/:b", async function(req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ message: 'Uno de los parámetros no es un número' });
    } 
    if (b === 0) {
        await createHistoryEntry({ firstArg: a, secondArg: b, result: null, operationName: "DIV" });
        return res.status(400).json({ message: 'Error: No se puede dividir por 0' });
    }
    const result = core.div(a, b);
    await createHistoryEntry({ firstArg: a, secondArg: b, result: result, operationName: "DIV" });
    return res.json({ result });
});

router.get("/pow/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        res.status(400).json({message:'El parámetro no es un número'});
    } else if (a > 100000) {
        res.status(400).json({message:'El número no debe ser mayor a 100.000'});
    } else  {
        const result = core.pow(a);
        await createHistoryEntry({ firstArg: a, secondArg: null, result, operationName: "POW"});
        return res.send({ result });
    }
});

router.get("/sqrt/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        res.status(400).json({message:'El parámetro no es un número'});
    } else {
        const result = core.sqrt(a);
        await createHistoryEntry({ firstArg: a, secondArg: null, result, operationName: "SQRT"});
        return res.send({ result });
    }
});

router.get("/history/deleted", async function (req, res) {
    await deleteHistory();
    return res.send({ message: "history is deleted"});
});

router.get("/history", async function (req, res) {
    const history = await getFullHistory();
    return res.send({history});
});

//Hacer un endpoint para obtener una entrada del historial por id, con el test correspondiente
router.get("/history/:id", async function (req, res) {
  const historyId = req.params.id;

  try {
    const history = await buscarPorID(historyId);

    return res.send({ history });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

export default router;

