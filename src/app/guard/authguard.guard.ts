import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from '../services/Utilisateur.service';


export class Authguard implements CanActivate {
  constructor ( private _UtilisateurService : UtilisateurService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this._UtilisateurService.IsLoggedIn()){
      return true;

    }else{
      this.router.navigate(['Login']);

      return false;
    }
    
  }
  
}

