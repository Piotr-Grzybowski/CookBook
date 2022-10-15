export interface CreateRecipeDto {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  preparationSteps: string[];
}
