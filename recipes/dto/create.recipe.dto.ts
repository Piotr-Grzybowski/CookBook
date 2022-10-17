export interface CreateRecipeDto {
  name: string;
  description: string;
  ingredients: string[];
  preparationSteps: string[];
  imageUrl?: string;
}
