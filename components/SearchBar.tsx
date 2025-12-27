import { icons } from "@/constants/icons";
import React, { Dispatch, SetStateAction } from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = ({
  onPress,
  placeholder,
  query,
  setQuery,
}: {
  onPress?: () => void;
  placeholder: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholderTextColor="#ab8bff"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
