describe('Registro de Usuario', () => {

  beforeEach(() => {
      cy.visit('https://test-qa.inlaze.com/auth/sign-in'); 
      cy.get('.font-bold.text-primary').click();
      

  });

  it('Verificar que se pueda registrar un usuario con nombre, email y contraseña válidos.', () => {
    // Happy path
    cy.get('#full-name').type('Luis Ávila');
    cy.get('#email').type('Luis.Avila@example.com');
    cy.get('#password').type('Contraseña1!');
    cy.get('#confirm-password').type('Contraseña1!');
    cy.get('[type="submit"]').click();
    cy.get('app-toast > .flex').should('contain.text', 'Successful registration!');

  });

  it('Validar que el campo de nombre acepte mínimo 2 palabras.', () => {
    //Si no hay mas de dos palabras en "Full name", la prueba es satisfactoria si el boton "type="submit" esta deshabilitado
    cy.get('#full-name').type('Juan');
    cy.get('#email').type('juan.perez 2');
    cy.get('#password').type('Contraseña1!');
    cy.get('#confirm-password').type('Contraseña1!');
    // Verificar que el botón esté deshabilitado
   
    cy.get('[type="submit"]').then(($button) => {
      assert($button.is(':disabled'), 'El botón de "Sign up" está desactivado debido a que el campo "name" no tiene dos palabras');
    });
    
  });

  //it('Verificar que el email cumpla con el formato estándar y sea único en la base de datos.', () => {
    // Verificar formato de email
  it('Verificar que el email cumpla con el formato estándar', () => {
      // Ingresa un correo electrónico con formato incorrecto
    cy.get('#full-name').type('Juan Perez');
    cy.get('#email').type('juan.perez 22');
    cy.get('#password').type('Contraseña1!');
    cy.get('#confirm-password').type('Contraseña1!');
    // Verificar que el botón esté deshabilitado
    cy.get('[type="submit"]').then(($button) => {
      assert($button.is(':disabled'), 'El botón de "Sign up" está activado y debería estar desactivado debido a que el formato del campo "Email" es incorrecto');
    });
  });

  it('Validar que la contraseña cumpla con los requisitos de longitud y caracteres', () => {
   
    cy.get('#full-name').type('Juan Perez');
    cy.get('#email').type('pepito@gmail.com');
    cy.get('#password').type('mundo');
    cy.get('#confirm-password').type('mundo');
    // Verificar que el botón esté deshabilitado
    cy.get('[type="submit"]').then(($button) => {
        assert($button.is(':disabled'), 'El botón de "Sign up" está desactivado debido a que la contraseña no cumple con los requisitos');
      });
  });

  
  it('Comprobar que el formulario no se envíe si los campos obligatorios no están completos', () => {
      // Intentamos registrar un usuario sin nombre
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#password').type('Contraseña1!');
    cy.get('#confirm-password').type('Contraseña1!');
    cy.get('[type="submit"]').then(($button) => {
      assert($button.is(':disabled'), 'El botón de "Sign up" está desactivado debido a que el campo name está incompleto');
      });
    // Dejamos vacío el campo de email
    cy.get('#full-name').type('Juan Pérez');
    cy.get('#email').clear();
    cy.get('#password').type('Contraseña1!');
    cy.get('#confirm-password').type('Contraseña1!');
      //cy.get('[type="submit"]').should('be.disabled', 'El botón de "Sign up" está desactivado debido a que el campo email está incompleto');
    cy.get('[type="submit"]').then(($button) => {
       assert($button.is(':disabled'), 'El botón de "Sign up" está desactivado debido a que el campo email está incompleto');
      });  
      // Dejamos vacío el campo de contraseña
    cy.get('#full-name').type('Juan Pérez');
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#password').clear();
    cy.get('#confirm-password').type('Contraseña1!');
    cy.get('[type="submit"]').then(($button) => {
      assert($button.is(':disabled'), 'El botón de "Sign up" está desactivado debido a que el campo password está incompleto');
      });
      //Contraseña confirm vacio
    cy.get('#full-name').type('Juan Pérez');
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#password').type('Contraseña1!');
    cy.get('#confirm-password').clear;
    cy.get('[type="submit"]').then(($button) => {
      assert($button.is(':disabled'), 'El botón de "Sign up" está desactivado debido a que el campo confirm password está incompleto');
      });

  });



  it('Debería verificar que el sistema informe si las contraseñas no coinciden', () => {
    cy.get('#full-name').type('Juan Pérez');
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#password').type('Contraseña1!');
    cy.get('#confirm-password').type('Contraseña20');
    cy.get('.label-text-alt').then(($label) => {
      assert.strictEqual($label.text(), ' Passwords do not match ', 'El sistema informa que las contraseñas NO coinciden');

  });
  
  });

});
