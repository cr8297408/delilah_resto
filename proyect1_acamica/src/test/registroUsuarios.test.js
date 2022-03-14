const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');
const Usuario = require('../models/usuarios.model');

chai.should();
chai.use(chaiHttp);

describe('Registro de usuarios', () => {
    /**
     * test para el registro de nuevos usuarios.
     */
    describe('POST /usuarios/registro', () => {
        describe('201 usuario creado exitosamente', () => {
            it('responde con 201', (done) => {
                const usuarioNuevo = {
                    usuario: 'usuarioTest',
                    nombre: 'test',
                    telefono: '3133333455',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                    email: "test@gmail.com",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(201);
                    done();
                  });
            });
            
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.com'});
            });
        });
        
        describe('bad request, en parametro usuario', () => {
            it('responde con 400, porque el usuario tiene menos de 3 caracteres', (done) => {
                const usuarioNuevo = {
                    usuario: 'us',
                    nombre: 'test',
                    telefono: '3133333455',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                    email: "test@gmail.com",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.com'});
            });
    
            it('responde con 400, porque el usuario es requerido', (done) => {
                const usuarioNuevo = {
                    nombre: 'test',
                    telefono: '3133333455',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                    email: "test@gmail.com",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.com'});
            });
        });

        describe('bad request, en parametro nombre', () => {
            it('responde con 400, porque el nombre tiene menos de 3 caracteres', (done) => {
                const usuarioNuevo = {
                    usuario: 'test',
                    nombre: 'te',
                    telefono: '3133333455',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                    email: "test@gmail.com",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.com'});
            });
    
            it('responde con 400, porque el nombre es requerido', (done) => {
                const usuarioNuevo = {
                    usuario: 'test',
                    telefono: '3133333455',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                    email: "test@gmail.com",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.com'});
            });
        });

        describe('bad request, en parametro email', () => {
            it('responde con 400, porque el emailno termina en: (.com .net .co)', (done) => {
                const usuarioNuevo = {
                    usuario: 'test',
                    nombre: 'test',
                    telefono: '3133333455',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                    email: "test@gmail.org",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.org'});
            });
    
            it('responde con 400, porque el email es requerido', (done) => {
                const usuarioNuevo = {
                    usuario: 'testSinEmail',
                    nombre: 'test',
                    telefono: '3133333455',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ usuario: 'testSinEmail'});
            });
        });

        describe('bad request, en parametro telefono', () => {
            it('responde con 400, porque el teleono debe tener minimo 10 caracteres', (done) => {
                const usuarioNuevo = {
                    usuario: 'test',
                    nombre: 'test',
                    telefono: '31333334',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                    email: "test@gmail.com",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.com'});
            });

            it('responde con 400, porque el telefono es requerido', (done) => {
                const usuarioNuevo = {
                    usuario: 'test',
                    nombre: 'test',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345',
                    email: "test@gmail.com",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.com'});
            });
        });

        describe('bad request en parametro contrasenia', () => {
            it('responde con 400, la contrasenia debe de ser igual en repetir_contrasenia', (done) => {
                const usuarioNuevo = {
                    usuario: 'test',
                    nombre: 'test',
                    telefono: '3133333455',
                    contrasenia: '12345',
                    repetir_contrasenia: '12345er2',
                    email: "test@gmail.com",
                };
                chai.request(app)
                  .post('/usuarios/registro')
                  .send(usuarioNuevo)
                  .end((err, response) => {
                    response.should.have.status(400);
                    done();
                  });
            });
    
            after (async () => {
                await Usuario.deleteOne({ email: 'test@gmail.com'});
            });
        });
    });
});
