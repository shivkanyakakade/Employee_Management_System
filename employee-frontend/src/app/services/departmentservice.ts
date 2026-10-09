import { Service } from '@angular/core';

@Service()
export class Departmentservice {




    getDepartmenticon(dept: string): string {

        switch (dept.toLowerCase()) {


            case 'frontend':
                return 'web';

            case 'python':
                return 'code';

            case 'recon':
                return 'engineering';

            case 'maintainance':
                return 'build';

            case 'backend':
                return 'dns';

            case 'it':
                return 'computer';

            case 'java':
                return 'coffee';

            case 'ui':
                return 'palette';

            case 'angular':
                return 'code';

            case 'developer':
                return 'developer_mode';

            case 'support':
                return 'support_agent';

            case 'hr':
                return 'groups';

            default:
                return 'business';
        }
    }
}
