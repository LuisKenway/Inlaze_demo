describe('Login de Usuario', () => {

    beforeEach(() => {
        cy.visit('https://test-qa.inlaze.com/auth/sign-in');
        
    });
  
    it('Verificar que el usuario pueda loguearse con el email y contraseña correctos.', () => {
      // Happy path
      cy.get('#email').type('Luis.Avila@example.com');
      cy.get('#password').type('Contraseña1!');
      cy.get('[type="submit"]').click();
      cy.wait(2000);
     // cy.get('.font-extrabold').should('contain.text', ' Welcome to Lorem ');
     cy.get('.font-extrabold').then(($element) => {
        assert($element.text().includes(' Welcome to Lorem '), 'El inicio de sesión fue satisfactorio');
      });
      

    });
  
    it('Comprobar que el formulario no se envíe si los campos obligatorios no están completos', () => {
        // Intentamos registrar un usuario sin email
        cy.get('#email').clear();
        cy.get('#password').type('Contraseña1!');
        cy.get('[type="submit"]').then(($button) => {
        assert($button.is(':disabled'), 'El botón de "Sign up" está desactivado debido a que el campo email está incompleto');
        });
      // Dejamos vacío el campo de email
        cy.get('#email').type('Luis.Avila@example.com');
        cy.get('#password').clear();
        cy.get('[type="submit"]').then(($button) => {
        assert($button.is(':disabled'), 'El botón de "Sign up" está desactivado debido a que el campo password está incompleto');
        });   
    });

    it('Comprobar que al ingresar se muestre el nombre del usuario.', () => {
        // Happy path
        cy.get('#email').type('Luis.Avila@example.com');
        cy.get('#password').type('Contraseña1!');
        cy.get('[type="submit"]').click();
        cy.wait(2000);
       /* Se valida que tenga caracteres para pruebas aleatorias de varios usuarios
        cy.get('.flex > .font-bold').then(($element) => {
        const text = $element.text().trim();
        assert(text.length > 0, 'El elemento contiene caracteres');
        , continuamos en este caso para "Luis Avila"
      }); */
      cy.get('.flex > .font-bold').then(($element) => {
        assert($element.text().includes('Luis Ávila'), 'El nombre aparece correctamente');
        });
      });

      it('Verificar que la plataforma permita cerrar la sesión correctamente.', () => {
        cy.get('#email').type('Luis.Avila@example.com');
        cy.get('#password').type('Contraseña1!');
        cy.get('[type="submit"]').click();
        cy.wait(2000);
        cy.get('img').click();
        cy.wait(2000);
        cy.contains('a', 'Logout').click(); 
        cy.get('.text-4xl').then(($element) => {
            assert($element.text().includes('Sign in'), 'Cierre de sesion exitoso');
            });
      });




  });
  