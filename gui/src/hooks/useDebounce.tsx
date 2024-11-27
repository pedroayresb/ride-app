import {
  useState, useEffect,
} from 'react';

export default function useDebounce<V>(
  value: V,
  delay = 500,
) {
  const [ debouncedValue, setDebouncedValue ] = useState(value);
  const [ isDebouncing, setIsDebouncing ] = useState(false);
  const [ isDirty, setIsDirty ] = useState(false);

  useEffect(() => {
    // Set isDebouncing to true immediately
    setIsDebouncing(true);
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setIsDirty(true);
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    /*
     * Retorna uma função de limpeza que será chamada toda vez...
     * ... useEffect é chamado novamente. useEffect só será chamado novamente ...
     * ... se o valor for alterado (veja o array de dependências abaixo).
     * É assim que evitamos que debouncedValue mude se o valor é alterado dentro do período de delay.
     * O timeout é apagado e reiniciado.
     * Para contextualizar, se o usuário estiver digitando dentro do nosso aplicativo não queremos que debouncedValue seja atualizado até eles pararam de digitar por mais de 500ms.
     */
    return () => {
      clearTimeout(handler);
    };
  }, [
    value,
    delay,
  ]);

  return [
    debouncedValue,
    isDebouncing && isDirty,
  ] as [
    V,
    boolean,
  ];
}
