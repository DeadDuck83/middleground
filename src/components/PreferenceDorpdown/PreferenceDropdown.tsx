import React, { ChangeEvent, useState } from 'react';
import { Select, FormControl, FormLabel, Box, VStack } from '@chakra-ui/react';
import { preferenceArray } from '@/lib/preferences';

interface PreferenceOption {
  name: string;
  type: string;
}

interface PreferenceDropdownProps {
  label?: string;
  selectedPreferences: PreferenceOption[] | undefined;
  onSelect: (preference: PreferenceOption) => void;
}

const PreferenceDropdown: React.FC<PreferenceDropdownProps> = ({
  label,
  selectedPreferences,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    const selectedPreference = preferenceArray.find(
      preference => preference.type === event.target.value
    );
    if (selectedPreference) {
      onSelect(selectedPreference);
    }
  };

  return (
    <VStack spacing={4} alignItems="start">
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <Select value={selectedValue} onChange={handleChange}>
          <option value="">Select a preference</option>
          {preferenceArray.map(preference => (
            <option key={preference.type} value={preference.type}>
              {preference.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Box>
        <p>Selected Preferences:</p>
        <ul>
          {selectedPreferences?.map((preference, index) => (
            <li key={index}>{preference.name}</li>
          ))}
        </ul>
      </Box>
    </VStack>
  );
};

export default PreferenceDropdown;
