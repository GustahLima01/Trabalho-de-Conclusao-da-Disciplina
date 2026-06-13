# Trabalho de Conclusao da Disciplina

Projeto desenvolvido em Node.js com foco na implementacao e validacao de uma classe de servicos de pagamento de boletos, com testes automatizados e integracao continua via GitHub Actions.

## Objetivo

O projeto implementa uma classe responsavel por registrar pagamentos de boletos e consultar o ultimo pagamento realizado. Cada pagamento contem codigo de barras, empresa beneficiaria, valor e categoria.

A classificacao segue a regra abaixo:

- valores ate `100.00` recebem a categoria `padrao`
- valores acima de `100.00` recebem a categoria `cara`

Tambem sao aplicadas validacoes de entrada para garantir a integridade dos dados informados.

## Tecnologias Utilizadas

- Node.js
- Mocha
- Mochawesome
- GitHub Actions

## Estrutura do Projeto

```text
.
|-- .github/
|   `-- workflows/
|       |-- 01-manual-exec.yaml
|       |-- 02-scheduled-exec.yaml
|       `-- 03-push-exec.yaml
|-- src/
|   `-- ServicosDePagamento.js
|-- test/
|   `-- ServicosDePagamento.test.js
|-- mochawesome-report/
|-- package.json
`-- package-lock.json
```

## Requisitos

Para executar o projeto localmente, utilize:

- Node.js `24.x` ou versao compativel com a pipeline
- npm

## Instalacao

Instale as dependencias com:

```bash
npm install
```

## Execucao dos Testes

Para rodar os testes automatizados localmente:

```bash
npm test
```

O script configurado no projeto executa o Mocha e gera um relatorio com Mochawesome.

## Relatorio de Execucao

Apos a execucao dos testes, o relatorio fica disponivel em:

```text
mochawesome-report/
```

Esse diretorio tambem e publicado como artefato na pipeline do GitHub Actions.

## Pipeline CI com GitHub Actions

O projeto possui tres workflows de integracao continua, todos com o mesmo fluxo principal de execucao:

1. realizar checkout do codigo com `actions/checkout@v4`
2. configurar o ambiente Node.js com `actions/setup-node@v4`
3. instalar dependencias com `npm install`
4. executar os testes com `npm test`
5. publicar o diretorio `mochawesome-report/` como artefato

### 1. Execucao Manual

Arquivo: `.github/workflows/01-manual-exec.yaml`

Esse workflow utiliza o gatilho `workflow_dispatch`, permitindo a execucao manual pela interface do GitHub.

Quando usar:

- validar o projeto sob demanda
- demonstrar a execucao da pipeline
- rodar testes manualmente antes de uma entrega

### 2. Execucao Agendada

Arquivo: `.github/workflows/02-scheduled-exec.yaml`

Esse workflow utiliza o gatilho `schedule` com a expressao cron abaixo:

```yaml
*/6 * * * *
```

Na pratica, a execucao acontece a cada 6 minutos.

Quando usar:

- acompanhar a estabilidade da aplicacao
- executar testes periodicos de forma automatica
- identificar falhas recorrentes sem depender de acao manual

### 3. Execucao por Push

Arquivo: `.github/workflows/03-push-exec.yaml`

Esse workflow e disparado a cada `push` na branch `main`.

Quando usar:

- validar alteracoes enviadas para a branch principal
- reforcar a confiabilidade da integracao continua
- detectar regressao logo apos mudancas no codigo

## Artefatos da Pipeline

Os tres workflows publicam o artefato `mochawesome-report`, mesmo quando ocorre falha na execucao dos testes, pois utilizam a condicao:

```yaml
if: ${{ always() }}
```

Isso ajuda na analise posterior dos resultados e na preservacao das evidencias de execucao.

## Regras Validadas nos Testes

Os testes automatizados cobrem, entre outros, os seguintes cenarios:

- adicao de pagamento com sucesso
- classificacao como `padrao` para valores ate `100.00`
- classificacao como `cara` para valores acima de `100.00`
- rejeicao de valor igual a zero
- rejeicao de valor nao informado
- rejeicao de empresa nao informada
- rejeicao de codigo de barras nao informado
- rejeicao de codigo de barras com tamanho invalido

## Exemplo de Uso

```js
const servicoDePagamento = new ServicosDePagamento();

servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);

console.log(servicoDePagamento.consultaUltimoPagamento());
```

Saida esperada:

```js
{
  codigoBarra: '0987-7656-3475',
  empresa: 'Samar',
  valor: 156.87,
  categoria: 'cara'
}
```
