import { User } from './user.model';

export const USERS: User[] = [
    {
        id: '1',
        firstName: 'Mike',
        lastName: 'McNell',
        email: 'mike-mcnell@gmail.com',
        phone: '+375(29)3452311',
        checkedRole: 'Frontend',
        checkedSkills: ['Java Script'],
        isReadyToRelocate: false,
        checkedlocations: ['Tokyo']
    },
    {
        id: '2',
        firstName: 'Dave',
        lastName: 'Brown',
        email: 'dave-brown@yahoo.com',
        phone: '+375(25)4449872',
        checkedRole: 'Backend',
        checkedSkills: ['Java', 'Apache'],
        isReadyToRelocate: true,
        checkedlocations: ['Minsk', 'New York', 'Mexiko']
    },
    {
        id: '3',
        firstName: 'Erik',
        lastName: 'Smith',
        email: 'erik-smith@bing.com',
        phone: '+375(44)2314433',
        checkedRole: 'Fullstack',
        checkedSkills: ['HTML', 'Java Script', 'PHP'],
        isReadyToRelocate: true,
        checkedlocations: ['London', 'Dublin']
    },
];
