import {ExpoConfig} from "expo/config";
import {AndroidConfig, withStringsXml} from "@expo/config-plugins";

function withWidgetDescription(config: ExpoConfig) {
  return withStringsXml(config, (stringsXml) => {
    stringsXml.modResults = AndroidConfig.Strings.setStringItem(
      [
        {
          $: {
            name: `app_widget_description`,
            translatable: "false",
          },
          _: "a widget that says hello",
        },
      ],
      stringsXml.modResults
    );
    return stringsXml;
  });
}

export default withWidgetDescription;