import { AbstractControl, ValidationErrors } from "@angular/forms";

export function twoPasswordValidate (controlGroup: AbstractControl): ValidationErrors | null {

    if (controlGroup.value.mdp && controlGroup.value.mdpConfirmation) {
        if (controlGroup.value.mdp !== controlGroup.value.mdpConfirmation) {
            return { twoPasswordCheck: 'Mots de passe différents !' };
        }

        return null;

    }

    return { twoPasswordCheck: 'Champ obligatoire !' };

}