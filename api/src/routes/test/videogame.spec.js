const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app.js');
const { Videogames, conn } = require('../../db.js');

const agent = session(app);
const videogame = {
    name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    beforeEach(() => Videogames.sync({ force: true })
        .then(() => Videogames.create(videogame)));
    describe('GET /videogames', () => {
        it('should get 200', () =>
            agent.get('/videogames').expect(200)
        );
    });
});