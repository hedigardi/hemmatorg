import React from 'react';

const DishForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <input type="text" placeholder="Namn på rätt" className="input" required />
      <textarea placeholder="Beskrivning" className="textarea" required></textarea>
      <input type="number" placeholder="Pris (SEK)" className="input" required />
      <select className="input" required>
        <option value="">Välj kategori</option>
        <option value="Svenskt">Svenskt</option>
        <option value="Asiatiskt">Asiatiskt</option>
      </select>
      <input type="text" placeholder="Ingredienser" className="input" required />
      <input type="text" placeholder="Allergener" className="input" />
      <input type="file" accept="image/*" className="input" />
      <button type="submit" className="btn btn-primary">Spara rätt</button>
    </form>
  );
};

export default DishForm;