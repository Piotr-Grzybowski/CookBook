import { CreateRecipeDto } from "./create.recipe.dto";

export interface PutRecipeDto extends Partial<CreateRecipeDto> {}
