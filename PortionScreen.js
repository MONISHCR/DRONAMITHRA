
import { View, StyleSheet } from "react-native";
import Pdf from "react-native-view-pdf";

const PortionScreen = () => {
  const resourceUrl = require("./KR21.pdf"); // Replace with the actual file name and path if different

  return (
    <View style={styles.container}>
      <Pdf
        resource={resourceUrl}
        resourceType="file"
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pdf: {
    flex: 1,
    width: "100%",
  },
});

export default PortionScreen;
