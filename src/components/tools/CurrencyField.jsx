import { useEffect, useState } from 'react';
import TextField from '../lead/TextField';
import { parseCurrency, formatCurrency } from '../../lib/format';

// Input de moeda simples: não reformata enquanto o usuário digita (evita
// saltos de cursor), só ao perder o foco. O valor reportado via onChange é
// sempre numérico.
export default function CurrencyField({ label, value, onChange, placeholder = '0', hint }) {
  const [display, setDisplay] = useState(value ? formatCurrency(value) : '');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDisplay(value ? formatCurrency(value) : '');
  }, [value, focused]);

  function handleChange(e) {
    const raw = e.target.value;
    setDisplay(raw);
    onChange(parseCurrency(raw));
  }

  return (
    <TextField
      label={label}
      inputMode="decimal"
      placeholder={placeholder}
      value={display}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      hint={hint}
    />
  );
}
