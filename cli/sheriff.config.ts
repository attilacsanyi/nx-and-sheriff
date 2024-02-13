import { noDependencies, sameTag, SheriffConfig } from '@softarc/sheriff-core';

export const sheriffConfig: SheriffConfig = {
  tagging: {
    'src/app': {
      'shared/<shared>': 'shared',
      '<domain>/feat-<feature>': ['domain:<domain>', 'type:feature'],
      '<domain>/<type>': ['domain:<domain>', 'type:<type>'],
    },
  },
  depRules: {
    root: ['type:api', 'shared', ({ to }) => to.startsWith('domain')],
    'domain:*': [sameTag, 'shared'],
    shared: sameTag,
    'type:api': [({ to }) => to.startsWith('type') || to.startsWith('shared')],
    'type:feature': ['type:data', 'type:ui', 'type:model'],
    'type:data': ['type:model', 'shared:config', 'shared:ui-messaging'],
    'type:ui': ['type:model', 'shared:form', 'shared:ui'],
    'type:model': noDependencies,
  },
};
