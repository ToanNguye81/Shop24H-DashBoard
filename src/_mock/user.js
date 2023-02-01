import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader Leader Leader LeaderLeader',
    'Hr Manager Hr Manager Hr Manager Hr ManagerHr Manager',
    'UI Designer UI Designer UI Designer UI DesignerUI Designer',
    'UX Designer UX Designer UX Designer UX DesignerUX Designer',
    'UI/UX UI/UX UI/UX UI/UXUI/UX Designer',
    'Project Project Project ProjectProject Manager',
    'BackendBackend BackendBackendBackend Developer',
    'Full Full Full FullFull Stack Designer',
    'FrontFrontFrontFrontFrontEndDeveloperEndDeveloper End Developer End Developer End Developer End Developer ',
    'Full Full Full FullFull Stack Developer',
  ]),
}));

export default users;
