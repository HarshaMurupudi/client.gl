import { useState, useRef } from 'react';
import { Autocomplete, Loader } from '@mantine/core';

export const AutocompleteLoading = ({value, data, handleChange, onSubmit, loading, label, disabled, placeholder="Job", handleKeyDown}) => {


  return (
    <Autocomplete
      value={value}
      data={data}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      onItemSubmit={onSubmit}
      onKeyDown={handleKeyDown}
    />
  );
}