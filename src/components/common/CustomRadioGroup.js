import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const CustomRadioGroup = ({ selected, onSelect }) => {
    const options = ['Yes', 'No'];

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onSelect(option)}
                    activeOpacity={0.8}
                    style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                >
                    <View
                        style={{
                            width: 18,
                            height: 18,
                            borderRadius: 9,
                            borderWidth: 2,
                            borderColor: selected === option ? 'green' : '#999',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {selected === option && (
                            <View
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'green',
                                }}
                            />
                        )}
                    </View>

                    <Text
                        style={{
                            marginLeft: 6,
                            fontSize: 14,
                            color: '#333',
                        }}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CustomRadioGroup;
