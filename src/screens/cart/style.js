import { StyleSheet } from "react-native";
import { hp } from "../../helpers/commons";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  totalContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: hp(2.5),
    marginTop: 10,
    fontWeight: "bold",
  },

  container_grid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: theme.colors.neutral(0.5),
    textAlign: "center",
    fontSize: hp(2.5),
  },
});
