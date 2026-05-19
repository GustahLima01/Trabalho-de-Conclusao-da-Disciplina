import ServicosDePagamento from '../src/ServicosDePagamento.js';
import assert from 'node:assert';

describe("Serviços de pagamento de boleto", () => {
  it("Validar que pagamento de boleto foi adicionado a lista de pagamentos", () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = "0987-7656-3475";
    const empresa = "Samar";
    const valor = 100.0;

    //Act
    servicoDePagamento.pagar(codigoBarra, empresa, valor);

    const ultimoPagamento = servicoDePagamento.consultaUltimoPagamento();

    //Assert
    assert.equal(ultimoPagamento.codigoBarra, codigoBarra);
    assert.equal(ultimoPagamento.empresa, empresa);
    assert.equal(ultimoPagamento.valor, valor);
  });

  it('Validar que pagamento de boleto com valor "100.00" recebe a propriedade de categoria "padrão"', () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = "0987-7656-3476";
    const empresa = "Sanar";
    const valor = 100.0;
    const categoria = "padrão";

    //Act
    servicoDePagamento.pagar(codigoBarra, empresa, valor);

    const ultimoPagamento = servicoDePagamento.consultaUltimoPagamento();

    //Assert
    assert.equal(ultimoPagamento.codigoBarra, codigoBarra);
    assert.equal(ultimoPagamento.empresa, empresa);
    assert.equal(ultimoPagamento.valor, valor);
    assert.equal(ultimoPagamento.categoria, categoria);
  });

  it('Validar que pagamento de boleto com valor "100.01" recebe a propriedade de categoria "cara"', () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = "0987-7656-3477";
    const empresa = "Zamar";
    const valor = 100.01;
    const categoria = "cara";

    //Act
    servicoDePagamento.pagar(codigoBarra, empresa, valor);

    const ultimoPagamento = servicoDePagamento.consultaUltimoPagamento();

    //Assert
    assert.equal(ultimoPagamento.codigoBarra, codigoBarra);
    assert.equal(ultimoPagamento.empresa, empresa);
    assert.equal(ultimoPagamento.valor, valor);
    assert.equal(ultimoPagamento.categoria, categoria);
  });

  it("Validar que valor a pagar deve ser maior que zero", () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = "0987-7656-3478";
    const empresa = "Zanar";
    const valor = 0.0;

    //Act & Assert
    assert.throws(
      function () {
        servicoDePagamento.pagar(codigoBarra, empresa, valor);
      },
      {
        message: "O valor do boleto deve ser maior que zero.",
      },
    );
  });

  it("Validar que valor deve ser informado.", () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = "0987-7656-3474";
    const empresa = "Zammar";
    const valor = null;

    //Act & Assert
    assert.throws(
      function () {
        servicoDePagamento.pagar(codigoBarra, empresa, valor);
      },
      {
        message: "Valor a pagar não informado.",
      },
    );
  });

  it("Validar que empresa beneficiaria deve ser informada.", () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = "0987-7656-3479";
    const empresa = null;
    const valor = 100.0;

    //Act & Assert
    assert.throws(
      function () {
        servicoDePagamento.pagar(codigoBarra, empresa, valor);
      },
      {
        message: "Empresa beneficiária não informada.",
      },
    );
  });

  it("Validar que código de barra deve ser informado.", () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = null;
    const empresa = "Zannar";
    const valor = 100.0;

    //Act & Assert
    assert.throws(
      function () {
        servicoDePagamento.pagar(codigoBarra, empresa, valor);
      },
      {
        message: "Código de barra não informado.",
      },
    );
  });

  it("Validar que código de barra não deve ser maior que 14 caracteres", () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = "0000-0000-00000";
    const empresa = "Sannar";
    const valor = 100.0;

    //Act & Assert
    assert.throws(
      function () {
        servicoDePagamento.pagar(codigoBarra, empresa, valor);
      },
      {
        message: "Código de barras inválido.",
      },
    );
  });

  it("Validar que código de barra não deve ser menor que 14 caracteres", () => {
    //Arrange
    const servicoDePagamento = new ServicosDePagamento();

    const codigoBarra = "0000-0000-000";
    const empresa = "Sannar";
    const valor = 100.0;

    //Act & Assert
    assert.throws(
      function () {
        servicoDePagamento.pagar(codigoBarra, empresa, valor);
      },
      {
        message: "Código de barras inválido.",
      },
    );
  });
});
