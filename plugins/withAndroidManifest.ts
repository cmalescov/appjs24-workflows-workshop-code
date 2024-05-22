import {AndroidConfig, withAndroidManifest} from "@expo/config-plugins";
import {ExpoConfig} from "expo/config";
import {camelToSnakeCase} from "./helpers";

function withAndroidManifestReceiver(config: ExpoConfig, widgetName: string) {
  return withAndroidManifest(config, async (androidManifestConfig) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      androidManifestConfig.modResults
    );
    mainApplication.receiver = mainApplication.receiver ?? [];

    mainApplication.receiver?.push({
      $: {
        "android:name": `.${widgetName}`,
        "android:exported": "false",
      } as any,
      "intent-filter": [
        {
          action: [
            {
              $: {
                "android:name": "android.appwidget.action.APPWIDGET_UPDATE",
              },
            },
            {
              $: {
                "android:name": `${androidManifestConfig.android?.package}.WIDGET_CLICK`,
              },
            },
          ],
        },
      ],
      "meta-data": {
        $: {
          "android:name": "android.appwidget.provider",
          "android:resource": `@xml/${camelToSnakeCase(widgetName)}_info`,
        },
      },
    } as any);
    return androidManifestConfig;
  });
}

export default withAndroidManifestReceiver;