import { Input } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';

export default (props: { title: string; value: string; onChangeText: (val: string) => void }) => {
  return (
    <div className="flex flex-row items-center justify-center w-full mt-4">
      <Text className="mr-4 text-1xl font-bold items-center">{props.title}</Text>
      <Input
        className="flex-nowrap text-nowrap w-auto"
        value={props.value ?? ''}
        onChange={(e) => {
          props.onChangeText(e.target.value);
        }}
        type="textarea"
        placeholder="Enter message to sign"
      />
    </div>
  );
};
