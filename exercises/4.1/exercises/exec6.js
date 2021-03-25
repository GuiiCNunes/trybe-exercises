let peca =  'king';

switch(peca.toLowerCase()) {
  case 'knights':
    console.log(peca + ' -> L move')
  break;
  case 'bishop':
    console.log(peca + ' -> diagonals')
  break;
  case 'rooks':
    console.log(peca + ' -> free lines')
  break;
  case 'king':
    console.log(peca + ' -> one square for wherever')
  break;
  case 'queen':
    console.log(peca + ' -> free line and diagonals')
  break;
  case 'pawns':
    console.log(peca + ' -> one ahead')
  break;
  default:
    console.log('Error');
}