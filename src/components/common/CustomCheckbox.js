import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather'; // uses check icon
import checkIcon from '../../assets/images/common/checkIcon.png'
const CustomCheckbox = ({ checked, onToggle, label, style }) => {
    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.8}
            style={{ flexDirection: 'row', alignItems: 'center', ...style }}
        >
            <View
                style={{
                    width: 22,
                    height: 22,
                    borderWidth: 1.5,
                    borderColor: checked ? 'green' : '#999',
                    borderRadius: 6,
                    backgroundColor: checked ? 'green' : 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {checked && <Image source={checkIcon} style={{ width: 20, height: 20, tintColor: '#fff' }} />}
            </View>
            {label ? (
                <Text style={{ marginLeft: 8, fontSize: 14, color: '#333' }}>{label}</Text>
            ) : null}
        </TouchableOpacity>
    );
};

export default CustomCheckbox;
