import * as React from 'react';
import { Booking } from './Booking';
import './style.css';

const inputNumberStyle = { width: 60 };

export type Booking = {
  name: string;
  numberOfPeople: number;
  date: number;
};

// 1. Creare prenotazione (composta da nome, n° persone e data di creazione)
// 2. Aggiungere prenotazioni create alla lista (con bottone "Salva")
// 3. Si può editare soltanto il n° di persone nelle prenotazioni nella lista (input "Nome" disabilitato); premendo "Salva" la modifica diventa definitiva
// 4. Si possono eliminare le prenotazioni dalla lista
// 5. Si possono filtrare le prenotazioni per nome

export default function App() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [name, setName] = React.useState<string>();
  const [numberOfPeople, setNumberOfPeople] = React.useState<number>();
  const [nameFilter, setNameFilter] = React.useState('');

  const removeBooking = (bookedName: string) => {
    setBookings(bookings.filter((booking) => booking.name !== bookedName));
  };

  const changeNumberOFPeople = (name: string, value: number) => {
    setBookings(
      bookings.map((booking) => {
        return name === booking.name
          ? { ...booking, numberOfPeople: value }
          : booking;
      })
    );
  };

  const filteredBooking = nameFilter
    ? bookings.filter((booking) => booking.name.includes(nameFilter))
    : bookings;
  return (
    <div>
      <h1>Prenotazioni</h1>
      <div>
        <label>Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>N° Persone</label>
        <input
          type="number"
          min="0"
          style={inputNumberStyle}
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
        />
        <button
          onClick={() => {
            setName('');
            setNumberOfPeople(0);
            setBookings([
              ...bookings,
              {
                name,
                numberOfPeople,
                date: new Date().getTime(),
              },
            ]);
          }}
        >
          Crea prenotazione
        </button>
      </div>
      <hr />
      <h2>Lista</h2>
      <input
        placeholder="Filtra per nome"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />

      <div>
        {filteredBooking.map((booking) => {
          return (
            <Booking
              onRemove={removeBooking}
              onSave={changeNumberOFPeople}
              key={booking.name}
              name={booking.name}
              numberOfPeople={booking.numberOfPeople}
              date={booking.date}
            />
          );
        })}
      </div>

      <button onClick={() => console.log(bookings)}>Stampa</button>
    </div>
  );
}
