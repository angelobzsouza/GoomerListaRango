const request = require('supertest');

const app = require('../server/server');

// Functional Test
/* test('create restaurant', async () => {
    const response = await request(app).post('/api/restaurantes');

    expect(response.status).toBe(400);
}); */

// Semi Unit Test
// test('create restaurant', async () => {
//     const res = {
//         send: jest.fn(),
//         status: jest.fn(),
//     };
//     const req = {
//         body: {
//             nome: 'teste',
//             endereco: 'teste',
//             funcionamento: [
//                 {
//                     _id: "5cb61abecf59132e801daa3f",
//                     "primeiroDia": "Seg",
//                     "ultimoDia": "Ter",
//                     "horarioInicio": "10:00",
//                     "horarioFim": "18:00"
//                 },
//                 {
//                     _id: "5cb61abecf59132e802dse4g",
//                     "primeiroDia": "Sab",
//                     "ultimoDia": "Dom",
//                     "horarioInicio": "12:00",
//                     "horarioFim": "20:00"
//                 }
//             ],
//         }
//     };
//     const next = () => false;
//     try {
//         await createRestaurant(req, res, next)
//     } catch (e) {
//         expect(res.status.mock.calls.length).toBe(1);
//         expect(res.status).toBeCalledWith(400);
//     }
// });