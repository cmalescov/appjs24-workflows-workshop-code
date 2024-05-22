import {ConfigPlugin} from "@expo/config-plugins";
import withWidgetFiles from "./withWidgetFiles";
import withWidgetDescription from "./withWidgetDescription";
import withAndroidManifestReceiver from "./withAndroidManifest";

const withAndroidWidget: ConfigPlugin = (config) => {
  const widgetName = "HelloAppWidget";
  const widgetPath = "widgets/android";

  config = withWidgetDescription(config);
  config = withWidgetFiles(config, widgetName, widgetPath);
  config = withAndroidManifestReceiver(config, widgetName);
  return config;
};

export default withAndroidWidget;