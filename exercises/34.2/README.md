# Bloco 34 - Redes e Raspagem de Dados

# Redes de computadores, ferramentas e segurança

# SSL/TLS e HTTPS

> Tanto o SSL ( Secure Sockets Layer ) quanto o TLS ( Transport Layer Security ) são protocolos que implementam uma camada (layer) de segurança na rede, sendo o TLS o sucessor do SSL (simplificadamente). Já o HTTPS (Hyper Text Transfer Protocol Secure) nada mais é do que o protocolo HTTP, que vimos anteriormente, com uma camada adicional de segurança utilizando o protocolo SSL/TLS.

# Firewall e Proxy

## DoS / DDoS

> Nosso site está hospedado em um servidor, um computador com memória, processador, disco, enfim. Esses recursos, como sabemos, são limitados, como com qualquer máquina. Nossa aplicação, porém, recebe relativamente poucos acessos por dia e esses recursos são o suficiente para ela funcionar normalmente.

> Entretanto, nossa aplicação está publicada na internet e, dessa forma, exposta ao mundo inteiro. Então vamos imaginar que mais uma vez uma pessoa mal intencionada resolva "bombardear" nossa aplicação com diversos acessos simultâneos. Isso pode ser feito de diversas maneiras, e esse ataque é chamado de DDoS ( Distributed Denial of Service ), ou ataque distribuído de negação de serviço. Esse ataque tem como objetivo tirar o serviço do ar, tornando-o temporariamente indisponível.

## Brute Force

> Um outro ataque ao qual podemos estar vulneráveis é o conhecido como "brute force", ou ataque de "força bruta", onde indivíduos, robôs ou scripts maliciosos que tentam diversas combinações de usuário e senha, por exemplo, com o objetivo de encontrar as corretas e acessar indevidamente um sistema. Existem diversos métodos de tornar esse ataque mais efetivo. Por exemplo, o uso de listas de palavras com senhas e usuários comuns, tal como usuário "admin" e senha "123456" (por incrível que pareça as pessoas utilizam esse tipo de senha fraca até hoje).

## Firewall

### Iptables e Netfilter

> Na maioria dos sistemas operacionais existem subsistemas de filtragem de pacotes e ferramentas para gerenciamento de firewall. O sistema padrão para filtragem de pacotes do linux é o [Netfilter](http://netfilter.org/) . Existe uma ferramenta utilizada para configurar o Netfilter chamada Iptables , que opera nas camadas 2 e 3 do modelo OSI. O Iptables é, então, o firewall padrão do linux e está presente na maioria das distros.

> Ele compara o tráfego de rede que recebe ou envia com um conjunto de regras pré estabelecidas. Essas regras definem as características que um pacote deve possuir e a ação que deve ser tomada para esse tipo de pacote. Podemos criar regras por protocolo, porta de origem/destino, endereço IP, entre outros. Quando ocorre a correspondência de um pacote a uma característica estabelecida em uma regra é então tomada a ação, que pode ser, por exemplo, se aquele pacote será aceito, rejeitado ou registrado em um arquivo de log.

> Como diz o próprio nome, a arquitetura do Iptables é formada por "tabelas". Essas tabelas também são conhecidas como cadeias e cada uma possui tipos de regras específicas. Por exemplo, a cadeia "filter" que possui todas políticas (regras) responsáveis por controlar o tráfego que entra ou sai do computador.

### Fail2ban

> O fail2ban é um IPS ( Intrusion Prevention System - Sistema de Prevenção de intrusos). Essa ferramenta, de maneira simples, monitora os logs da rede e, de maneira proativa, ao detectar comportamento suspeito, como diversas requisições de um mesmo IP ou diversas tentativas de login SSH, ele criar regras noiptables , de modo a rejeitar aquele endereço de IP específico por determinado tempo.

## Proxy

> Outro componente que pode fornecer mais uma camada de segurança quando falamos de redes é o proxy. O proxy provém uma camada a mais de controle entre a internet e os dispositivos da rede, e pode ser utilizado para diversos fins.

> Um uso comum dos proxies é como uma espécie de filtro que, através de características de uma conexão, ou tráfego, consegue determinar se esse tráfego deve ser feito ou não. Por exemplo, para evitar acessos a redes sociais em escritórios o proxy pode ser utilizado para reconhecer palavras chaves em URLs e então recusá-la. Além disso, eles podem impedir que pessoas usuárias acessem sites com conteúdos impróprios ou com potencial de ser uma página maliciosa.

# Links

- [Vídeo - Criptografia | Nerdologia](https://www.youtube.com/watch?v=_Eeg1LxVWa8)
- [Vídeo - Criptografia de Chave pública | Khan Academy](https://www.youtube.com/watch?v=63H4Idhn1Kc)
- [Vídeo - A máquina de criptografia enigma | Khan Academy](https://www.youtube.com/watch?v=7Pk4ILrd_oI)
- [Vídeo - Beginners Guide To SSH](https://www.youtube.com/watch?v=qWKK_PNHnnA)
- [Vídeo - O que é um Firewall - Segurança de redes](https://www.youtube.com/watch?v=Qg7mhOXH7QY)
- [Vídeo - Fail2Ban Bloquear Brute Force - Linux](https://www.youtube.com/watch?v=IPyEGc2hXog)
- [Vídeo - O que é PROXY? Para que serve? - Servidor](https://www.youtube.com/watch?v=_Uyify7zOsA)
- [Vídeo - SSH Tunneling Explained](https://www.youtube.com/watch?v=AtuAdk4MwWw)
- [Vídeo - SSH Tunneling - Local & Remote Port Forwarding (by Example)](https://www.youtube.com/watch?v=N8f5zv9UUMI)
- [Artigo - Como Configurar um Firewall no Ubuntu 18.04 com UFW](https://www.hostinger.com.br/tutoriais/firewall-ubuntu-ufw)
- [Artigo - SSH, Como funciona e técnicas de criptografia](https://www.hostinger.com.br/tutoriais/como-funciona-o-ssh)
- [Artigo - Guia completo sobre o protocolo SSH](https://www.valuehost.com.br/blog/protocolo-ssh/)
- [Artigo - SSH: o acesso remoto aos servidores | Alura](https://www.alura.com.br/artigos/como-acessar-servidores-remotamente-com-ssh)
- [Artigo - Protegendo seu servidor com IPTables | Alura](https://www.alura.com.br/artigos/protegendo-seu-servidor-com-iptables)
- [Artigo - O que é SSL / TLS e HTTPS?](https://www.hostinger.com.br/tutoriais/o-que-e-ssl-tls-https)
- [Vídeo - A importância do DNS nas redes, explicada pelo NIC.br.](https://www.youtube.com/watch?v=epWv0-eqRMw)
- [Artigo - Mitigando ataques de força bruta no Linux com fail2ban](https://kamarada.github.io/pt/2019/12/14/mitigando-ataques-de-forca-bruta-no-linux-com-fail2ban/)
- [Artigo - Proteja-se com o firewall iptables](https://kamarada.github.io/pt/2019/11/18/proteja-se-com-o-firewall-iptables/)
- [Dica - ngrok | Publicando seu localhost com túneis seguros](https://ngrok.com/)
- [Vídeo - Como HTTPS funciona?](https://www.youtube.com/watch?v=T4Df5_cojAs)