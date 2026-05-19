// Crie uma classe que possua dois métodos: um para realizar pagamento e outro para consultar o 
// último pagamento. Pagamentos serão armazenados como objetos Javascript dentro de uma lista de 
// pagamentos. Cada pagamento terá as propriedades: Código de Barras, Empresa e Valor. Quando um 
// pagamento for realizado e o valor for maior que 100.00, o pagamento também terá a propriedade 
// 'categoria' preenchida pela função como 'cara', caso contrário, a propriedade 'categoria' será 
// preenchida pela função como 'padrão'. O método de consultar trará apenas o último pagamento.

//   ex. 
//   const servicoDePagamento = new ServicoDePagamento();
//   servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
//   console.log(servicoDePagamento.consultarUltimoPagamento());
//   {
//      codigoBarras: '0987-7656-3475',
//      empresa: 'Samar',
//      valor: 56.87,
//      categoria: 'cara'
//   }

export default class ServicosDePagamento{
    #pagamentos

    constructor(){
        this.#pagamentos = [];
    }

    pagar(codigoBarra, empresa, valor){
        let categoria = 'padrão';

        if(!codigoBarra){
            throw new Error(
                'Código de barra não informado.'
            );
        }

        if(codigoBarra.length !== 14){
            throw new Error(
                'Código de barras inválido.'
            )
        }

        if(!empresa){
            throw new Error(
                'Empresa beneficiária não informada.'
            );
        }    
        
        if(valor == null){
            throw new Error(
                'Valor a pagar não informado.'
            );
        }
        
        if(valor <= 0.00){
             throw new Error(
                'O valor do boleto deve ser maior que zero.'
            );
        }

        if(valor <= 100.00){
            this.#pagamentos.push({
                codigoBarra: codigoBarra,
                empresa: empresa,
                valor: valor,
                categoria: categoria
            });
        }else{
            categoria = 'cara';

            this.#pagamentos.push({
                codigoBarra: codigoBarra,
                empresa: empresa,
                valor: valor,
                categoria: categoria
            });
        }
    }

    consultaUltimoPagamento(){
        return this.#pagamentos.at(-1);
    }
}