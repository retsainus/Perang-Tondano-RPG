/*:
 * @plugindesc CGMV Crafting
 * @author Casper Gaming
 * @help
 * ==============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ==============================================================================
 * Become a Patron to get access to a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ==============================================================================
 * Version: 1.0
 * ------------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.1+
 * ------------------------------------------------------------------------------
 * Description: This plugin creates a crafting system for your game.
 * ------------------------------------------------------------------------------
 * Documentation:
 * Recipes have 4 categories of items associated with them: "Products", "Fail
 * Products", "Tools", and "Ingredients".
 * - Products are items that are received by the player directly into the
 *   inventory on a successful craft.
 * - Fail Products are items that are received by the player directly into the
 *   inventory on a failed craft. These do not show up on the crafting window
 *   and is an optional parameter.
 * - Tools are items that are required to craft the recipe, but which are NOT
 *   consumed on craft.
 * - Ingredients are items that are required to craft the recipe, and are
 *   consumed on craft.
 *
 * You can make items that, when used, will cause a recipe to be learned.
 * To do so, put the following tag in its notebox:
 * <cgmvrecipe:RecipeName>
 * And replace RecipeName with the name of the recipe.
 *
 * This plugin supports the following commands:
 * CGMVRecipes Scene
 * - This calls the crafting scene from an event.
 *
 * CGMVRecipes Scene ProfessionName
 * - This calls the crafting scene and only displays recipes of a certain
 *   profession type. Replace "ProfessionName" with the profession type.
 *
 * CGMVRecipes Discover RecipeName true/false
 * - This will set the discovered status of the recipe with the corresponding
 *   recipe name.
 * 
 * CGMVRecipes Initialize
 * - This will reinitialize all recipe data. Only used for debug purposes or
 *   where new recipe data is not showing in saved games that were saved
 *   before the new data was added.
 *
 * This plugin works well with my Professions plugin found at:
 * https://forums.rpgmakerweb.com/index.php?threads/cgmv-professions.95897/
 * This plugin can have its scene added to the menu via my menu command plugin:
 * https://forums.rpgmakerweb.com/index.php?threads/cgmv-menu-command-window.91627/
 * The JS to call the scene is: SceneManager.push(CGMV_Scene_Crafting);
 *
 * Update History:
 * Version 1.0 - Initial Release
 *
 * @param Recipes
 * @type struct<Recipe>[]
 * @default []
 * @desc Set up different recipes here
 *
 * @param Window Options
 *
 * @param Scene Title
 * @parent Window Options
 * @desc Text to show in the window at the top of the crafting scene
 * @default Crafting
 *
 * @param ScrollSpeed
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the recipe window display scrolls (if needed)
 * Default: 1
 * @default 1
 *
 * @param ScrollWait
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * Default: 300
 * @default 300
 *
 * @param Success Rate Text
 * @parent Window Options
 * @desc Text to show to describe the success rate of a recipe
 * @default Success Rate
 *
 * @param Times Crafted Text
 * @parent Window Options
 * @desc Text to show to describe the amount of times a recipe has been crafted
 * @default Times Crafted
 *
 * @param Description Text
 * @parent Window Options
 * @desc Text to show to describe the description field of a recipe
 * @default Description
 *
 * @param Experience Text
 * @parent Window Options
 * @desc Text to show to describe the experience gained for crafting the recipe (Requires CGMV Professions)
 * @default Exp Gain
 *
 * @param Level Requirement Text
 * @parent Window Options
 * @desc Text to show to describe the level required to craft the recipe (Requires CGMV Professions)
 * @default Level Req
 *
 * @param Level Abbreviation Text
 * @parent Window Options
 * @desc Text to abbreviate level requirement to (Requires CGMV Professions)
 * @default Lv.
 *
 * @param Produces Text
 * @parent Window Options
 * @desc Text to show to describe the product items that a craft produces
 * @default Produces
 *
 * @param Tools Text
 * @parent Window Options
 * @desc Text to show to describe the tool items that a craft requires
 * @default Tools Needed
 *
 * @param Ingredients Text
 * @parent Window Options
 * @desc Text to show to describe the ingredient items that a craft requires
 * @default Ingredient List
 *
 * @param Progress Text
 * @parent Window Options
 * @desc Text to show to describe the progress of the currently crafting recipe
 * @default Progress
 *
 * @param Success Text
 * @parent Window Options
 * @desc Text to show to describe a successful craft
 * @default Craft Success!
 *
 * @param Failure Text
 * @parent Window Options
 * @desc Text to show to describe a failed craft
 * @default Craft Failed!
 *
 * @param Progress Color1
 * @parent Window Options
 * @desc First color of the progress bar using Windowskin colors
 * @min 0
 * @max 31
 * @default 28
 *
 * @param Progress Color2
 * @parent Window Options
 * @desc Second color of the progress bar using Windowskin colors
 * @min 0
 * @max 31
 * @default 29
 *
 * @param Success Color
 * @parent Window Options
 * @desc Color of the Successful Craft Text using Windowskin colors
 * @min 0
 * @max 31
 * @default 29
 *
 * @param Failure Color
 * @parent Window Options
 * @desc Color of the Failure Craft Text using Windowskin colors
 * @min 0
 * @max 31
 * @default 18
 *
 * @param Other CGMV Plugin Options
 *
 * @param Show Learn Toast
 * @parent Other CGMV Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window upon learning a new recipe (requires CGMV Toast)
 *
 * @param Toast Text
 * @parent Other CGMV Plugin Options
 * @default Learned Recipe: 
 * @desc Text to describe a recently learned recipe in the toast window (requires CGMV Toast)
 *
 * @param Always Award Exp
 * @parent Other CGMV Plugin Options
 * @type boolean
 * @default true
 * @desc Award exp even on recipe failure? (requires CGMV Professions)
*/
/*~struct~Recipe:
 * @param Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by crafting the recipe
 *
 * @param Fail Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by a failed craft of this recipe
 *
 * @param Ingredients
 * @type struct<Item>[]
 * @default []
 * @desc The items required to craft the recipe that are consumed on craft
 *
 * @param Tools
 * @type struct<Item>[]
 * @default []
 * @desc The items required to craft the recipe that are not consumed on craft
 *
 * @param Name
 * @type text
 * @desc The name of the recipe.
 * 
 * @param Discovered
 * @type boolean
 * @default false
 * @desc Determine whether the recipe is discovered at the beginning of the game.
 * 
 * @param Icon
 * @type number
 * @default 0
 * @min -1
 * @desc Icon index to use for the recipe
 *
 * @param Description
 * @type note
 * @default ""
 * @desc Recipe description
 *
 * @param Success Rate
 * @type number
 * @min 1
 * @max 100
 * @default 100
 * @desc The % chance that the craft will succeed.
 *
 * @param Time
 * @type number
 * @min 1
 * @default 120
 * @desc The time (in frames, 60f = 1sec) it takes to craft the recipe
 *
 * @param Experience
 * @type number
 * @min 1
 * @default 1
 * @desc The amount of experience to award for crafting this recipe (Requires CGMV Professions)
 *
 * @param Profession
 * @type text
 * @desc The profession name which the recipe belongs to if using CGMV Professions. The type of recipe if not using CGMV Professions.
 *
 * @param Level Requirement
 * @type number
 * @default 1
 * @min 0
 * @desc Profession level required to craft (Requires CGMV Professions)
 *
 * @param Craft Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting the recipe
 *
 * @param Fail Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting fails
 *
 * @param Success Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting succeeds
 *
 * @param Toast Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when displaying a toast window for the recipe (Requires CGMV Toast)
 */
 /*~struct~Item:
 * @param ID
 * @type number
 * @default 0
 * @desc The item ID
 * 
 * @param Amount
 * @type number
 * @default 1
 * @desc The amount of this item needed
 * 
 * @param Type
 * @type select
 * @default item
 * @option item
 * @option armor
 * @option weapon
 * @desc Whether the item is an item, weapon, or armor.
 */
var Imported = Imported || {};
Imported.CGMV_Crafting = true;
var CGMV = CGMV || {};
CGMV.Crafting = CGMV.Crafting || {};
CGMV.Crafting.version = 1.0;
CGMV.Crafting.parameters = PluginManager.parameters('CGMV_Crafting');
CGMV.Crafting.Recipes = JSON.parse(CGMV.Crafting.parameters["Recipes"]);
CGMV.Crafting.SceneTitle = CGMV.Crafting.parameters["Scene Title"] || "Crafting";
CGMV.Crafting.DescriptionText = CGMV.Crafting.parameters["Description Text"] || "Description";
CGMV.Crafting.SuccessRateText = CGMV.Crafting.parameters["Success Rate Text"] || "Success Rate";
CGMV.Crafting.TimesCraftedText = CGMV.Crafting.parameters["Times Crafted Text"] || "Times Crafted";
CGMV.Crafting.ExpText = CGMV.Crafting.parameters["Experience Text"] || "Exp Gain";
CGMV.Crafting.LevelReqText = CGMV.Crafting.parameters["Level Requirement Text"] || "Level Req";
CGMV.Crafting.LevelAbbrText = CGMV.Crafting.parameters["Level Abbreviation Text"] || "Lv.";
CGMV.Crafting.ProduceText = CGMV.Crafting.parameters["Produces Text"] || "Produces";
CGMV.Crafting.IngredientsText = CGMV.Crafting.parameters["Ingredients Text"] || "Ingredient List";
CGMV.Crafting.ToolsText = CGMV.Crafting.parameters["Tools Text"] || "Tools Needed";
CGMV.Crafting.ProgressText = CGMV.Crafting.parameters["Progress Text"] || "Progress";
CGMV.Crafting.SuccessText = CGMV.Crafting.parameters["Success Text"] || "Craft Success!";
CGMV.Crafting.FailureText = CGMV.Crafting.parameters["Failure Text"] || "Craft Failed!";
CGMV.Crafting.ScrollSpeed = Number(CGMV.Crafting.parameters["ScrollSpeed"]) || 1;
CGMV.Crafting.ScrollWait = Number(CGMV.Crafting.parameters["ScrollWait"]) || 300;
CGMV.Crafting.ProgressColor1 = Number(CGMV.Crafting.parameters["Progress Color1"]) || 28;
CGMV.Crafting.ProgressColor2 = Number(CGMV.Crafting.parameters["Progress Color2"]) || 29;
CGMV.Crafting.FailureColor = Number(CGMV.Crafting.parameters["Failure Color"]) || 18;
CGMV.Crafting.SuccessColor = Number(CGMV.Crafting.parameters["Success Color"]) || 29;
CGMV.Crafting.ShowLearnToast = (CGMV.Crafting.parameters["Show Learn Toast"] === "true") ? true : false;
CGMV.Crafting.ToastText = CGMV.Crafting.parameters["Toast Text"] || "Learned Recipe: ";
CGMV.Crafting.AlwaysAwardExp = (CGMV.Crafting.parameters["Always Award Exp"] === "true") ? true : false;
//=============================================================================
// CGMV_Recipe
//-----------------------------------------------------------------------------
// Store and manage recipe data
//=============================================================================
function CGMV_Recipe() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Recipe
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.initialize = function(recipe) {
	this._name = recipe.Name;
	this._discovered = (recipe.Discovered === 'true') ? true : false;
	this._experience = Number(recipe.Experience);
	this._successRate = Number(recipe["Success Rate"]);
	this._time = Number(recipe.Time);
	this._profession = recipe.Profession;
	this._levelRequirement = Number(recipe["Level Requirement"]);
	this._iconIndex = Number(recipe.Icon);
	this._description = JSON.parse(recipe.Description.replace(/\\n/g, " \\\\n "));
	this._toastSE = recipe["Toast Sound Effect"];
	this._craftSE = {name: recipe["Craft Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._failSE = {name: recipe["Fail Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._successSE = {name: recipe["Success Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._timesCrafted = 0;
	this._products = [];
	this._failProducts = [];
	this._ingredients = [];
	this._tools = [];
	this.setupArray(this._products, JSON.parse(recipe.Products));
	this.setupArray(this._ingredients, JSON.parse(recipe.Ingredients));
	this.setupArray(this._tools, JSON.parse(recipe.Tools));
	this.setupArray(this._failProducts, JSON.parse(recipe["Fail Products"]));
};
//-----------------------------------------------------------------------------
// Set up the arrays for items associated with the recipe.
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.setupArray = function(array, recipeArray) {
	if(recipeArray.length === 0) return;
	for(var i = 0; i < recipeArray.length; i++) {
		var item = JSON.parse(recipeArray[i]);
		item.ID = Number(item.ID);
		item.Amount = Number(item.Amount);
		array.push(item);
	}
};
//-----------------------------------------------------------------------------
// Change discovered status of a recipe
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.changeDiscoveredStatus = function(discovered) {
	this._discovered = discovered;
};
//-----------------------------------------------------------------------------
// Set up learn toast (Requires CGMV Toast)
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.setupLearnToast = function() {
	var toast = {};
	toast.CGMVRecipeToast = true;
	toast.name = this._name;
	if(this._toastSE !== "") toast.SE = {name: this._toastSE, pan: 0, pitch: 100, volume: 100};
	$cgmv.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Perform the craft
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.doCraft = function(success) {
	this.takeItems(this._ingredients);
	if(Imported.CGMV_Professions) this.awardExp(success);
	if(success) {
		this._timesCrafted++;
		this.giveItems(this._products);
	}
	else {
		this.giveItems(this._failProducts);
	}
};
//-----------------------------------------------------------------------------
// Check if recipe can be crafted
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.canCraft = function() {
	if(!this.meetsLevelRequirements()) return false;
	if(!this.hasItemsNeeded()) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check if profession level requirements are met
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.meetsLevelRequirements = function() {
	if(!Imported.CGMV_Professions) return true;
	var profession = $cgmv.getProfession(this._profession);
	if(profession) {
		return this._levelRequirement <= profession._level;
	}
	return false;
};
//-----------------------------------------------------------------------------
// Check if player has the items required to craft
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.hasItemsNeeded = function() {
	var i = 0;
	for(i = 0; i < this._tools.length; i++) {
		var item = $cgmvTemp.lookupItem(this._tools[i].Type, this._tools[i].ID);
		if(item) {
			if($gameParty.numItems(item) < this._tools[i].Amount) return false;
		}
	}
	for(i = 0; i < this._ingredients.length; i++) {
		var item = $cgmvTemp.lookupItem(this._ingredients[i].Type, this._ingredients[i].ID);
		if(item) {
			if($gameParty.numItems(item) < this._ingredients[i].Amount) return false;
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Take away ingredients needed to craft
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.takeItems = function(itemArray) {
	for(var i = 0; i < itemArray.length; i++) {
		var item = $cgmvTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
		if(item) {
			$gameParty.loseItem(item, itemArray[i].Amount, false);
		}
	}
};
//-----------------------------------------------------------------------------
// Give item products generated from craft
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.giveItems = function(itemArray) {
	for(var i = 0; i < itemArray.length; i++) {
		var item = $cgmvTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
		if(item) {
			$gameParty.gainItem(item, itemArray[i].Amount, false);
		}
	}
};
//-----------------------------------------------------------------------------
// Learn a recipe and show toast if applicable
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.learn = function() {
	this.changeDiscoveredStatus(true);
	if(CGMV.Crafting.ShowLearnToast && Imported.CGMV_Toast) this.setupLearnToast();
};
//-----------------------------------------------------------------------------
// Award profession Exp if applicable
//-----------------------------------------------------------------------------
CGMV_Recipe.prototype.awardExp = function(success) {
	if(success || CGMV.Crafting.AlwaysAwardExp) {
		$cgmv.changeProfessionExp(this._profession, "+", this._experience);
	}
};
//=============================================================================
// CGMV
//-----------------------------------------------------------------------------
// Manage recipe data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize recipe data
//-----------------------------------------------------------------------------
var alias_CGMV_Crafting_createPluginData = CGMV_Core.prototype.createPluginData;
CGMV_Core.prototype.createPluginData = function() {
	alias_CGMV_Crafting_createPluginData.call(this);
	this.initializeRecipeData(false);
};
//-----------------------------------------------------------------------------
// Initialize recipe data
//-----------------------------------------------------------------------------
CGMV_Core.prototype.initializeRecipeData = function(reinitialize) {
	if(!this._recipes || reinitialize) {
		this.setupRecipeVariables();
	}
	for(var i = 0; i < CGMV.Crafting.Recipes.length; i++) {
		var recipe = new CGMV_Recipe(JSON.parse(CGMV.Crafting.Recipes[i]));
		if(!this.getRecipe(recipe._name)) this._recipes.push(recipe);
	}
};
//-----------------------------------------------------------------------------
// Initialize recipe variables
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupRecipeVariables = function() {
	this._recipes = [];
};
//-----------------------------------------------------------------------------
// Returns array of all recipes
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getAllRecipes = function() {
	return this._recipes;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getAllDiscoveredRecipes = function() {
	var discoveredRecipes = [];
	for(var i = 0; i < this._recipes.length; i++) {
		if(this._recipes[i]._discovered) discoveredRecipes.push(this._recipes[i]);
	}
	return discoveredRecipes;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes of certain type (profession)
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getDiscoveredRecipesOfType = function(type) {
	var discoveredRecipes = [];
	for(var i = 0; i < this._recipes.length; i++) {
		if(this._recipes[i]._discovered && this._recipes[i]._profession === type) discoveredRecipes.push(this._recipes[i]);
	}
	return discoveredRecipes;
};
//-----------------------------------------------------------------------------
// Get recipe by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getRecipe = function(name) {
	for(var i = 0; i < this._recipes.length; i++) {
		if(name === this._recipes[i]._name) return this._recipes[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a recipe
//-----------------------------------------------------------------------------
CGMV_Core.prototype.discoverRecipe = function(name, discovered) {
	var recipe = this.getRecipe(name);
	if(recipe) {
		(discovered === "false") ? discovered = false : discovered = true;
		(discovered) ? recipe.learn() : recipe.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Check if Item has a recipe learn property attached to it
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkItemForRecipe = function(item) {
	if(item) {
		if(item.meta.cgmvrecipe){
			this.discoverRecipe(item.meta.cgmvrecipe, true);
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Handles recipe plugin commands
//-----------------------------------------------------------------------------
var alias_CGMV_Crafting_pluginCommand = CGMV_Core.prototype.pluginCommand;
CGMV_Core.prototype.pluginCommand = function(command, args) {
	alias_CGMV_Crafting_pluginCommand.call(this, command, args);
	if(command === "CGMVRecipes") {
		if(args[0] === "Scene") {
			SceneManager.push(CGMV_Scene_Crafting);
			if(args[1]) {
				SceneManager.prepareNextScene(args[1]);
			}
		}
		else if(args[0] === "Discover") {
			var arg0 = args.shift();
			var lastArg = args.pop();
			this.discoverRecipe(args.join(' '), lastArg);
		}
		else if(args[0] === "Initialize") {
			this.initializeRecipeData(true);
		}
	}
};
//=============================================================================
// CGMV_Scene_Crafting
//-----------------------------------------------------------------------------
// Handle the crafting scene
//=============================================================================
function CGMV_Scene_Crafting(craftType) {
    this.initialize.apply(this, arguments);
}
CGMV_Scene_Crafting.prototype = Object.create(Scene_MenuBase.prototype);
CGMV_Scene_Crafting.prototype.constructor = CGMV_Scene_Crafting;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.initialize = function(craftType) {
	this._craftType = craftType || "all";
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Prepare
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.prepare = function(craftType) {
	this._craftType = craftType || "all";
};
//-----------------------------------------------------------------------------
// Create crafting windows
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createTitleWindow();
	this.createListWindow();
	this.createDisplayWindow();
	this.createProgressWindow();
};
//-----------------------------------------------------------------------------
// Create title window
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.createTitleWindow = function() {
    this._titleWindow = new CGMV_Window_Title(0, 0, CGMV.Crafting.SceneTitle);
    this.addWindow(this._titleWindow);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.createListWindow = function() {
	var height = Graphics.boxHeight - this._titleWindow.height;
	var width = Graphics.boxWidth/3;
    this._listWindow = new CGMV_Window_RecipeList(0, this._titleWindow.height, width, height, this._craftType);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.createDisplayWindow = function() {
	var x = this._listWindow.width;
	var y = this._titleWindow.height;
	var height = this._listWindow.height - this._titleWindow.height;
	var width = Graphics.boxWidth*2/3;
    this._displayWindow = new CGMV_Window_RecipeDisplay(x, y, width, height);
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.setHandler('ok', this.onDisplayOk.bind(this));
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Create progress window
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.createProgressWindow = function() {
	var x = this._listWindow.width;
	var y = this._titleWindow.height + this._displayWindow.height;
	var height = this._titleWindow.height;
	var width = Graphics.boxWidth*2/3;
    this._progressWindow = new CGMV_Window_RecipeProgress(x, y, width, height);
	this._listWindow.setProgressWindow(this._progressWindow);
	this._displayWindow.setProgressWindow(this._progressWindow);
	this._progressWindow.setDisplayWindow(this._displayWindow);
	this._progressWindow.setListWindow(this._listWindow);
    this.addWindow(this._progressWindow);
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On Display Cancel
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.onDisplayCancel = function() {
	if(!this._progressWindow.isCrafting()) {
		this._displayWindow.deactivate();
		this._listWindow.activate();
	}
};
//-----------------------------------------------------------------------------
// On Display Ok
//-----------------------------------------------------------------------------
CGMV_Scene_Crafting.prototype.onDisplayOk = function() {
	if(!this._progressWindow.isCrafting()) {
		if(this._displayWindow.canCraft()) {
			this._progressWindow.startCraft();
		}
		else {
			SoundManager.playBuzzer();
		}
	}
};
//=============================================================================
// CGMV_Window_RecipeList
//-----------------------------------------------------------------------------
// Selectable window for choosing a recipe in a list.
//=============================================================================
function CGMV_Window_RecipeList(x, y, w, h) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_RecipeList.prototype = Object.create(Window_Selectable.prototype);
CGMV_Window_RecipeList.prototype.constructor = CGMV_Window_RecipeList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.initialize = function(x, y, w, h, craftType) {
    Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this._craftType = craftType;
	this._data = [];
	this.refresh();
	this.select(0);
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.makeItemList = function() {
	if(this._craftType === "all") {
		this._data = $cgmv.getAllDiscoveredRecipes();
	}
	else {
		this._data = $cgmv.getDiscoveredRecipesOfType(this._craftType);
	}
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
	var iconBoxWidth = 0;
	if(item._iconIndex >= 0) {
		this.drawIcon(item._iconIndex, rect.x, rect.y);
		iconBoxWidth = Window_Base._iconWidth + 4;
	}
	this.changePaintOpacity(item.canCraft());
    this.drawText(item._name, rect.x + iconBoxWidth, rect.y, rect.width, 'left');
	this.changePaintOpacity(1);
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set progress window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.setProgressWindow = function(progressWindow) {
    this._progressWindow = progressWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
	if(this.active && this._progressWindow) {
		this._progressWindow.setItem(this.item());
	}
};
//-----------------------------------------------------------------------------
// If refresh is requested from other window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeList.prototype.requestRefresh = function() {
    this.refresh();
};
//=============================================================================
// CGMV_Window_RecipeDisplay
//-----------------------------------------------------------------------------
// Window displaying recipe information
//=============================================================================
function CGMV_Window_RecipeDisplay() {
    this.initialize.apply(this, arguments);
}
CGMV_Window_RecipeDisplay.prototype = Object.create(CGMV_Window_Scrollable.prototype);
CGMV_Window_RecipeDisplay.prototype.constructor = CGMV_Window_RecipeDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.initialize = function(x, y, width, height) {
	var heightMultiplier = 4; // maximum of 4 windows tall of data to scroll
    CGMV_Window_Scrollable.prototype.initialize.call(this, x, y, width, height, heightMultiplier, CGMV.Crafting.ScrollWait, CGMV.Crafting.ScrollSpeed);
	this._recipe = null;
	this._largeIconWidth = Window_Base._iconWidth*2.2;
	this._largeIconHeight = Window_Base._iconHeight*2.2;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this.deactivate();
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.processHandling = function() {
	if(!this._progressWindow || !this._progressWindow.isCrafting()) {
		CGMV_Window_Scrollable.prototype.processHandling.call(this);
	}
    if (this.isActive()) {
        if (this.isOkEnabled() && (Input.isRepeated('ok') || TouchInput.isRepeated())) {
            this.processOk();
		}
    }
};
//-----------------------------------------------------------------------------
// Process Ok
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.processOk = function() {
    this.updateInputData();
    this.callOkHandler();
};
//-----------------------------------------------------------------------------
// Call Ok Handler
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.callOkHandler = function() {
    this.callHandler('ok');
};
//-----------------------------------------------------------------------------
// Check if ok handling exists
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.isOkEnabled = function() {
    return this.isHandled('ok');
};
//-----------------------------------------------------------------------------
// Set progress window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.setProgressWindow = function(progressWindow) {
    this._progressWindow = progressWindow;
};
//-----------------------------------------------------------------------------
// If refresh is requested from other window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.requestRefresh = function() {
	var tempScrollMode = this._scrollMode;
	var tempScrollTimer = this._scrollTimer;
	var tempY = this.origin.y;
    this.refresh();
	this._neededHeight += this.standardPadding()*2;
	this.checkForScroll();
	this._scrollMode = tempScrollMode;
	this._scrollTimer = tempScrollTimer;
	this.origin.y = tempY;
};
//-----------------------------------------------------------------------------
// Determine if the recipe shown can be crafted
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.canCraft = function() {
	if(this._recipe) {
		return this._recipe.canCraft();
	}
	return false;
};
//-----------------------------------------------------------------------------
// Set the recipe to be displayed
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.setItem = function(recipe) {
	this._recipe = recipe;
	this.refresh();
	this._neededHeight += this.standardPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.refresh = function() {
	if(!this._recipe) return;
	this.setupWindowForNewEntry();
	this._neededHeight = 0;
	var recipe = this._recipe;
	var width = this.contents.width;
	this.drawRecipeName(recipe._name);
	var firstLineX = 0;
	if(recipe._iconIndex > 0) {
		this.drawLargeIcon(recipe._iconIndex);
		var firstLineX = this._largeIconWidth + 2
	}
	var y = this.lineHeight();
	this.drawRecipeStandardLine(CGMV.Crafting.TimesCraftedText + ": ", this._recipe._timesCrafted, firstLineX, y, width);
	y += this.lineHeight();
	this.drawRecipeStandardLine(CGMV.Crafting.SuccessRateText + ": ", this._recipe._successRate + "%", firstLineX, y, width);
	y += this.lineHeight();
	if(Imported.CGMV_Professions) {
		this.drawRecipeStandardLine(CGMV.Crafting.ExpText + ": ", this._recipe._experience, 0, y, width);
		y += this.lineHeight();
		this.drawRecipeStandardLine(CGMV.Crafting.LevelReqText + ": ", this._recipe._profession + " " + CGMV.Crafting.LevelAbbrText + " " + this._recipe._levelRequirement, 0, y, width);
		y += this.lineHeight();
	}
	y = this.drawRecipeDescription(recipe._description, y);
	y = this.drawRecipeItems(CGMV.Crafting.ProduceText, recipe._products, y, width, true);
	y = this.drawRecipeItems(CGMV.Crafting.ToolsText, recipe._tools, y, width, false);
	y = this.drawRecipeItems(CGMV.Crafting.IngredientsText, recipe._ingredients, y, width, false);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Name of recipe
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.drawRecipeName = function(name) {
	this.contents.CGMVfontBold = true;
	this.drawText(name, 0, 0, this.contents.width, 'center');
	this.contents.CGMVfontBold = false;
};
//-----------------------------------------------------------------------------
// Draw recipe description - returns y-value of line below last line drawn
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.drawRecipeDescription = function(description, yVal) {
	var descriptor1 = CGMV.Crafting.DescriptionText + ": ";
	var descriptor2 = description.split(" ");
	var x = 0;
	var y = yVal;
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor1, x, y, this.contents.width, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(this.normalColor());
	for(var i = 0; i < descriptor2.length; i++) {
		if(descriptor2[i] === "") continue;
		if(descriptor2[i] === '\\n') {
			y += this.lineHeight();
			x = 0;
			continue;
		}
		var tempWidth = this.textWidth(descriptor2[i] + " ");
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(descriptor2[i] + " ", x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws a standard line (blue system text: white text)
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.drawRecipeStandardLine = function(descriptor1, descriptor2, x, y, width) {
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor1, x, y, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(this.normalColor());
	this.drawText(descriptor2, x, y, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw large icon
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.drawLargeIcon = function(iconIndex) {
	var bitmap = this._iconBitmap;
	var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
	var dw = this._largeIconWidth;
	var dh = this._largeIconHeight;
	var x = 0;
	var y = this.lineHeight();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//-----------------------------------------------------------------------------
// Draw regular icon
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = this._iconBitmap;
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
//-----------------------------------------------------------------------------
// Draw Item Lists
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.drawRecipeItems = function(descriptorText, itemArray, yVal, width, product) {
	if(itemArray.length === 0) return yVal;
	var y = yVal;
	var x = 0;
	this.changeTextColor(this.systemColor());
	this.drawText(descriptorText, x, y, width, 'center');
	this.changeTextColor(this.normalColor());
	for(var i = 0; i < itemArray.length; i++) {
		var item = $cgmvTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
		if(item) {
			y += this.lineHeight();
			var currentSupply = $gameParty.numItems(item);
			var amount = itemArray[i].Amount + "x ";
			var name = item.name;
			var iconIndex = item.iconIndex;
			if(!product && itemArray[i].Amount > currentSupply) {
				this.changePaintOpacity(false);
			}
			else {
				this.changePaintOpacity(true);
			}
			var totalWidth = this.textWidth(amount) + this.textWidth(name) + Window_Base._iconWidth;
			x = (width-totalWidth)/2;
			this.drawText(amount, x, y, width-x, 'left');
			x += this.textWidth(amount);
			this.drawIcon(iconIndex, x, y);
			x += Window_Base._iconWidth;
			this.drawText(name, x, y, width-x, 'left');
			this.changePaintOpacity(true);
		}
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Look up item
//-----------------------------------------------------------------------------
CGMV_Window_RecipeDisplay.prototype.lookupItem = function(type, id) {
	switch(type) {
		case 'item':
			return $dataItems[id];
		case 'weapon':
			return $dataWeapons[id];
		case 'armor':
			return $dataArmors[id];
		default:
			$cgmvTemp.reportError("Item type setup incorrectly", "CGMV Crafting", "Check Recipe Items");
			return null;
	}
};
//=============================================================================
// CGMV_Window_RecipeProgress
//-----------------------------------------------------------------------------
// Window displaying crafting progress
//=============================================================================
function CGMV_Window_RecipeProgress() {
    this.initialize.apply(this, arguments);
}
CGMV_Window_RecipeProgress.prototype = Object.create(Window_Base.prototype);
CGMV_Window_RecipeProgress.prototype.constructor = CGMV_Window_RecipeProgress;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._recipe = null;
	this._isCrafting = false;
	this._timeCrafting = 0;
	this._craftingSuccess = null;
	this._justFinishedCraft = false;
	this.refresh(0);
};
//-----------------------------------------------------------------------------
// Determine if the recipe can be crafted still
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.canCraft = function() {
	if(this._recipe) {
		return this._recipe.canCraft();
	}
	return false;
};
//-----------------------------------------------------------------------------
// Determine if crafting is currently taking place
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.isCrafting = function() {
	return this._isCrafting;
};
//-----------------------------------------------------------------------------
// Determine if crafting just finished
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.justFinishedCrafting = function() {
	return this._justFinishedCraft;
};
//-----------------------------------------------------------------------------
// Start the crafting process
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.startCraft = function() {
	if(this._recipe) {
		this._timeCrafting = 0;
		AudioManager.playStaticSe(this._recipe._craftSE);
		if(this._recipe._successRate/100 > Math.random()) {
			this._craftingSuccess = true;
			this._timeNeededForCraft = this._recipe._time;
		}
		else {
			this._craftingSuccess = false;
			this._timeNeededForCraft = Math.max(Math.random()*this._recipe._time, this._recipe._time/2);
		}
		this._justFinishedCraft = false;
		this._recipe.doCraft(this._craftingSuccess);
		this._isCrafting = true;
	}
};
//-----------------------------------------------------------------------------
// Stop the crafting process
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.stopCraft = function() {
	this._timeCrafting = 0;
	this._isCrafting = false;
	this._justFinishedCraft = true;
	this.checkOtherWindowsForRefresh();
	this.refresh(0);
	if(this._craftingSuccess) {
		AudioManager.playStaticSe(this._recipe._successSE);
	}
	else {
		AudioManager.playStaticSe(this._recipe._failSE);
	}
};
//-----------------------------------------------------------------------------
// Update the crafting process
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if(this.isCrafting()) {
		this._timeCrafting++;
		this.refresh(this._timeCrafting/this._recipe._time);
		if(this._timeCrafting >= this._timeNeededForCraft){
			this.stopCraft();
		}
	}
	else if(this.justFinishedCrafting()) {
		this._timeCrafting++;
		if(this._timeCrafting >= 60){
			this._timeCrafting = 0;
			this._justFinishedCraft = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Set the recipe to be displayed
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.setItem = function(recipe) {
	this._recipe = recipe;
	this.refresh(0);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.refresh = function(rate) {
	this.contents.clear();
	var width = this.contents.width;
	if(this.justFinishedCrafting()) {
		if(this._craftingSuccess) {
			var descriptor = CGMV.Crafting.SuccessText;
			var color = this.textColor(CGMV.Crafting.SuccessColor);
		}
		else {
			var descriptor = CGMV.Crafting.FailureText;
			var color = this.textColor(CGMV.Crafting.FailureColor);
		}
		this.changeTextColor(color);
		this.drawText(descriptor, 0, 0, width, 'center');
		this.changeTextColor(this.normalColor());
	}
	else {
		this.changeTextColor(this.systemColor());
		var descriptor = CGMV.Crafting.ProgressText + ": "
		this.drawText(descriptor, 0, 0, width, 'left');
		this.changeTextColor(this.normalColor());
		var color1 = this.textColor(CGMV.Crafting.ProgressColor1);
		var color2 = this.textColor(CGMV.Crafting.ProgressColor2);
		var x = this.textWidth(descriptor);
		this.drawGauge(x, 0, width-x, rate, color1, color2);
		this.drawText((rate*100).toFixed(2) + " %", x, 0, width-x, 'center');
	}
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
};
//-----------------------------------------------------------------------------
// Set list window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.setListWindow = function(listWindow) {
    this._listWindow = listWindow;
};
//-----------------------------------------------------------------------------
// Set list window
//-----------------------------------------------------------------------------
CGMV_Window_RecipeProgress.prototype.checkOtherWindowsForRefresh = function() {
    if(!this.canCraft() && this._listWindow) this._listWindow.requestRefresh();
	if(this._displayWindow) this._displayWindow.requestRefresh();
};
//=============================================================================
// CGMV_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMV Recipe Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Processing for custom toasts. Alias
//-----------------------------------------------------------------------------
if(Imported.CGMV_Toast) {
var alias_CGMV_Crafting_processCustomToast = CGMV_Window_Toast.prototype.processCustomToast;
CGMV_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMV_Crafting_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMVRecipeToast')) {
		this.drawText(CGMV.Crafting.ToastText, 0, 0, this.contents.width, 'center');
		this.drawText(toastObject.name, 0, this.lineHeight(), this.contents.width, 'center');
	}
};
}
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Use recipe item processing
//=============================================================================
//-----------------------------------------------------------------------------
// Item use may cause learning of a recipe
//-----------------------------------------------------------------------------
var alias_CGMV_Crafting_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	alias_CGMV_Crafting_useItem.call(this, item);
	if (DataManager.isItem(item)) {
        $cgmv.checkItemForRecipe(item);
    }
};