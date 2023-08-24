import {CHAR, INTEGER, STRING, Sequelize}  from 'sequelize';
import Conn from '../ConnectionDB';

const Pessoa = Conn.define('pessoa', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    email: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    area_id: {
        type: INTEGER,
        autoIncrement: false,
        allowNull: true
    },
    tp_coord: {
        type: CHAR,
        autoIncrement: false,
        allowNull: true
    },
    coord_id: {
        type: INTEGER,
        autoIncrement: false,
        allowNull: true
    }
})

Pessoa.sync();

export default Pessoa;