# Bloco 15 - Testes automatizados com React Testing Library

## RTL - Mocks e Inputs

Para rodar corretamente é necessário acrescentar ao arqui *src/setupTests.js* as linhas:

```
// setupTests.js
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
```

*Esta biblioteca serve para monitoramento de alterações no DOM da página.*

