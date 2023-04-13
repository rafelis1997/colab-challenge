# Colab Code Challenge

Este projeto tem como finalidade demonstrar conhecimentos práticos de Fullstack.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60658855/231894717-1b0a7b27-eb59-4bd9-99cd-b894e8c0ba36.png"/>
</p>


## Esclarecimentos

A API mandatória a ser utilizada no desafio é a [Random User](https://randomuser.me/), porém para o
design ao qual imaginei ela possui algumas limitações que atrapalharam o desenvolvimento,
a paginação é uma delas pois é arbitraria e também não há query params para busca de usuários.

Por essa razão aproveitei os recursos do Next.js e criei uma rota de API local e implementei
métodos de busca e paginação mais condizentes com a realidade, desta forma foi possível
buscar usuários pelo nome de forma paginada e consistente, e também listar os usuários com
paginação.

## Funcionalidades

- Listar usuários vindos da API [Random User](https://randomuser.me/);
- Pesquisar usuários pelo nome
- Navegar para uma página de informações detalhadas de cada usuário
- Responsividade

## Tecnologias utilizadas

- Next.js 13
- TailwindCSS
- Toastify
- Dayjs
- axios
- Phosphor Icons

## Desenvolvimento

Para realizar essa tarefa segui 5 principais etapas:

- Wireframe
- Identificação da marca e design da empresa
- Design no Figma
- Desenvolvimento da aplicação
- Revisão de código e otimizações

O wireframe e design no Figma pode ser acessado aqui: [Colab challenge design](https://www.figma.com/file/0FFT2V44IAVFMx75kYxQAE/Colab-Interview?node-id=1-326&t=n4uvXRKR7tiBAOYu-0)

Nesse Design busquei as cores e estilo de design no site principal da empresa, tentei seguir
a mesma componentização e *feeling* da marca para ter consistência na aplicação.

Todo o design foi pensado com responsividade e tags semânticas para ajudar na acessibilidade,
para screen reader's

Após atingir um design consistente parti para o desenvolvimento, adotei o uso do Next.js
como framework principal e TailwindCSS para estilização. Ambos são uma ótima combinação de produtividade
e SEO, visto que o Next.js é SSR. Pude tirar vantagens dessa metodologia server side e criar uma API
para melhor criação de recursos na aplicação.

Apesar de simples e de ter apenas duas telas de navegação, busquei componentizar olhando para
possíveis utilizações futuras de alguns componentes, como o de paginação por exemplo.

## Disclaimer

A API [Random User](https://randomuser.me/) tem limite de requests por um determinado periodo de tempo
então é possível que a aplicação falhe caso haja muitas requisições, infelizmente essa limitação
foge do meu controle e tentei lidar da melhor forma possível com *error handling* e feedback
direto ao usuário.

## Como Testar

- Tenha o Node.js instalado na máquina
- Clone o repositório em uma pasta de sua escolha
- Navegue até a pasta onde o projeto foi clonado pelo terminal
- Rode os comandos:
`npm install && npm run dev`
- O projeto deve iniciar no endereço:
`http://localhost:3000`
Acesse este endereço pelo navegador de sua preferência
