import React from 'react';
import { render } from '@testing-library/react';
import ValidEmail from './ValidEmail';

test('Testando um componente, caso o email seja valido.', () => {
  const EMAIL_USER = 'email@email.com';
  const { getByText } = render(<ValidEmail email={EMAIL_USER} />);
  const isValid = getByText('Email Valido');
  expect(isValid).toBeInTheDocument();
});

test('Testando um componente, caso o email seja inválido.', () => {
  const EMAIL_USER = 'emailerrado';
  const { getByText } = render(<ValidEmail email={EMAIL_USER} />);
  const isValid = getByText('Email Inválido');
  expect(isValid).toBeInTheDocument();
});

test('Testa se a mensagem aparece quando não houver email.', () => {
  const { getAllByText, queryByText } = render(<ValidEmail email='' />);
  const isValid = queryByText('Email Inválido');
  // const isValid = getAllByText('Email Valido') || getAllByText('Email Inválido');
  // const isInvalid = getByText('Email Inválido');
  expect(isValid).not.toBeInTheDocument();
});