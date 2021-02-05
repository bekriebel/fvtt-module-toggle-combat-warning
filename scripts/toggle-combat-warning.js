class ToogleCombatWarning {
  /**
    * Replaces the toggle combat action with our own
    *
    * @param {TokenHUD} hud - The HUD object.
    * @param {jQuery} html - The jQuery reference to the HUD HTML.
    * @param {Token} token - The data for the Token (unused).
  */
  static replaceToggleCombatClick(hud, html) {
    html.find(".combat").unbind("click").click(this._onToggleCombat.bind(this, hud));
  }

  /**
   * Toggle Token combat state, but warn if removing
   * @private
   */
  static async _onToggleCombat(hud, event) {
    event.preventDefault();

    // Get the token being toggeled
    const tokenObject = hud.object;

    // If the token is not in combat, add it without a warning
    if (!tokenObject.inCombat) {
      return this._reallyToggleCombat(tokenObject, event);
    }

    // If the token is in combat, warn before removing it
    return Dialog.confirm({
      title: game.i18n.localize("COMBAT.CombatantRemove"),
      content: game.i18n.format("TOGGLECOMBATWARNING.confirmToggleCombat", { actor: hud.object.name }),
      yes: () => this._reallyToggleCombat(tokenObject, event, true),
    });
  }

  /**
   * Toggle Token combat state with no warning
   * @private
   */
  static async _reallyToggleCombat(tokenObject, event, removeOnly = false) {
    if (!removeOnly || tokenObject.inCombat) {
      await tokenObject.toggleCombat();
      event.currentTarget.classList.toggle("active", tokenObject.inCombat);
    }
  }
}

/* -------------------------------------------- */
/*  Hook calls                                  */
/* -------------------------------------------- */
Hooks.on("renderTokenHUD", (...args) => {
  ToogleCombatWarning.replaceToggleCombatClick(...args);
});