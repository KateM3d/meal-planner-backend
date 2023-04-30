const { Router } = require("express");
const { getMeal, postMeal, deleteMeal, editMeal } = require("./MealController");
const router = Router();

router.get("/", getMeal);
router.post("/saveMeal", postMeal);
router.delete("/deleteMeal", deleteMeal);
router.put("/editMeal", editMeal);

module.exports = router;