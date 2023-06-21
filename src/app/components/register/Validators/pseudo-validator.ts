import { AbstractControl, ValidationErrors } from "@angular/forms";

export function pseudoValidate (control: AbstractControl): ValidationErrors | null {
    if (control.value) {
        return null;
    }
 
    return { name: 'Champ obligatoire' };

}