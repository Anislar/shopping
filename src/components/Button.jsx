import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../constants/theme";

/**
 *this is component for primary button
 *
 * @param {string} title
 * title: title of the button
 * @param {function} onPress
 * onPress: function to be called when button is pressed
 * @param {React.ReactNode} Icon
 * Icon: icon to be displayed on the button
 * @param {object} props
 * props: other props
 * @returns
 */
const ButtonPrimary = ({ title, onPress, Icon, ...props }) => {
  return (
    <TouchableOpacity {...props} style={styles.cartBtn} onPress={onPress}>
      {Icon}
      <Text style={styles.cartBtnText}>{title} </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cartBtn: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  cartBtnText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});
export default ButtonPrimary;
