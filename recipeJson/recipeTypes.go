package recipeJson

type RecData struct {
	Count   int
	Recipes []Recipe
}

type Recipe struct {
	Publisher   string
	Source_url  string
	Title       string
	Image_url   string
	Social_rank float64
}
