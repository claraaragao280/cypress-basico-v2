/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName").type("Clara");
    cy.get("#lastName").type("Aragão");
    cy.get("#email").type("claraaragao22786@gmail.com");
    cy.get("#open-text-area").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elite.",
      {
        delay: 0,
      }
    );
    cy.contains(".button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Clara");
    cy.get("#lastName").type("Aragão");
    cy.get("#email").type("claraaragao22786gmail.com");
    cy.get("#open-text-area").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elite.",
      {
        delay: 0,
      }
    );
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });
  it("Campo telefone só aceita números", function () {
    cy.get("#phone").type("texto").should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Clara");
    cy.get("#lastName").type("Aragão");
    cy.get("#email").type("claraaragao22786gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elite.",
      {
        delay: 0,
      }
    );
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Clara")
      .should("have.value", "Clara")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Aragão")
      .should("have.value", "Aragão")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("claraaragao22786@gmail.com")
      .should("have.value", "claraaragao22786@gmail.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("983493103")
      .should("have.value", "983493103")
      .clear()
      .should("have.value", "");
  });
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });
  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("select").select("YouTube").should("have.value", "youtube");
  });
  it("seleciona um produto (Mentoria) por seu valor", () => {
    cy.get("select").select("mentoria").should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("select").select(1).should("have.value", "blog");
  });
  it("marca o tipo de atendimento Feedback", () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });
  it("marca cada tipo de atendimento", () => {
    // cy.get('input[type="radio"][value="ajuda"]').check().should("be.checked");
    //  cy.get('input[type="radio"][value="elogio"]').check().should("be.checked");
    //  cy.get('input[type="radio"][value="feedback"]')
    //    .check()
    //    .should("be.checked");

    cy.get("input[type='radio']").each((item) => {
      cy.wrap(item).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get("input[type='checkbox']")
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("be.not.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .then((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", {
        action: "drag-drop",
      })
      .then((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("exampleFile");

    cy.get("#file-upload")
      .selectFile("@exampleFile")
      .then((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });
  it("acessa a página da política de privacidade removendo o target e então clicanco no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });
});
