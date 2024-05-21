import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/commons";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: hp(2.5),
    fontWeight: theme.fontWeights.bold,
    marginBottom: 8,
    color: theme.colors.neutral("0.8"),
  },
  headerSubText: { color: theme.colors.neutral("0.8"), opacity: 0.75 },

  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  cartText: {
    borderRadius: theme.raduis.xl,
    backgroundColor: theme.colors.danger,
    color: theme.colors.white,
    fontWeight: "bold",
    width: hp(2.5),
    textAlign: "center",
    height: hp(2.5),
    fontSize: hp(1.7),
  },

  list: {
    flex: 1,
    padding: 5,
  },
  errorText: {
    color: theme.colors.danger,
    textAlign: "center",
    fontSize: hp(2.8),
  },
  container_grid: {
    flex: 1,
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: theme.colors.neutral("0.6"),
    textAlign: "center",
    fontSize: hp(2.5),
  },
});
