import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('node', 'root', 'positivo', { //facul
// const sequelize = new Sequelize('node', 'root', '', { //Ana - econet
const sequelize = new Sequelize('node', 'root', '', { //Ana - note
// const sequelize = new Sequelize('node', 'root', '166123', {//Samuel
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate().then(() => {
    console.log('Connection OK!');
}).catch(() => {
    console.log('Connection Error!')
});

export default sequelize;