import { Sequelize, DataTypes } from 'sequelize';

const inTest = process.env.NODE_ENV === 'test';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: !inTest,
    storage: inTest ? './db.sqlite3' : './db.sqlite3'
})

export const History = sequelize.define('History', {
    firstArg: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    secondArg: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    result: {
        type: DataTypes.NUMBER,
        allowNull: true
    },

    error: { //Agregar un atributo “error” de tipo texto en el modelo History para guardar la de cualquier error que se produzca en una operación
        type: DataTypes.TEXT,
        allowNull: true
    }
});

export const Operation = sequelize.define('Operation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Operation.hasMany(History)
History.belongsTo(Operation)

export async function createHistoryEntry({ firstArg, secondArg, operationName, result, error}) {
    const operation = await Operation.findOne({
        where: {
            name: operationName
        }
    });

    return History.create({
        firstArg,
        secondArg,
        result,
        OperationId: operation.id,
        error
    })
}

export function createTables() {
    return Promise.all([
        History.sync({ force: true }),
        Operation.sync({ force: true })
    ]);
}

export async function deleteHistory (){
    return History.destroy(
        {   where: {} 
        });
}

export async function getFullHistory() {
    return History.findAll();
}

//Hacer un endpoint para obtener una entrada del historial por id, con el test correspondiente
export async function buscarPorID(historyId) {
    try {
      const history = await History.findByPk(historyId, { include: [Operation] });
  
      if (!history) {
        throw new Error('No se encontró la entrada en el historial');
      }
  
      return history;
    } catch (error) {
      throw new Error('No se pudo recuperar la entrada del historial');
    }
  }
  