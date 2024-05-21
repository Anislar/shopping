import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { hp, wp } from "../helpers/commons";
import { theme } from "../constants/theme";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/reducer/productReducers";

/**
 * this component is used to display categories in Home screen
 *
 * @returns
 */
export const Categories = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.product);

  return (
    <View
      style={{
        height: hp(12),
        backgroundColor: theme.colors.white,
      }}>
      <FlatList
        initialScrollIndex={0}
        keyExtractor={(item) => item}
        data={[
          "all",
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ]}
        ref={ref}
        scrollIndicatorInsets={{ right: 1 }}
        horizontal
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              dispatch(setFilter(item));
              if (index === 0) return;
              ref?.current?.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5,
              });
            }}
            key={item}>
            <Animated.View
              entering={FadeInRight.delay(200 * item).springify()}
              style={[
                styles.category,

                filter === item
                  ? {
                      backgroundColor: theme.colors.black,
                    }
                  : {
                      backgroundColor: theme.colors.white,
                      borderColor: theme.colors.neutral(0.5),
                      borderWidth: 0.5,
                    },
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      filter === item ? theme.colors.white : theme.colors.black,
                  },
                ]}>
                {item}
              </Text>
            </Animated.View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    minWidth: wp(14),

    padding: 12,
    borderRadius: theme.raduis.xxl,
    margin: 10,
    marginVertical: 22,
  },
  categoryText: {
    textAlign: "center",
    fontSize: hp(1.7),
    textTransform: "capitalize",
  },
});
