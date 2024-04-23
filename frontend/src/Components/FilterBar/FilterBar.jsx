import React, { useState, useEffect } from 'react';
import './FilterBar.css';

function FilterBar({ setFilters, priceRange, numDoors, carType }) {
  const handlePriceRangeChange = (event) => {
    setFilters(prevFilters => ({ ...prevFilters, priceRange: event.target.value }));
  };

  const handleNumDoorsChange = (event) => {
    setFilters(prevFilters => ({ ...prevFilters, numDoors: event.target.value }));
  };

  const handleCarTypeChange = (event) => {
    setFilters(prevFilters => ({ ...prevFilters, carType: event.target.value }));
  };

  const clearFilters = () => {
    setFilters({ priceRange: '', numDoors: '', carType: '' });
  };

  useEffect(() => {
    const handlePriceRadioClick = () => {
      document.querySelectorAll('input[name="price"]').forEach(button => {
        button.parentElement.style.color = button.checked ? '#FFD369' : '';
      });
    };

    const handleDoorsRadioClick = () => {
      document.querySelectorAll('input[name="doors"]').forEach(button => {
        button.parentElement.style.color = button.checked ? '#FFD369' : '';
      });
    };

    const handleTypeRadioClick = () => {
      document.querySelectorAll('input[name="type"]').forEach(button => {
        button.parentElement.style.color = button.checked ? '#FFD369' : '';
      });
    };

    document.querySelectorAll('input[name="price"]').forEach(button => {
      button.addEventListener('click', handlePriceRadioClick);
    });

    document.querySelectorAll('input[name="doors"]').forEach(button => {
      button.addEventListener('click', handleDoorsRadioClick);
    });

    document.querySelectorAll('input[name="type"]').forEach(button => {
      button.addEventListener('click', handleTypeRadioClick);
    });

    return () => {
      document.querySelectorAll('input[name="price"]').forEach(button => {
        button.removeEventListener('click', handlePriceRadioClick);
      });

      document.querySelectorAll('input[name="doors"]').forEach(button => {
        button.removeEventListener('click', handleDoorsRadioClick);
      });

      document.querySelectorAll('input[name="type"]').forEach(button => {
        button.removeEventListener('click', handleTypeRadioClick);
      });
    };
  }, []);

  return (
    
    <div className="sidebar">
      <form>
      <h2>Filters</h2>
      <div className="filter">
        <label>Price Range:</label>
        <div className="radio-group">
          <label>
            <input
              name="price"
              type="radio"
              value="0-29"
              checked={priceRange === '0-29'}
              onChange={handlePriceRangeChange}
            />
            $0 - $29
          </label>
          <label>
            <input
             name="price"
              type="radio"
              value="30-59"
              checked={priceRange === '30-59'}
              onChange={handlePriceRangeChange}
            />
            $30 - $59
          </label>
          <label>
            <input
            name="price"
              type="radio"
              value="60-99"
              checked={priceRange === '60-99'}
              onChange={handlePriceRangeChange}
            />
            $60 - $99
          </label>
          <label>
            <input
            name="price"
              type="radio"
              value="100-149"
              checked={priceRange === '100-149'}
              onChange={handlePriceRangeChange}
            />
            $100 - $149
          </label>
          <label>
            <input
            name="price"
              type="radio"
              value="150-199"
              checked={priceRange === '150-199'}
              onChange={handlePriceRangeChange}
            />
            $150 - $199
          </label>
          <label>
            <input
            name="price"
              type="radio"
              value="200+"
              checked={priceRange === '200+'}
              onChange={handlePriceRangeChange}
            />
            $200+
          </label>
        </div>
      </div>
      <div className="filter">
        <label>Number of Doors:</label>
        <div className="radio-group">
          <label>
            <input
            name="doors"
              type="radio"
              value="2"
              checked={numDoors === '2'}
              onChange={handleNumDoorsChange}
            />
            2 Doors
          </label>
          <label>
            <input
            name="doors"
              type="radio"
              value="4"
              checked={numDoors === '4'}
              onChange={handleNumDoorsChange}
            />
            4 Doors
          </label>
        </div>
      </div>
      <div className="filter">
        <label>Car Type:</label>
        <div className="radio-group">
          <label>
            <input
            name="type"
              type="radio"
              value="SUV"
              checked={carType === 'SUV'}
              onChange={handleCarTypeChange}
            />
            SUV
          </label>
          <label>
            <input
            name="type"
              type="radio"
              value="Sedan"
              checked={carType === 'Sedan'}
              onChange={handleCarTypeChange}
            />
            Sedan
          </label>
          <label>
            <input
            name="type"
              type="radio"
              value="Sport"
              checked={carType === 'Sport'}
              onChange={handleCarTypeChange}
            />
            Sport
          </label>
        </div>
      </div>
      <button onClick={clearFilters}>Clear Filters</button>
      </form>
    </div>
  );
}

export default FilterBar;
