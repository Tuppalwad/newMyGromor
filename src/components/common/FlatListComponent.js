import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, TextInput, Platform, Dimensions, FlatList, StyleSheet } from 'react-native';
import Errordisplaycomponent from '../Error-display-component';
import { View_Spacing, width } from "../../config/resposiveSize";

const FlatlistComponent = ({ data, renderItemCard, EmptyContent = "", horizontal = false, dynamicFooterComponent,dynamicHeaderComponent,flatlistRef,
    numColumns = 1, ListFooterPadding = View_Spacing.VS_H2, loading = true, ListFooterComponentStatus = true,ListHeaderComponentStatus = true,Error_Image,
    emptyStatus = true, headerStatus = true, Error_Message = "", onMomentumScrollBegin, refreshControl,onScroll,initialNumToRender = 10,
    onEndReached,contentContainerStyle,liststyle={ flex: 1},ItemSeparatorPadding = View_Spacing.VS_H2,Error_Status = false,onScrollBeginDrag}) => {

    return (
        <FlatList
            data={data ?? []}
            onScroll={onScroll}
            keyExtractor={(item, index) => index.toString()}
            style={liststyle}
            numColumns={numColumns}
            ref={flatlistRef}
            initialNumToRender={initialNumToRender}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            horizontal={horizontal}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onEndReached={onEndReached}
            refreshControl={refreshControl}
            contentContainerStyle={contentContainerStyle}
            removeClippedSubviews={false}
            onScrollBeginDrag={onScrollBeginDrag}
            renderItem={(item, index) => renderItemCard(item, index)}
            ListHeaderComponent={ListHeaderComponentStatus?<View style={{ height: !headerStatus ? 0 : View_Spacing.VS_H2 }}></View> : dynamicHeaderComponent}
            ListFooterComponent={ListFooterComponentStatus ? <View style={{ height: ListFooterPadding }}></View> : dynamicFooterComponent}
            ItemSeparatorComponent={() => {
                return (<View style={{ height: ItemSeparatorPadding }} />)
            }}
            ListEmptyComponent={() => {
                if (!loading && emptyStatus) {
                    return (
                        <View style={{ flex: 1, justifyContent: "center", }}>
                            <Errordisplaycomponent
                                Error_Title={EmptyContent}
                                Error_Message={Error_Message ?? ""}
                                Error_Image={Error_Image}
                                Error_Status={Error_Status}
                            />
                        </View>
                    );
                }
                return null;
            }}
        />
    )
};

export default FlatlistComponent;

const style = props =>
    StyleSheet.create({

    });
