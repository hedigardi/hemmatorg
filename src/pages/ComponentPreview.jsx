import React, { useState } from 'react';
import Button from '../components/form/Button';
import TextInput from '../components/form/TextInput';
import Textarea from '../components/form/Textarea';
import FileInput from '../components/form/FileInput';
import CheckboxGroup from '../components/form/CheckboxGroup';
import DishCard from '../components/DishCard';

const mockDish = {
  image: 'https://www.jetpunk.com/img/user-img/f6/f689ded540-450.webp',
  title: 'Vegetarisk lasagne',
  description: 'Klassisk italiensk lasagne med zucchini och aubergine.',
  price: 99,
  rating: 4.5
};

export default function ComponentPreview() {
  const [checkboxes, setCheckboxes] = useState(['vegan']);
  const [file, setFile] = useState(null);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🧩 Komponentförhandsvisning</h1>

      <section>
        <h2 className="text-xl font-semibold text-orange-500">Knappkomponenter</h2>
        <div className="flex gap-4 mt-2">
          <Button variant="primary">Primär</Button>
          <Button variant="secondary">Sekundär</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-orange-500">Formulärfält</h2>
        <TextInput label="TextInput" name="name" value="" onChange={() => {}} />
        <Textarea label="Textarea" name="desc" value="" onChange={() => {}} />
        <FileInput label="FileInput" name="img" onChange={(e) => setFile(e.target.files[0])} />
        <CheckboxGroup
          label="CheckboxGroup"
          options={[
            { label: 'Vegan', value: 'vegan' },
            { label: 'Glutenfri', value: 'glutenfri' },
          ]}
          selected={checkboxes}
          onChange={setCheckboxes}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-orange-500">Maträttskort</h2>
        <DishCard dish={mockDish} onClick={() => alert('Klick!')} />
      </section>
    </div>
  );
}