import registerModuleSettings from "./registerModuleSettings.js";
import ToggleCombatWarning from "../ToggleCombatWarning.js";

/* -------------------------------------------- */
/*  Hook calls                                  */
/* -------------------------------------------- */

Hooks.once("init", () => {
  // Register module settings
  registerModuleSettings();
});

Hooks.on("renderTokenHUD", (...args) => {
  ToggleCombatWarning.replaceToggleCombatClick(...args);
});
