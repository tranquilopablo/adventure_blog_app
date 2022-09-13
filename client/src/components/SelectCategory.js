import React, { useState } from 'react';
import css from './SelectCategory.module.css';

const SelectCategory = () => {
  const [category, setCategory] = useState('Europa');

  const categories = [
    'Azja',
    'Europa',
    'Afryka',
    'Ameryka Płd.',
    'Australia i Oceania',
    'Ameryka Pół.',
    'Antarktyda',
  ];
  return (
    <div className={css.selectWrapper}>
      <label className={css.selectInputLabel}>Wybierz kategorię:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((category) => (
          <option className={css.option} key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;
