import { AbstractControl, ValidationErrors } from "@angular/forms";

export function pseudoValidate (controlGroup: AbstractControl): ValidationErrors | null {

  
    return { name: 'Champ obligatoire' };

}