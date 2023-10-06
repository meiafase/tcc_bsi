import { Sequelize } from 'sequelize';

<<<<<<< HEAD
const sequelize = new Sequelize('node', 'root', 'positivo', {
// const sequelize = new Sequelize('node', 'root', '', {
// const sequelize = new Sequelize('node', 'root', '166123', {
=======
const sequelize = new Sequelize('node', 'root', 'positivo', { //facul
    // const sequelize = new Sequelize('node', 'root', 'senha', { //Ana - docker (sol)
    // const sequelize = new Sequelize('node', 'root', '', { //Ana - note
// const sequelize = new Sequelize('node', 'root', '166123', {//Samuel
>>>>>>> 7886cc368894074d015279261a89befc042dbbe7
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate().then(() => {
    console.log('Connection OK!');
}).catch(() => {
    console.log('Connection Error!')
});

export default sequelize;