import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { Icon } from '../../../assets/images/index';
import CTText from '../ctText';
import { RFValue } from 'react-native-responsive-fontsize';
// import { palette, typography } from '../../theme';
import { UserManager } from '../../storage';
import { height } from '../../config/resposiveSize';
import { palette } from '../../theme/color';
import { typography } from '../../theme/typography';
const DropdownComponet = ({
    data = [1, 2, 3],
    containerStyle,
    rowContainerStyle,
    value,
    value_Image,
    title,
    read = true,
    border = true,
    valueColor = '#000000',
    itemStyle,
    onSelect,
    error,
    errorText,
    eachWidth = 120,
    full = false,
    onPressRead,
    isSearch,
    fieldKey,
    disabled,
    mandatory,
    Country_DD = false,
    placeholder = 'Select',
    titleBold = false,
    titleCountStatus = false,
    titleCount = '',
    multiSelect = false,
    popupModal = false,
    multiValue = [],
}) => {
    const colors = palette;
    const font = typography;
    const appLanguage = UserManager?.getAppMultiLanguage;

    const styles = style(colors);
    const [size, setSize] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const ref = useRef();
    const [keyHeight, setkeyHeight] = useState(0);
    const [tempData, setTempData] = useState();

    useEffect(() => {
        setTempData(data);
    }, [data]);

    useEffect(() => {
        const temp = [...data];
        setTempData(temp);
    }, [open]);

    useEffect(() => {
        // console.log('SIZE', size);
    }, [size]);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidChange);

        // cleanup function
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    // console.log("editable 11",disabled);
    const keyboardDidShow = e => {
        ref.current &&
            ref.current?.measureInWindow &&
            ref.current.measureInWindow((x, y, width, height) => {
                setSize({ width, height, x, y });
                setkeyHeight(e.endCoordinates.height);
            });
    };
    const _keyboardDidChange = e => {
        ref.current &&
            ref.current?.measureInWindow &&
            ref.current.measureInWindow((x, y, width, height) => {
                setSize({ width, height, x, y });
                setkeyHeight(0);
            });
    };

    var { width, height } = Dimensions.get('window');
    height = height - keyHeight;

    const hasHeight = () => {
        if (height > size.y + size.height + 140) {
        }
        // // console.log('Height', height > size.y + size.height + 140);
        return isSearch
            ? height > size.y + size.height + 140 + 45
            : height > size.y + size.height + 140;
    };

    const renderModal = () => {
        // // console.log('size', size);
        if (open)
            return (
                <Modal
                    visible={open}
                    onRequestClose={() => setOpen(false)}
                    transparent={true}>
                    <View style={{ flex: 1 }}>
                        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                            <View style={{ flex: 1 }}>
                                <View
                                    style={[
                                        styles.dropdown,
                                        hasHeight()
                                            ? {
                                                top: error
                                                    ? size.y + size.height - 25
                                                    : size.y + size.height,
                                                width: full ? size.width : eachWidth,
                                            }
                                            : {
                                                top: isSearch
                                                    ? size.y -
                                                    (data.length > 3 ? 120 : data.length * 40) -
                                                    45
                                                    : size.y - (data.length > 3 ? 105 : 45),
                                                width: full ? size.width : eachWidth,
                                            },
                                        { start: full ? size.x : size.x + size.width - eachWidth },
                                    ]}>
                                    {hasHeight() && (
                                        <View style={[styles.triangleContainer]}>
                                            <Image
                                                style={[
                                                    styles.triangle,
                                                    { transform: [{ rotate: '180deg' }] },
                                                ]}
                                                source={Icon.dropdown}
                                                resizeMode={'contain'}
                                            />
                                        </View>
                                    )}

                                    <View
                                        style={[
                                            isSearch && {
                                                backgroundColor: colors.lightWhite,
                                                alignItems: 'center',
                                                borderRadius: 4,
                                                padding: 6,
                                                borderColor: colors.disabled_Button,
                                                borderWidth: (width / 100) * 0.5,
                                            },
                                        ]}>
                                        {isSearch && (
                                            <View style={styles.searchView}>
                                                <TextInput
                                                    value={search}
                                                    onChangeText={val => {
                                                        setSearch(val);
                                                        var temp = [...data];
                                                        temp = temp.filter(item =>
                                                            fieldKey
                                                                ? item[fieldKey]
                                                                    .toLowerCase()
                                                                    .includes(val.toLowerCase())
                                                                : item
                                                                    .toLowerCase()
                                                                    .includes(val.toLowerCase()),
                                                        );
                                                        setTempData(temp);
                                                    }}
                                                    style={[
                                                        styles.input,
                                                        {
                                                            fontFamily:
                                                                search && search !== ''
                                                                    ? font.semiBold
                                                                    : font.light,
                                                        },
                                                    ]}
                                                    placeholder={appLanguage?.search ?? 'Search'}
                                                    placeholderTextColor={'#888888'}
                                                />
                                                <Image
                                                    source={Icon.search}
                                                    resizeMode={'contain'}
                                                    style={styles.search}
                                                />
                                            </View>
                                        )}

                                        <FlatList
                                            data={tempData}
                                            persistentScrollbar
                                            showsVerticalScrollIndicator
                                            keyboardShouldPersistTaps={'handled'}
                                            keyExtractor={(item, index) => index.toString()}
                                            style={{
                                                flex: 1,
                                                maxHeight:
                                                    Country_DD == true
                                                        ? 90 * 3
                                                        : popupModal == true
                                                            ? 45 * 3
                                                            : 60 * 3,
                                                width: '100%',
                                                backgroundColor: colors.lightWhite,
                                                elevation: 2,
                                                borderWidth: isSearch ? 0 : 1,
                                                borderRadius: 4,
                                                borderColor: colors.cardBorder,
                                                padding: 1,
                                                // borderWidth: 1
                                            }}
                                            contentContainerStyle={{}}
                                            ListEmptyComponent={() => {
                                                if (tempData && tempData?.length === 0) {
                                                    return (
                                                        <View
                                                            style={[
                                                                { flex: 1, padding: 5, justifyContent: 'center' },
                                                                itemStyle,
                                                            ]}>
                                                            <CTText
                                                                semiBold={true}
                                                                textColor={colors.gray}
                                                                text={
                                                                    appLanguage?.lblnothingtoshow ??
                                                                    'There is nothing to show'
                                                                }
                                                            />
                                                        </View>
                                                    );
                                                }
                                                return null;
                                            }}
                                            renderItem={({ item, index }) => {
                                                const isSelected = fieldKey
                                                    ? item[fieldKey] === value
                                                    : item === value;
                                                return (
                                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                                        {multiSelect == true ? (
                                                            <TouchableOpacity
                                                                style={[styles.itemMultiContainer, itemStyle]}
                                                                onPress={() => {
                                                                    Keyboard.dismiss();
                                                                    onSelect?.(item, index, item);
                                                                    setOpen(false);
                                                                    setSearch('');
                                                                }}>
                                                                <View
                                                                    style={{
                                                                        flex: isSelected ? 0.9 : 1,
                                                                        justifyContent: 'center',
                                                                    }}>
                                                                    <CTText
                                                                        semiBold={isSelected}
                                                                        medium={!isSelected}
                                                                        textColor={
                                                                            isSelected ? colors.black : colors.gray
                                                                        }
                                                                        text={fieldKey ? item[fieldKey] : item}
                                                                    />
                                                                </View>

                                                                {isSelected && (
                                                                    <View
                                                                        style={{
                                                                            flex: 0.1,
                                                                            justifyContent: 'center',
                                                                        }}>
                                                                        <Image
                                                                            style={{ width: 20, height: 20 }}
                                                                            source={Icon.tick}
                                                                            resizeMode={'contain'}
                                                                        />
                                                                    </View>
                                                                )}
                                                            </TouchableOpacity>
                                                        ) : (
                                                            <TouchableOpacity
                                                                style={[styles.itemContainer, itemStyle]}
                                                                onPress={() => {
                                                                    Keyboard.dismiss();
                                                                    onSelect?.(item, index, item);
                                                                    setOpen(false);
                                                                    setSearch('');
                                                                }}>
                                                                <CTText
                                                                    semiBold={isSelected}
                                                                    medium={!isSelected}
                                                                    textColor={
                                                                        isSelected ? colors.black : colors.gray
                                                                    }
                                                                    text={fieldKey ? item[fieldKey] : item}
                                                                />
                                                            </TouchableOpacity>
                                                        )}
                                                    </View>
                                                );
                                            }}
                                        />
                                    </View>
                                    {!hasHeight() && (
                                        <View style={[styles.triangleContainer]}>
                                            <Image
                                                style={[styles.triangle]}
                                                source={Icon.dropdown}
                                                resizeMode={'contain'}
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            );
    };

    return (
        <View
            style={[styles.container, containerStyle]}
            ref={ref}
            onLayout={event => {
                var { x, y, width, height } = event.nativeEvent.layout;
                // console.log('Size', event.nativeEvent.layout);
                setSize(event.nativeEvent.layout);
            }}>
            {title && (
                <View style={styles.titleContainer}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <CTText
                            text={title ?? ' '}
                            textColor={titleBold ? colors.gray : colors.gray}
                            style={{ fontSize: RFValue(12) }}
                            medium={!titleBold}
                            bold={titleBold}
                        />
                        {mandatory && (
                            <CTText
                                text={'*'}
                                textColor={colors.red}
                                style={{ fontSize: RFValue(12) }}
                                medium
                            />
                        )}
                    </View>
                    {read && (
                        <TouchableOpacity
                            style={styles.readInstructions}
                            onPress={onPressRead}>
                            <Image
                                source={Icon.info}
                                resizeMode={'contain'}
                                style={styles.info}
                            />
                            <CTText
                                text={appLanguage?.lblReadinstructions ?? 'Read instructions'}
                                textColor={colors.darkblue}
                                fontSize={RFValue(12)}
                                semiBold
                                underline
                            />
                        </TouchableOpacity>
                    )}

                    {titleCountStatus && (
                        <CTText
                            text={titleCount}
                            textColor={colors.darkblue}
                            fontSize={RFValue(12)}
                            bold
                        />
                    )}
                </View>
            )}

            <TouchableOpacity
                style={[
                    styles.rowContainer,
                    rowContainerStyle,
                    disabled && { backgroundColor: colors.carddisabled },
                    error && { borderColor: colors.percent, borderWidth: 1 },
                ]}
                disabled={disabled}
                onLayout={() => {
                    ref.current &&
                        ref.current?.measureInWindow &&
                        ref.current.measureInWindow((x, y, width, height) => {
                            setSize({ width, height, x, y });
                        });
                }}
                onPress={() => {
                    ref.current &&
                        ref.current?.measureInWindow &&
                        ref.current.measureInWindow((x, y, width, height) => {
                            setSize({ width, height, x, y });
                            setOpen(true);
                        });
                }}>
                {value ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {Country_DD == true ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                <View
                                    style={{
                                        flex: value_Image == '' ? 0 : 0.1,
                                        justifyContent: 'center',
                                    }}>
                                    {value_Image == '' ? null : (
                                        <Image
                                            style={{ width: 20, height: 20 }}
                                            source={{ uri: value_Image }}
                                            resizeMode={'contain'}
                                        />
                                    )}
                                </View>
                                <View
                                    style={{
                                        flex: value_Image == '' ? 1 : 0.9,
                                        justifyContent: 'center',
                                    }}>
                                    <CTText
                                        text={value}
                                        textColor={valueColor}
                                        semiBold
                                        fontSize={RFValue(13)}
                                    />
                                </View>
                            </View>
                        ) : (
                            <CTText
                                text={value}
                                textColor={valueColor}
                                fontSize={RFValue(13)}
                            />
                        )}
                    </View>
                ) : (
                    <CTText
                        text={appLanguage?.lblselectvalue ?? 'Select'}
                        textColor={colors.placeholderColor}
                        fontSize={RFValue(13)}
                    />
                )}
                <Image
                    source={Icon.dropdown}
                    style={styles.icon}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>

            {border && (
                <View style={[styles.border, error && { backgroundColor: colors.red }]} />
            )}

            {/* {error && (
        <CTText
          fontSize={RFValue(13)}
          text={errorText}
          textColor={error ? colors.red : colors.green}
          style={{ marginTop: 10 }}
        />
      )} */}
            {renderModal()}
        </View>
    );
};
export default DropdownComponet;

const style = props => {
    return StyleSheet.create({
        container: {
            marginVertical: 10,
        },
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        readInstructions: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        info: {
            width: 14,
            height: 14,
            marginEnd: 5,
        },
        rowContainer: {
            borderWidth: 1,
            borderColor: palette.lightOrangerBorder,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginTop: 6,
            justifyContent: 'space-between',
        },
        icon: {
            width: 15,
            height: 15,
            tintColor: palette.gray,
        },
        border: {
            height: 1.6,
            borderRadius: 3,
            backgroundColor: palette.border,
        },
        dropdown: {
            position: 'absolute',
        },
        itemContainer: {
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: 'center',
        },
        itemMultiContainer: {
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: 'center',
            flexDirection: 'row',
        },
        triangle: {
            width: 15,
            height: 8,
            tintColor: palette.white,
            alignSelf: 'flex-end',
            marginEnd: 10,
        },
        triangleContainer: {
            elevation: 2,
        },
        searchView: {
            borderRadius: 20,
            backgroundColor: palette.lightWhite,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: 12,
            elevation: 3,
            marginBottom: 10,
            height: (height / 100) * 5,
            shadowColor: palette.black,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 1,
            borderColor: palette.lightYellowBorder,
            borderWidth: 1,
        },
        input: {
            flex: 1,
            fontSize: RFValue(12),
            color: palette.black,
            height: 30,
            padding: 0,
        },
        search: {
            tintColor: '#BFCBD8',
            width: 14,
            height: 15,
        },
    });
};
