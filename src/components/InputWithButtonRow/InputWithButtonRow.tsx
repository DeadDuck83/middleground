import { useState } from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';

interface Props {
  placeholder: string;
  preferences: string[];
  setPreferences: (preferences: string[]) => void;
  eventID: string;
}

const InputWithButtonRow = ({
  placeholder,
  preferences,
  setPreferences,
  eventID,
}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddPreference = () => {
    console.log('inputValue', inputValue);
    if (inputValue) {
      setPreferences([...preferences, inputValue]);
      setInputValue('');
    }
  };

  return (
    <Flex>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        mr={2}
      />
      <Button colorScheme="blue" onClick={handleAddPreference}>
        Add
      </Button>
    </Flex>
  );
};

export default InputWithButtonRow;
