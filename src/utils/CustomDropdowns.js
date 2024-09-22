// src/components/CustomDropdowns.js
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';

export const GenderDropdown = ({ id, value, onChange, className }) => {
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  return (
    <Dropdown
      id={id}
      value={value}
      onChange={onChange}
      options={genderOptions}
      placeholder="Select Gender"
      className={className}
    />
  );
};

export const BloodGroupDropdown = ({ id, value, onChange, className }) => {
  const bloodGroupOptions = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' }
  ];

  return (
    <Dropdown
      id={id}
      value={value}
      onChange={onChange}
      options={bloodGroupOptions}
      placeholder="Select Blood Group"
      className={className}
    />
  );
};
export const ColorDropdown = ({ id, value, onChange, className }) => {
  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
  ];

  return (
    <MultiSelect
    id={id}
    value={value}
    onChange={onChange}
    options={colorOptions}
    optionLabel="label"
    placeholder="Select Colors"
    className={className}
    display="chip"
    />
  );
};

export const MaterialDropdown = ({ id, value, onChange, className }) => {
  const materialOptions = [
    { label: 'Cotton', value: 'cotton' },
    { label: 'Polyester', value: 'polyester' },
    { label: 'Leather', value: 'leather' },
    { label: 'Wool', value: 'wool' },
    { label: 'Silk', value: 'silk' },
  ];

  return (
    <MultiSelect
    id={id}
    value={value}
    onChange={onChange}
    options={materialOptions}
    optionLabel="label"
    placeholder="Select Materials"
    className={className}
    display="chip"
    />
  );
};
export const EventTypeDropdown = ({ id, value, onChange, className }) => {
  const eventTypeOptions = [
    { label: 'Conference', value: 'conference' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Seminar', value: 'seminar' },
    { label: 'Webinar', value: 'webinar' },
  ];

  return (
    <Dropdown
      id={id}
      value={value}
      onChange={onChange}
      options={eventTypeOptions}
      optionLabel="label"
      placeholder="Select Event Types"
      className={className}
      display="chip"
    />
  );
};

// Dropdown for Inclusions
export const InclusionsDropdown = ({ id, value, onChange, className }) => {
  const inclusionOptions = [
    { label: 'Lunch', value: 'lunch' },
    { label: 'Materials', value: 'materials' },
    { label: 'Certificate', value: 'certificate' },
  ];

  return (
    <MultiSelect
      id={id}
      value={value}
      onChange={onChange}
      options={inclusionOptions}
      optionLabel="label"
      placeholder="Select Inclusions"
      className={className}
      display="chip"
    />
  );
};

// Dropdown for Allowed Items
export const AllowedItemsDropdown = ({ id, value, onChange, className }) => {
  const allowedOptions = [
    { label: 'Pets', value: 'pets' },
    { label: 'Food', value: 'food' },
    { label: 'Drinks', value: 'drinks' },
  ];

  return (
    <MultiSelect
      id={id}
      value={value}
      onChange={onChange}
      options={allowedOptions}
      optionLabel="label"
      placeholder="Select Allowed Items"
      className={className}
      display="chip"
    />
  );
};

// Dropdown for Not Allowed Items
export const NotAllowedItemsDropdown = ({ id, value, onChange, className }) => {
  const notAllowedOptions = [
    { label: 'Smoking', value: 'smoking' },
    { label: 'Alcohol', value: 'alcohol' },
    { label: 'Outside Food', value: 'outside_food' },
  ];

  return (
    <MultiSelect
      id={id}
      value={value}
      onChange={onChange}
      options={notAllowedOptions}
      optionLabel="label"
      placeholder="Select Not Allowed Items"
      className={className}
      display="chip"
    />
  );
};