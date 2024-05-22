import {ExpoConfig} from "expo/config";
import {withDangerousMod} from "@expo/config-plugins";
import path from "path";
import fs from "fs";
import {camelToSnakeCase} from "./helpers";

function withWidgetFiles(
  config: ExpoConfig,
  widgetName: string,
  widgetPath: string
) {
  return withDangerousMod(config, [
    "android",
    (dangerousConfig) => {
      const widgetFilesRoot = path.join(
        dangerousConfig.modRequest.projectRoot,
        widgetPath
      );

      const appPackageFolder = path.join(
        dangerousConfig.modRequest.platformProjectRoot,
        "app/src/main/java/" + config.android?.package?.split(".").join("/")
      );
      fs.copyFileSync(
        path.join(widgetFilesRoot, "HelloAppWidget.kt"),
        path.join(appPackageFolder, `${widgetName}.kt`)
      );

      const resFolder = path.join(
        dangerousConfig.modRequest.platformProjectRoot,
        "app/src/main/res"
      );

      fs.mkdirSync(path.join(resFolder, "xml"), {recursive: true});
      const widgetInfoFilename = `${camelToSnakeCase(widgetName)}_info.xml`;
      fs.copyFileSync(
        path.join(widgetFilesRoot, widgetInfoFilename),
        path.join(resFolder, "xml", widgetInfoFilename)
      );

      fs.mkdirSync(path.join(resFolder, "layout"), {recursive: true});
      const widgetLayoutFilename = `${camelToSnakeCase(widgetName)}.xml`;
      fs.copyFileSync(
        path.join(widgetFilesRoot, widgetLayoutFilename),
        path.join(resFolder, "layout", widgetLayoutFilename)
      );

      return dangerousConfig;
    },
  ]);
}

export default withWidgetFiles;