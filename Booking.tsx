import * as React from 'react';
const inputNumberStyle = { width: 40 };

type Props = {
  name: string;
  numberOfPeople: number;
  date: number;
  onRemove: (name: string) => void;
  onSave: (name: string, numberOfPeople: number) => void;
};

export const Booking = ({
  name,
  numberOfPeople,
  date,
  onRemove,
  onSave,
}: Props) => {
  const [nop, setNop] = React.useState(numberOfPeople);
  return (
    <div>
      <input value={name} disabled />
      <label>N° Persone</label>
      <input
        type="number"
        min="0"
        style={inputNumberStyle}
        value={nop}
        onChange={(e) => setNop(Number(e.target.value))}
      />
      <span>{new Date(date).toLocaleDateString()}</span>
      <button onClick={() => onSave(name, nop)}>Salva</button>
      <button onClick={() => onRemove(name)}>Elimina</button>
    </div>
  );
};
