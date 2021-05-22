import ToggleCombatWarning from "./ToggleCombatWarning.js";

/* -------------------------------------------- */
/*  Hook calls                                  */
/* -------------------------------------------- */

Hooks.on("renderTokenHUD", (...args) => {
  ToggleCombatWarning.replaceToggleCombatClick(...args);
});
