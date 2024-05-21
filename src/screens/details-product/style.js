import { StyleSheet } from "react-native";
import { hp } from "../../helpers/commons";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2),
    padding: 20,
    borderBottomWidth: 1,
    elevation: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    marginHorizontal: theme.space.xl,
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    objectFit: "contain",
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: "#444",
  },
});
