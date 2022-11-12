import React from 'react';
import css from './SelectCategory.module.css';

const SelectCategory = (props) => {
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
      <select value={props.value} onChange={(e) => props.cat(e.target.value)}>
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
