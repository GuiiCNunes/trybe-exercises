let custoProduto = 12;
let valorVenda = 35;

if (custoProduto < 0 || valorVenda < 0) {
  console.log('Error');
} else {
  console.log('Lucro: ' , valorVenda - (custoProduto * 0.20 + custoProduto));
}