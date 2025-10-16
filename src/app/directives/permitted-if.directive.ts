import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth.service';

@Directive({
    selector: '[appPermittedIf]'
})
export class PermittedIfDirective {
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) { }

    @Input() set appPermittedIf(requirements: string) {
        const [moduleName, permissions] = requirements.split('.');
        const userPermissions = this.authService.getUserPermissions(moduleName);
        if (userPermissions && (userPermissions as any).find((p: any) => p.name === 'Full')) {
            if (!this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef)
                this.hasView = true;
            }
        } else if (
            userPermissions
            && 'permissions' in userPermissions
            && userPermissions.find(p => permissions.split('|').some(s => p.name.toLocaleLowerCase() === s.toLocaleLowerCase()))) {
            if (!this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef)
                this.hasView = true;
            }
        }
        else if (this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}  