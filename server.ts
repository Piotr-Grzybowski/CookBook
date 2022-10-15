import app from "./app";
import debug from "debug";

const debugLog: debug.IDebugger = debug("app");

app.listen(3000, () => {
  debugLog(`Debugger running`);
  console.log(`Server listening on port 3000`);
});
