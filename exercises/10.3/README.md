# Bloco 10 - Testes automatizados com Jest

## Jest - Simulando comportamentos

### Mocks

Simula funções, módulos e requisições para testes. Permite maior controle e agilidade na hora de construir e executar os testes.

> Pense no projeto bônus do bloco 5, o Adivinhe a cor , em que era necessário gerar cores aleatórias. Como testar essas cores, se não sabemos quais serão geradas? Pense também em uma requisição de API que constantemente muda seu retorno. Como ter certeza do seu retorno e, principalmente, de que seu teste não está caindo em um **falso-positivo**?

Formas destaques de *mockar*:

- `jest.fn();`
- `jest.mock();`
- `jest.spyOn();`