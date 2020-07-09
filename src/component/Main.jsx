import React from 'react';

import Users from '../container/users/index';
import SelfInfo from '../container/selfinfo/index';
import Roles from '../container/roles/index';
import Mycheck from '../container/mycheck/index';
import Checklists from '../container/checklists/index';
import Changeinfo from '../container/changeinfo/index';
export default function Main({which}) {
    // eslint-disable-next-line default-case
    switch (which) {
        case 2:
            return <Changeinfo />;
        case 3:
            return <Mycheck />;
        case 4:
            return <Users />;
        case 5:
            return <Roles />;
        case 6:
            return <Checklists />;
        default:
            return <SelfInfo />;
    }
}
