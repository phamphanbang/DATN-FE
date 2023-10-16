import { HStack, Text } from '@chakra-ui/react';
import { SelectField } from 'common/components/SelectField';
import { ChangeEvent } from 'react';
import { option } from 'common/types';

interface PageSizeProps {
  noOfRows: option[];
  onChange: (value: number) => void;
  defaultValue?: number;
  value?: number;
}

export const PageSize = ({
  noOfRows,
  onChange,
  defaultValue,
  value,
}: PageSizeProps) => {

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(+event?.target.value);
  };

  return (
    <HStack spacing={0}>
      <Text whiteSpace="nowrap" fontSize="xs">
        Rows per page
      </Text>
      <SelectField
        defaultValue={defaultValue}
        value={value}
        options={noOfRows}
        variant="ghost"
        size="xs"
        mt="-3px"
        ml="10px"
        fontSize="sm"
        onChange={handleChange}
        // background={bg}
        // color={color}
      />
    </HStack>
  );
};
