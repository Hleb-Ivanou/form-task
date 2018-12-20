import { User } from './user.model';

export const USERS: User[] = [
    {
        id: 1,
        firstName: 'Mike',
        lastName: 'McNell',
        email: 'mike-mcnell@gmail.com',
        phone: '+375(29)3452311',
        checkedRoleId: 10,
        checkedSkillsId: [20],
        isReadyToRelocate: false,
        checkedlocationsId: []
    },
    {
        id: 2,
        firstName: 'Dave',
        lastName: 'Brown',
        email: 'dave-brown@yahoo.com',
        phone: '+375(25)4449872',
        checkedRoleId: 11,
        checkedSkillsId: [21, 25],
        isReadyToRelocate: true,
        checkedlocationsId: ['32', '35']
    },
    {
        id: 3,
        firstName: 'Erik',
        lastName: 'Smith',
        email: 'erik-smith@bing.com',
        phone: '+375(44)2314433',
        checkedRoleId: 12,
        checkedSkillsId: [20, 22, 23],
        isReadyToRelocate: true,
        checkedlocationsId: ['30', '31']
    },
];
